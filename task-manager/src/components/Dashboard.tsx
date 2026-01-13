import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type Task = {
  completed: boolean;
};

const COLORS = ["#22c55e", "#ef4444"];

function Dashboard({ tasks }: { tasks: Task[] }) {
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const data = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={350} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default Dashboard;
