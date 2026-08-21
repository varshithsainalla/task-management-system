import { useEffect, useState } from "react";
import {
  X,
  Save
} from "lucide-react";

const initialState = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  dueDate: ""
};

function TaskForm({
  task,
  onClose,
  onSave
}) {
  const [form, setForm] =
    useState(initialState);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    if (task) {

      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "TODO",
        priority: task.priority || "MEDIUM",
        dueDate: task.dueDate
          ? task.dueDate.slice(0, 10)
          : ""
      });

    } else {

      setForm(initialState);

    }

  }, [task]);

  const handleChange = (event) => {

    setForm((current) => ({
      ...current,
      [event.target.name]:
        event.target.value
    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    setSaving(true);

    try {

      await onSave({
        ...form,
        title: form.title.trim()
      });

      onClose();

    } finally {

      setSaving(false);

    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <div className="modal-header">

          <div>

            <p className="eyebrow">
              {task ? "Edit task" : "New task"}
            </p>

            <h2>
              {task
                ? "Update your task"
                : "Create a task"}
            </h2>

          </div>

          <button
            className="icon-btn"
            onClick={onClose}
          >
            <X size={19} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="form"
        >

          <label>
            Title

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Complete assignment"
              maxLength={150}
              required
            />

          </label>

          <label>
            Description

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add task details..."
              rows="4"
              maxLength={2000}
            />

          </label>

          <div className="form-grid">

            <label>
              Status

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="TODO">
                  Todo
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="DONE">
                  Done
                </option>
              </select>

            </label>

            <label>
              Priority

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>
              </select>

            </label>

          </div>

          <label>
            Due date

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />

          </label>

          <button
            className="btn btn-primary full"
            disabled={saving}
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : task
              ? "Update Task"
              : "Create Task"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default TaskForm;