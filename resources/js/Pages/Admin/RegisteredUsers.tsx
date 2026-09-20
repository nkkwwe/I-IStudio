import { usePage } from '@inertiajs/react';
import AdminShell, { formatDate, getInitials, type AdminUser } from './AdminShell';

type PageProps = {
  users: AdminUser[];
};

export default function RegisteredUsers() {
  const { users } = usePage<PageProps>().props;

  return (
    <AdminShell
      title="Registered users"
      eyebrow="PEOPLE"
      heading="Registered users"
      count={users.length}
      activeSection="users"
    >
      <div className="account-panel admin-users-panel">
        {users.length === 0 ? (
          <div className="admin-empty-state admin-empty-state-inline">
            <strong>No users registered yet</strong>
          </div>
        ) : (
          <div className="admin-users-list">
            {users.map((user) => (
              <div className="admin-user-row" key={user.id}>
                <div className="admin-user-identity">
                  <span className="admin-user-avatar">
                    {user.avatar ? <img src={user.avatar} alt="" /> : getInitials(user)}
                  </span>
                  <span>
                    <strong>{user.name || 'Unnamed user'}</strong>
                    <small>{user.email}</small>
                  </span>
                </div>
                <span className="admin-user-date">Registered {formatDate(user.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
