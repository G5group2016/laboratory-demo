import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiEdit2, FiTrash2, FiX, FiCheck, FiUsers } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Users = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [role, setRole] = useState('user');
  const [isActive, setIsActive] = useState(true);

  const { data, isLoading } = useGetUsersQuery({});
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data || [];

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setRole(user.role);
    setIsActive(user.isActive !== false); // default to true
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await updateUser({ id: editingUser._id, body: { role, isActive } }).unwrap();
      toast.success('User updated successfully');
      setEditingUser(null);
    } catch (err) {
      toast.error('Failed to update user profile');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user account?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User account deleted');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <>
      <Helmet><title>Users Management — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage User Accounts</h1>
          <p className="text-[var(--text-secondary)] text-sm">Update roles, access permissions, and manage user details.</p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : users.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <FiUsers className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">No registered users found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[var(--text-muted)] text-left border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">User Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Phone</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Joined Date</th>
                    <th className="px-6 py-4 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[var(--text-primary)]">{u.name}</td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{u.email}</td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{u.phone || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-800' : u.role === 'receptionist' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          u.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`} />
                          {u.isActive !== false ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">
                        {new Date(u.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(u)}
                            className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(u._id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Edit User Account</h3>
              <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4 text-sm">
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">User Details</p>
                <p className="font-bold text-[var(--text-primary)] text-base">{editingUser.name}</p>
                <p className="text-[var(--text-secondary)]">{editingUser.email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">User Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full input-base"
                >
                  <option value="user">User / Patient</option>
                  <option value="receptionist">Receptionist / Lab Staff</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Account Status</label>
                <select
                  value={isActive ? 'true' : 'false'}
                  onChange={(e) => setIsActive(e.target.value === 'true')}
                  className="w-full input-base"
                >
                  <option value="true">Active</option>
                  <option value="false">Suspended / Inactive</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingUser(null)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-[var(--text-secondary)] hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-primary transition-colors flex items-center gap-1.5"><FiCheck /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
