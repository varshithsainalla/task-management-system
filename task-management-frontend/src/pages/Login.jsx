import {
  useContext,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  CheckSquare,
  LogIn
} from "lucide-react";

import api from "../api";
import { AuthContext } from "../components/AuthContext";

function Login() {

  const { setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response =
        await api.post(
          "/auth/login",
          form
        );

      localStorage.setItem(
        "taskflow_token",
        response.data.token
      );

      setUser(response.data.user);

      navigate("/");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">

          <div className="brand-icon large">
            <CheckSquare size={27} />
          </div>

          <h1>TaskFlow</h1>

          <p>
            Organize your work.
            Track your progress.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="form"
        >

          {error && (
            <div className="alert error">
              {error}
            </div>
          )}

          <label>
            Email

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email:
                    event.target.value
                })
              }
              placeholder="you@example.com"
              required
            />

          </label>

          <label>
            Password

            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm({
                  ...form,
                  password:
                    event.target.value
                })
              }
              placeholder="Minimum 6 characters"
              required
            />

          </label>

          <button
            className="btn btn-primary full"
            disabled={loading}
          >

            <LogIn size={17} />

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>

        <p className="auth-switch">

          Don't have an account?

          {" "}

          <Link to="/register">
            Create one
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;