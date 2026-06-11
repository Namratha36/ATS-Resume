import React from "react";
import {useNavigate,Link} from "react-router";


const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
    }


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  return (
    <main>
        <div className="forum-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <div className = "input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    onChange={(e) => setUsername(e.target.value)}
                     type="text" id="username" name="username" placeholder="Username" required />
                </div>
                <div className = "input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                     type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div className = "input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                     type="password" id="password" name="password" placeholder="Password" required />
                </div>
                <button className="button primary-button" type="submit">Register</button>
            </form>

              <p>Already have an account? <Link to={"/login"}>Login here</Link></p>

        </div>
    </main> 
  );
};

export default Register;