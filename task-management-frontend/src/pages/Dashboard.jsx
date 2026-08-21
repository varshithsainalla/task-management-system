import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  Plus,
  ListTodo,
  CheckCircle2,
  Clock3,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import api from "../api";

import { AuthContext } from "../components/AuthContext";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Analytics from "../components/Analytics";

function Dashboard() {

  const {
    user,
    logout
  } = useContext(AuthContext);

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem(
        "taskflow_theme"
      ) === "dark"
    );

  const [tasks, setTasks] =
    useState([]);

  const [analytics, setAnalytics] =
    useState(null);

  const [pagination, setPagination] =
    useState({
      page: 1,
      pages: 1,
      total: 0
    });

  const [filters, setFilters] =
    useState({
      search: "",
      status: "",
      priority: "",
      sortBy: "createdAt",
      order: "desc",
      page: 1
    });

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem(
      "taskflow_theme",
      darkMode
        ? "dark"
        : "light"
    );

  }, [darkMode]);

  const loadTasks = async () => {

    setLoading(true);

    try {

      const response =
        await api.get(
          "/tasks",
          {
            params: filters
          }
        );

      setTasks(response.data.tasks);

      setPagination(
        response.data.pagination
      );

      setError("");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to load tasks"
      );

    } finally {

      setLoading(false);

    }
  };

  const loadAnalytics = async () => {

    try {

      const response =
        await api.get(
          "/analytics"
        );

      setAnalytics(response.data);

    } catch {
      // Analytics failure
      // should not stop tasks.
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const setFilter = (
    key,
    value
  ) => {

    setFilters((current) => ({
      ...current,
      [key]: value,
      page:
        key === "page"
          ? value
          : 1
    }));

  };

  const saveTask = async (
    payload
  ) => {

    try {

      if (editingTask) {

        await api.put(
          `/tasks/${editingTask._id}`,
          payload
        );

      } else {

        await api.post(
          "/tasks",
          payload
        );

      }

      setEditingTask(null);

      await Promise.all([
        loadTasks(),
        loadAnalytics()
      ]);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to save task"
      );

      throw error;
    }
  };

  const deleteTask = async (
    task
  ) => {

    if (
      !window.confirm(
        `Delete "${task.title}"?`
      )
    ) {
      return;
    }

    try {

      await api.delete(
        `/tasks/${task._id}`
      );

      await Promise.all([
        loadTasks(),
        loadAnalytics()
      ]);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to delete task"
      );

    }
  };

  const completeTask = async (
    task
  ) => {

    try {

      await api.patch(
        `/tasks/${task._id}/complete`
      );

      await Promise.all([
        loadTasks(),
        loadAnalytics()
      ]);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to complete task"
      );

    }
  };

  const summary =
    analytics?.summary || {
      total: pagination.total,
      completed: 0,
      pending: 0,
      completionPercentage: 0
    };

  return (
    <div className="app-shell">

      <Navbar
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={logout}
      />

      <main className="container">

        <section className="hero">

          <div>

            <p className="eyebrow">
              Your workspace
            </p>

            <h1>
              Good morning,{" "}
              {user?.name?.split(" ")[0]} 👋
            </h1>

            <p>
              Stay organized and keep
              your work moving forward.
            </p>

          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingTask(null);
              setFormOpen(true);
            }}
          >
            <Plus size={18} />
            New Task
          </button>

        </section>

        {error && (
          <div className="alert error page-alert">
            {error}
          </div>
        )}

        <section className="stats-grid">

          <StatCard
            label="Total tasks"
            value={summary.total}
            icon={<ListTodo />}
          />

          <StatCard
            label="Completed"
            value={summary.completed}
            icon={<CheckCircle2 />}
            tone="success"
          />

          <StatCard
            label="Pending"
            value={summary.pending}
            icon={<Clock3 />}
            tone="warning"
          />

          <StatCard
            label="Completion"
            value={`${summary.completionPercentage}%`}
            icon={<CheckCircle2 />}
            tone="info"
          />

        </section>

        {analytics && (
          <Analytics
            analytics={analytics}
          />
        )}

        <section className="tasks-section">

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                Workspace
              </p>

              <h2>
                Your tasks
              </h2>

            </div>

            <span className="muted">
              {pagination.total} total
            </span>

          </div>

          <div className="filters">

            <div className="search-box">

              <Search size={18} />

              <input
                value={filters.search}
                onChange={(event) =>
                  setFilter(
                    "search",
                    event.target.value
                  )
                }
                placeholder="Search by title..."
              />

            </div>

            <div className="filter-control">

              <SlidersHorizontal size={17} />

              <select
                value={filters.status}
                onChange={(event) =>
                  setFilter(
                    "status",
                    event.target.value
                  )
                }
              >

                <option value="">
                  All statuses
                </option>

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

            </div>

            <div className="filter-control">

              <select
                value={filters.priority}
                onChange={(event) =>
                  setFilter(
                    "priority",
                    event.target.value
                  )
                }
              >

                <option value="">
                  All priorities
                </option>

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

            </div>

            <div className="filter-control">

              <select
                value={`${filters.sortBy}:${filters.order}`}
                onChange={(event) => {

                  const [
                    sortBy,
                    order
                  ] =
                    event.target.value.split(":");

                  setFilters(
                    (current) => ({
                      ...current,
                      sortBy,
                      order,
                      page: 1
                    })
                  );

                }}
              >

                <option value="createdAt:desc">
                  Newest
                </option>

                <option value="createdAt:asc">
                  Oldest
                </option>

                <option value="dueDate:asc">
                  Due date ↑
                </option>

                <option value="dueDate:desc">
                  Due date ↓
                </option>

                <option value="priority:desc">
                  Priority
                </option>

                <option value="title:asc">
                  Title A-Z
                </option>

              </select>

            </div>

          </div>

          {loading ? (

            <div className="empty-state">
              Loading tasks...
            </div>

          ) : tasks.length === 0 ? (

            <div className="empty-state">

              <ListTodo size={40} />

              <h3>
                No tasks found
              </h3>

              <p>
                Create a task or change
                your filters.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingTask(null);
                  setFormOpen(true);
                }}
              >
                <Plus size={17} />
                Create your first task
              </button>

            </div>

          ) : (

            <div className="task-grid">

              {tasks.map((task) => (

                <TaskCard
                  key={task._id}
                  task={task}

                  onEdit={(selected) => {
                    setEditingTask(selected);
                    setFormOpen(true);
                  }}

                  onDelete={deleteTask}

                  onComplete={completeTask}
                />

              ))}

            </div>

          )}

          {pagination.pages > 1 && (

            <div className="pagination">

              <button
                className="icon-btn"
                disabled={
                  pagination.page <= 1
                }
                onClick={() =>
                  setFilter(
                    "page",
                    pagination.page - 1
                  )
                }
              >
                <ChevronLeft size={18} />
              </button>

              <span>
                Page {pagination.page}
                {" "}of{" "}
                {pagination.pages}
              </span>

              <button
                className="icon-btn"
                disabled={
                  pagination.page >=
                  pagination.pages
                }
                onClick={() =>
                  setFilter(
                    "page",
                    pagination.page + 1
                  )
                }
              >
                <ChevronRight size={18} />
              </button>

            </div>

          )}

        </section>

      </main>

      {formOpen && (

        <TaskForm
          task={editingTask}

          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}

          onSave={saveTask}
        />

      )}

    </div>
  );
}

export default Dashboard;