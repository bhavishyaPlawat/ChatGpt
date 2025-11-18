import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
    console.log("Login submitted:", form);
    alert("Login submitted (check console)");
  };

  return (
    <div className="page login">
      <div className="form-card">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit}>
          <label className="label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            className="input"
          />

          <label className="label">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="input"
          />

          <button type="submit" className="btn-primary">
            Login
          </button>
          <p
            style={{
              marginTop: 12,
              textAlign: "center",
              color: "var(--muted)",
              fontSize: 13,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--primary)", textDecoration: "none" }}
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
