import { useEffect, useState } from "react";
import { FaUserTag, FaCrown } from "react-icons/fa";
import { BsPencil, BsTrash } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Card from "../components/Card";
import { profilesAPI } from "../services/supabaseService.js";

export default function Customers() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ fullname: "", email: "", password: "", role: "Guest" });

  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      const { data, error } = await profilesAPI.fetchProfiles();
      if (error) {
        setError(error.message || "Gagal memuat data pelanggan.");
        setProfiles([]);
      } else {
        setError("");
        setProfiles(data || []);
      }
      setLoading(false);
    };
    loadProfiles();
  }, []);

  const goldMembers = profiles.filter((profile) => profile.tier === "Gold").length;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setForm({ fullname: profile.fullname, email: "", password: "", role: profile.role });
    setError("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ fullname: "", email: "", password: "", role: "Member" });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setSaving(true);
    setError("");

    if (editingId) {
      const payload = {
        fullname: form.fullname,
        role: form.role,
      };
      const { data, error } = await profilesAPI.updateCustomer(editingId, payload);
      if (error) {
        setError(error.message || "Gagal memperbarui pelanggan.");
      } else {
        setProfiles(profiles.map((profile) => (profile.id === editingId ? data : profile)));
        handleCancel();
      }
    } else {
      const payload = {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      const { error } = await profilesAPI.createCustomer(payload);
      if (error) {
        setError(error.message || "Gagal menambahkan pelanggan.");
      } else {
        const { data, error: fetchError } = await profilesAPI.fetchProfiles();
        if (!fetchError) {
          setProfiles(data || []);
        }
        setForm({ fullname: "", role: "Guest" });
      }
    }

    setSaving(false);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin ingin menghapus pelanggan ini?");
    if (!confirmed) return;

    setLoading(true);
    const { error } = await profilesAPI.deleteCustomer(id);
    if (error) {
      setError(error.message || "Gagal menghapus pelanggan.");
    } else {
      setProfiles(profiles.filter((profile) => profile.id !== id));
    }
    setLoading(false);
  };

  return (
    <Container id="customers-container" className="p-6">
      <PageHeader title="Customer Directory" breadcrumb1={`Mengelola ${profiles.length} pelanggan`} breadcrumb2="Tambah Pelanggan" to="#customer-form" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
          <FaUserTag className="text-blue-600 mr-3 size-6" />
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-xl font-bold">{profiles.length}</p>
          </div>
        </Card>
        <Card className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
          <FaCrown className="text-yellow-600 mr-3 size-6" />
          <div>
            <p className="text-sm text-gray-500">Gold Members</p>
            <p className="text-xl font-bold">{goldMembers}</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Daftar Pelanggan</h3>
          {loading ? (
            <div className="p-6 text-center">Memuat pelanggan...</div>
          ) : (
            <div className="overflow-x-auto overflow-y-auto max-h-[435px]">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {profiles.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.fullname}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.tier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 space-x-3">
                        <button onClick={() => handleEdit(customer)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <BsPencil /> Edit
                        </button>
                        <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1">
                          <BsTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div id="customer-form" className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}</h3>
          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3"
              >
                <option value="Guest">Guest</option>
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-emerald-600 text-white rounded-xl py-3 hover:bg-emerald-700 disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : editingId ? "Update Pelanggan" : "Tambah Pelanggan"}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="w-full bg-gray-200 text-gray-700 rounded-xl py-3 hover:bg-gray-300">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}