import { usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import UserDetailsModal from './UserDetailsModal';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import AdminShell, { getInitials, type AdminUser } from './AdminShell';
import { formatDate } from '../../lib/inquiries';

type PageProps = {
  users: AdminUser[];
};

export default function RegisteredUsers() {
  const { users } = usePage<PageProps>().props;
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const closeUser = useCallback(() => setSelectedUser(null), []);

  return (
    <AdminShell
      title={copy.admin.registeredUsers}
      eyebrow={copy.admin.people}
      heading={copy.admin.registeredUsers}
      count={users.length}
      activeSection="users"
    >
      <div className="account-panel admin-users-panel">
        {users.length === 0 ? (
          <div className="admin-empty-state admin-empty-state-inline">
            <strong>{copy.admin.noUsers}</strong>
          </div>
        ) : (
          <div className="admin-users-list">
            {users.map((user) => (
              <button type="button" className="admin-user-row" key={user.id} onClick={() => setSelectedUser(user)}>
                <span className="admin-user-identity">
                  <span className="admin-user-avatar">
                    {user.avatar ? <img src={user.avatar} alt="" /> : getInitials(user)}
                  </span>
                  <span>
                    <strong>{user.name || copy.admin.unnamedUser}</strong>
                    <small>{user.email}</small>
                  </span>
                </span>
                      <span className="admin-user-date">{copy.admin.registered} {formatDate(user.created_at, language)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedUser && <UserDetailsModal user={selectedUser} onClose={closeUser} />}
    </AdminShell>
  );
}
