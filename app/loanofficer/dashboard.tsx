"use client"; 
import { FiTrendingUp, FiUsers, FiDollarSign, FiCheckCircle, FiClock } from 'react-icons/fi';
import Chart1 from './chart1';
import Chart2 from './chart2';
export default function Dashboard() {
  const stats = [
    {
      number: "4,500",
      label: "Approved Applications",
      bgGradient: "from-green-500 to-green-600",
      icon: FiTrendingUp,
    },
    {
      number: "3,000",
      label: "Denied Applications",
      bgGradient: "from-red-500 to-red-600",
      icon: FiDollarSign,
    },
    {
      number: "2,000",
      label: "Pending Applications",
      bgGradient: "from-yellow-500 to-yellow-600",
      icon: FiCheckCircle,
    },
    {
      number: "2,000",
      label: "On Hold Applications",
      bgGradient: "from-orange-500 to-orange-600",
      icon: FiUsers,
    }
  ];

  const recentActivity = [
    {
      id: "#2345",
      status: "APPROVED",
      date: "24 Mar 2024",
      time: "4:45PM",
      type: "New Loan",
    },
    {
      id: "#2346",
      status: "PENDING",
      date: "24 Mar 2024",
      time: "3:30PM",
      type: "Payment",
    },
    {
      id: "#2347",
      status: "COMPLETED",
      date: "24 Mar 2024",
      time: "2:15PM",
      type: "Collection",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'completed':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.bgGradient} p-6 text-white shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <div className="relative z-10">
                  <Icon className="w-8 h-8 mb-3 opacity-90" />
                  <div className="text-2xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-white/90">{stat.label}</div>
                </div>
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl transform rotate-45" />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-9 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-lg font-semibold mb-4 text-gray-800">Loan Statistics</div>
              <Chart1 />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-lg font-semibold mb-4 text-gray-800">Collection Rate</div>
              <Chart2 />
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <FiClock className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {activity.type}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {activity.id}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.date} • {activity.time}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}