import {
  Moon,
  Sun,
  LogOut,
  CheckSquare
} from "lucide-react";

function Navbar({
  user,
  darkMode,
  setDarkMode,
  onLogout
}) {
  return (
    <header className="navbar">

      <div className="brand">

        <div className="brand-icon">
          <CheckSquare size={21} />
        </div>

        <div>
          <strong>TaskFlow</strong>
          <span>Task Management</span>
        </div>

      </div>

      <div className="nav-actions">

        <span className="welcome">
          Hi, {user?.name}

          {user?.role === "admin" && (
            <small> Admin</small>
          )}
        </span>

        <button
          className="icon-btn"
          onClick={() =>
            setDarkMode((value) => !value)
          }
          title="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        <button
          className="btn btn-outline"
          onClick={onLogout}
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;