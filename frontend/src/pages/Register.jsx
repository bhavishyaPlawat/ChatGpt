import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/auth/register",
        {
          fullName: {
            firstName: form.firstName,
            lastName: form.lastName,
          },
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );
      console.log("register success", res?.data);
      navigate("/");
    } catch (err) {
      console.error("Register error", err);
      const message =
        err?.response?.data?.message || err.message || "Network error";
      alert(`Register failed: ${message}`);
    }
  };

  return (
    <div className="page register">
      <div className="form-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label className="label">Full name</label>
          <div className="input-row">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="input"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="input"
            />
          </div>

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
            Register
          </button>
        </form>
        <p
          style={{
            marginTop: 12,
            textAlign: "center",
            color: "var(--muted)",
            fontSize: 13,
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "var(--primary)", textDecoration: "none" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
