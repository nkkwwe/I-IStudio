<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InquiryChatPhotosTest extends TestCase
{
    use RefreshDatabase;

    public function test_six_photos_form_one_message_and_each_photo_is_protected(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $inquiry = $this->inquiry($user);
        $response = $this->actingAs($user)->postJson(route('account.project-briefs.messages.store', $inquiry), [
            'body' => 'Photo album', 'attachments' => array_map(fn ($i) => $this->photo("photo-$i.png"), range(1, 6)),
        ])->assertCreated()->assertJsonCount(6, 'message.attachments');
        $this->assertDatabaseCount('project_inquiry_messages', 1);
        $message = ProjectInquiryMessage::sole();
        foreach ($message->attachments as $photo) Storage::disk('local')->assertExists($photo['path']);
        $url = $response->json('message.attachments.5.url');
        $this->get($url)->assertOk()->assertHeader('Content-Type', 'image/png');
        $this->get(route('project-inquiry-messages.attachment', ['message' => $message, 'index' => 6]))->assertNotFound();
        $this->actingAs(User::factory()->create())->get($url)->assertForbidden();
    }

    public function test_over_limit_and_invalid_uploads_do_not_create_messages_or_files(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $route = route('account.project-briefs.messages.store', $this->inquiry($user));
        $this->actingAs($user)->postJson($route, ['attachments' => array_map(fn ($i) => $this->photo("photo-$i.png"), range(1, 7))])
            ->assertUnprocessable()->assertJsonValidationErrors('attachments');
        $this->postJson($route, ['attachments' => [$this->photo('ok.png'), UploadedFile::fake()->create('bad.txt', 1, 'text/plain')]])
            ->assertUnprocessable()->assertJsonValidationErrors('attachments.1');
        $this->postJson($route, ['attachment' => $this->photo('legacy.png'), 'attachments' => array_map(fn ($i) => $this->photo("photo-$i.png"), range(1, 6))])
            ->assertUnprocessable()->assertJsonValidationErrors('attachments');
        $this->assertDatabaseCount('project_inquiry_messages', 0);
        $this->assertCount(0, Storage::disk('local')->allFiles());
    }

    public function test_legacy_photo_and_read_receipts_remain_available(): void
    {
        Storage::fake('local');
        config(['admin.emails' => ['admin@example.com']]);
        $user = User::factory()->create();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $inquiry = $this->inquiry($user);
        $path = $this->photo('legacy.png')->store('inquiry-chat/'.$inquiry->id, 'local');
        $message = ProjectInquiryMessage::create(['project_inquiry_id' => $inquiry->id, 'sender_id' => $user->id,
            'sender_role' => 'user', 'sender_name' => $user->name, 'body' => 'Legacy message',
            'attachment_path' => $path, 'attachment_name' => 'legacy.png', 'attachment_mime' => 'image/png']);
        $userRoute = route('account.project-briefs.messages', $inquiry);
        $this->actingAs($user)->getJson($userRoute)->assertJsonPath('messages.0.read_at', null)->assertJsonCount(1, 'messages.0.attachments');
        $this->get(route('project-inquiry-messages.attachment', $message))->assertOk();
        $this->actingAs($admin)->getJson(route('admin.project-briefs.messages', $inquiry))->assertOk();
        $this->assertNotNull($message->fresh()->read_at);
        $this->actingAs($user)->getJson($userRoute)->assertJsonPath('messages.0.read_at', $message->fresh()->read_at->toISOString());
    }

    private function inquiry(User $user): ProjectInquiry
    {
        return ProjectInquiry::create(['user_id' => $user->id, 'client_name' => $user->name, 'client_email' => $user->email,
            'service_type' => 'landing', 'project_comment' => 'Photos test', 'status' => 'new']);
    }

    private function photo(string $name): UploadedFile
    {
        return UploadedFile::fake()->createWithContent($name, base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADUlEQVR4nGP4z8AAAAMBAQDJ/pLvAAAAAElFTkSuQmCC'));
    }
}
