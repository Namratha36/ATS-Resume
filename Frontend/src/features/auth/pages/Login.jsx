import React from "react";
import "../auth.form.scss";

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    }

  return (
    <main>
        <div className="forum-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className = "input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div className = "input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" required />
                </div>
                <button className="button primary-button" type="submit">Login</button>
            </form>
        </div>
    </main>
  );
};

export default Login;