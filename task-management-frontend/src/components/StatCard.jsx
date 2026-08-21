function StatCard({
  label,
  value,
  icon,
  tone = ""
}) {
  return (
    <div className={`stat-card ${tone}`}>

      <div>
        <p>{label}</p>
        <h2>{value}</h2>
      </div>

      <div className="stat-icon">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;