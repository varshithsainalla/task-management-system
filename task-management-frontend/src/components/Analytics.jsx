import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function Analytics({ analytics }) {

  if (!analytics) {
    return null;
  }

  const statusData = [
    {
      name: "Todo",
      value: analytics.summary.todo
    },
    {
      name: "In Progress",
      value: analytics.summary.inProgress
    },
    {
      name: "Done",
      value: analytics.summary.completed
    }
  ];

  const priorityData = [
    {
      name: "Low",
      value:
        analytics.priorityCounts.find(
          (item) => item._id === "LOW"
        )?.count || 0
    },
    {
      name: "Medium",
      value:
        analytics.priorityCounts.find(
          (item) => item._id === "MEDIUM"
        )?.count || 0
    },
    {
      name: "High",
      value:
        analytics.priorityCounts.find(
          (item) => item._id === "HIGH"
        )?.count || 0
    }
  ];

  return (
    <section className="analytics-grid">

      <div className="chart-card">

        <div className="section-heading">

          <div>

            <p className="eyebrow">
              Analytics
            </p>

            <h2>Task status</h2>

          </div>

          <strong>
            {analytics.summary.completionPercentage}%
            {" "}done
          </strong>

        </div>

        <div className="chart">

          <ResponsiveContainer
            width="100%"
            height={240}
          >

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label
              >

                {statusData.map(
                  (_, index) => (
                    <Cell key={index} />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="chart-card">

        <div className="section-heading">

          <div>

            <p className="eyebrow">
              Priority
            </p>

            <h2>
              Task distribution
            </h2>

          </div>

        </div>

        <div className="chart">

          <ResponsiveContainer
            width="100%"
            height={240}
          >

            <BarChart data={priorityData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[
                  6,
                  6,
                  0,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>
  );
}

export default Analytics;