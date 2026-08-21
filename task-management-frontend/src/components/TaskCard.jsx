import {
  Calendar,
  Check,
  Edit3,
  Trash2,
  Circle,
  Clock3
} from "lucide-react";

const statusLabels = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done"
};

function TaskCard({
  task,
  onEdit,
  onDelete,
  onComplete
}) {
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <article
      className={`task-card ${
        task.status === "DONE"
          ? "completed"
          : ""
      }`}
    >

      <div className="task-top">

        <div>

          <span
            className={`badge priority-${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>

          <h3>{task.title}</h3>

        </div>

        <div className="task-actions">

          <button
            className="icon-btn"
            onClick={() => onEdit(task)}
            title="Edit"
          >
            <Edit3 size={17} />
          </button>

          <button
            className="icon-btn danger"
            onClick={() => onDelete(task)}
            title="Delete"
          >
            <Trash2 size={17} />
          </button>

        </div>

      </div>

      {task.description && (
        <p className="task-description">
          {task.description}
        </p>
      )}

      <div className="task-meta">

        <span>
          {task.status === "DONE" ? (
            <Check size={15} />
          ) : task.status === "IN_PROGRESS" ? (
            <Clock3 size={15} />
          ) : (
            <Circle size={15} />
          )}

          {statusLabels[task.status]}
        </span>

        <span>
          <Calendar size={15} />
          {dueDate}
        </span>

      </div>

      {task.status !== "DONE" && (
        <button
          className="complete-btn"
          onClick={() => onComplete(task)}
        >
          <Check size={16} />
          Mark completed
        </button>
      )}

    </article>
  );
}

export default TaskCard;