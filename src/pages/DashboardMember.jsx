import PageHeader from "../components/PageHeader";
import Container from "../components/Container";

export default function DashboardMember() {
  return (
    <Container id="dashboard-member">
      <PageHeader title="Member Dashboard" breadcrumb1="Dashboard" breadcrumb2="Member Overview" />
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, Member!</h2>
        <p className="text-gray-600 mb-4">
          Akses dashboard khusus member dengan ringkasan poin dan riwayat pesanan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Current Tier</p>
            <p className="text-3xl font-bold text-emerald-700">Bronze</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Points</p>
            <p className="text-3xl font-bold text-blue-700">0</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Order History</p>
            <p className="text-3xl font-bold text-yellow-700">0</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
