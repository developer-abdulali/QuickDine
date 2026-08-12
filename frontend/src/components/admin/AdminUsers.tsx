import {Trash2Icon, UsersIcon} from "lucide-react";

interface AdminUsersProps {
    users: any[];
    btnLoading: string | null;
    onRoleChange: (userId : string, role : "user" | "owner" | "admin",) => Promise < void >;
    onDeleteUser: (userId : string) => Promise < void >;
}

export default function AdminUsers({users, btnLoading, onRoleChange, onDeleteUser} : AdminUsersProps) {
    return (
        <div className="space-y-6 text-left text-on-surface">
            <div className="flex justify-between items-center lg:hidden">
                <h3 className="font-display text-lg font-medium text-on-surface">
                    User Accounts ({
                    users.length
                })
                </h3>
            </div>

            {
            users.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant/10 p-12 text-center rounded-md">
                    <UsersIcon size={32}
                        className="mx-auto text-outline-variant mb-2"/>
                    <p className="text-xs text-on-surface/60 italic">
                        No user accounts registered yet.
                    </p>
                </div>
            ) : (
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-md overflow-auto shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low border-b border-outline-variant/10 text-[10px] font-medium tracking-wider text-on-surface/60 uppercase">
                                <th className="p-4">User</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {
                            users.map((u) => (
                                <tr key={
                                        u._id
                                    }
                                    className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-on-surface">
                                            {
                                            u.name
                                        }</div>
                                        <div className="text-[10px] text-on-surface/50">
                                            {
                                            u.email
                                        }</div>
                                    </td>
                                    <td className="p-4 text-on-surface/60">
                                        {
                                        u.phone || "—"
                                    }</td>
                                    <td className="p-4">
                                        <select value={
                                                u.role
                                            }
                                            onChange={
                                                (e) => onRoleChange(u._id, e.target.value as "user" | "owner" | "admin",)
                                            }
                                            disabled={
                                                btnLoading === `role-${
                                                    u._id
                                                }`
                                            }
                                            className="bg-surface-container-low text-on-surface border border-outline-variant/40 px-3 py-1.5 text-xs rounded-sm focus:border-secondary focus:outline-none disabled:opacity-50 cursor-pointer">
                                            <option value="user" className="bg-surface-container-lowest text-on-surface">User</option>
                                            <option value="owner" className="bg-surface-container-lowest text-on-surface">Owner</option>
                                            <option value="admin" className="bg-surface-container-lowest text-on-surface">Admin</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-on-surface/60">
                                        {
                                        u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"
                                    } </td>
                                    <td className="p-4 text-right">
                                        <button onClick={
                                                () => onDeleteUser(u._id)
                                            }
                                            disabled={
                                                btnLoading === `del-${
                                                    u._id
                                                }`
                                            }
                                            className="inline-flex items-center gap-1 text-error hover:underline text-[10px] uppercase font-medium disabled:opacity-50 cursor-pointer">
                                            <Trash2Icon size={12}/> {
                                            btnLoading === `del-${
                                                u._id
                                            }` ? "Deleting..." : "Delete"
                                        } </button>
                                    </td>
                                </tr>
                            ))
                        } </tbody>
                    </table>
                </div>
            )
        } </div>
    );
}

