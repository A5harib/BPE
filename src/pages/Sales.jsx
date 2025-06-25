import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const initialStrategies = [
  {
    title: "Social Media Campaign",
    description: "Leverage platforms like Instagram and Facebook to reach a wider audience with targeted ads.",
    effectiveness: "High",
  },
  {
    title: "Doctor Outreach",
    description: "Engage healthcare professionals through webinars and sample distribution.",
    effectiveness: "Medium",
  },
  {
    title: "Pharmacy Partnerships",
    description: "Collaborate with pharmacies for in-store promotions and bundled offers.",
    effectiveness: "Medium",
  },
  {
    title: "Patient Education",
    description: "Host online seminars and distribute informative brochures to educate patients.",
    effectiveness: "High",
  },
];

const salesData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 180 },
  { month: "Mar", sales: 250 },
  { month: "Apr", sales: 300 },
  { month: "May", sales: 400 },
  { month: "Jun", sales: 420 },
];

const Sales = () => {
  const [strategies, setStrategies] = useState(initialStrategies);
  const [newStrategy, setNewStrategy] = useState({ title: "", description: "", effectiveness: "Medium" });

  const handleAddStrategy = () => {
    if (!newStrategy.title.trim() || !newStrategy.description.trim()) return;
    setStrategies([...strategies, newStrategy]);
    setNewStrategy({ title: "", description: "", effectiveness: "Medium" });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 underline">Promotional Strategies & Sales Growth</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Promotional Strategies */}
        <div className="bg-white rounded-lg shadow-2xl p-6 flex-1 min-w-[320px]">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Promotional Strategies</h2>
          <ul className="space-y-4 mb-6">
            {strategies.map((strategy, idx) => (
              <li key={idx} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{strategy.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${strategy.effectiveness === "High" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                    {strategy.effectiveness}
                  </span>
                </div>
                <div className="text-gray-700 text-sm mt-1">{strategy.description}</div>
              </li>
            ))}
          </ul>
          <div className="bg-indigo-50 rounded-md p-4">
            <h3 className="font-semibold mb-2 text-indigo-700">Add New Strategy</h3>
            <input
              className="w-full mb-2 p-2 border border-neutral-300 rounded-md"
              type="text"
              placeholder="Strategy Title"
              value={newStrategy.title}
              onChange={e => setNewStrategy({ ...newStrategy, title: e.target.value })}
            />
            <textarea
              className="w-full mb-2 p-2 border border-neutral-300 rounded-md"
              placeholder="Description"
              value={newStrategy.description}
              onChange={e => setNewStrategy({ ...newStrategy, description: e.target.value })}
            />
            <select
              className="w-full mb-2 p-2 border border-neutral-300 rounded-md"
              value={newStrategy.effectiveness}
              onChange={e => setNewStrategy({ ...newStrategy, effectiveness: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
              onClick={handleAddStrategy}
            >
              Add Strategy
            </button>
          </div>
        </div>
        {/* Sales Growth Chart */}
        <div className="bg-white rounded-lg shadow-2xl p-6 flex-1 min-w-[320px]">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Sales Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-gray-600 text-sm">
            <strong>Note:</strong> Sales growth is tracked monthly and reflects the impact of implemented promotional strategies.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
