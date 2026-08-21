import {
  useContext,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  UserPlus,
  CheckSquare
} from "lucide-react";

import api from "../api";
import { AuthContext } from "../components/AuthContext";

function Register() {

  const { setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    if (form.password.length < 6) {

      setError(
        "Password must be at least 6 characters"
      );

      return;
    }

    setLoading(true);

    try {

      const response =
        await api.post(
          "/auth/register",
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
        error.response?.data?.errors?.join(
          ", "
        ) ||
        error.response?.data?.message ||
        "Registration failed"
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

          <h1>
            Create account
          </h1>

          <p>
            Start managing your tasks today.
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
            Full name

            <input
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value
                })
              }
              placeholder="Your name"
              required
            />

          </label>

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

            <UserPlus size={17} />

            {loading
              ? "Creating..."
              : "Create Account"}

          </button>

        </form>

        <p className="auth-switch">

          Already have an account?

          {" "}

          <Link to="/login">
            Sign in
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;