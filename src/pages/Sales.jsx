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

const initialSalesData = [
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
  const [salesData, setSalesData] = useState(initialSalesData);

  const handleAddStrategy = () => {
    if (!newStrategy.title.trim() || !newStrategy.description.trim()) return;
    setStrategies([...strategies, newStrategy]);
    setNewStrategy({ title: "", description: "", effectiveness: "Medium" });
  };

  // Sales adjustment handlers
  const handleSalesChange = (idx, delta) => {
    setSalesData(salesData =>
      salesData.map((entry, i) =>
        i === idx
          ? { ...entry, sales: Math.max(0, entry.sales + delta) }
          : entry
      )
    );
  };

  const handleSalesInput = (idx, value) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) return;
    setSalesData(salesData =>
      salesData.map((entry, i) =>
        i === idx
          ? { ...entry, sales: num }
          : entry
      )
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-800 drop-shadow tracking-tight">
        Promotional Strategies & Sales Growth
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Promotional Strategies */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex-1 min-w-[320px]">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Promotional Strategies</h2>
          <ul className="space-y-4 mb-6">
            {strategies.map((strategy, idx) => (
              <li key={idx} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-indigo-800">{strategy.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${strategy.effectiveness === "High"
                    ? "bg-green-200 text-green-800"
                    : strategy.effectiveness === "Medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                    }`}>
                    {strategy.effectiveness}
                  </span>
                </div>
                <div className="text-gray-700 text-sm mt-1">{strategy.description}</div>
              </li>
            ))}
          </ul>
          <div className="bg-indigo-50 rounded-xl p-4 shadow-inner">
            <h3 className="font-semibold mb-2 text-indigo-700">Add New Strategy</h3>
            <input
              className="w-full mb-2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              type="text"
              placeholder="Strategy Title"
              value={newStrategy.title}
              onChange={e => setNewStrategy({ ...newStrategy, title: e.target.value })}
            />
            <textarea
              className="w-full mb-2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              placeholder="Description"
              value={newStrategy.description}
              onChange={e => setNewStrategy({ ...newStrategy, description: e.target.value })}
            />
            <select
              className="w-full mb-2 p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              value={newStrategy.effectiveness}
              onChange={e => setNewStrategy({ ...newStrategy, effectiveness: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 font-semibold transition"
              onClick={handleAddStrategy}
            >
              Add Strategy
            </button>
          </div>
        </div>
        {/* Sales Growth Chart & Controls */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex-1 min-w-[320px]">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Sales Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <h3 className="font-semibold text-indigo-700 mb-2">Adjust Monthly Sales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {salesData.map((entry, idx) => (
                <div key={entry.month} className="flex items-center bg-indigo-50 rounded-lg px-3 py-2 shadow">
                  <span className="w-12 font-bold text-indigo-700">{entry.month}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-red-200 hover:bg-red-300 text-red-700 rounded transition"
                    onClick={() => handleSalesChange(idx, -10)}
                  >-</button>
                  <input
                    type="number"
                    min={0}
                    className="mx-2 w-20 p-1 border border-indigo-200 rounded text-center focus:ring-2 focus:ring-indigo-400"
                    value={entry.sales}
                    onChange={e => handleSalesInput(idx, e.target.value)}
                  />
                  <button
                    className="px-2 py-1 bg-green-200 hover:bg-green-300 text-green-700 rounded transition"
                    onClick={() => handleSalesChange(idx, 10)}
                  >+</button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-gray-600 text-sm bg-indigo-50 rounded-xl p-4 shadow-inner">
            <strong>Note:</strong> Sales growth is tracked monthly and reflects the impact of implemented promotional strategies.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
