import React, { useState, useEffect } from "react";
import "../styles/LoginScreen.css";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoading(true);
      setTimeout(() => {
        window.location = "/cart";
        setIsLoading(false);
      }, 5000);
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    // Start loading animation
    setIsLoading(true);

    const user = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:8090/user/signin", user);
      console.log(res);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.result));
      window.location = "/cart";
    } catch (err) {
      if (err.response.status === 404) {
        document.querySelector(".incorectusername").innerHTML =
          "Please register before login";
      }
      if (err.response.status === 400) {
        document.querySelector(".incorectusername").innerHTML =
          "Invalid Password";
      }
    } finally {
      // Stop loading animation
      setIsLoading(false);
    }
  };

  return (
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form className="loginform">
          <h1 className="form-name">Cook</h1>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            className="login-input-boxe"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="login-input-boxe"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <p className="incorectusername">
            <b></b>
          </p>

          <br />
          <br />

          <button className="singin-button" onClick={loginHandler}>
            {isLoading ? "Authenticating..." : "LogIn"}{" "}
            {/* Show loading or Login */}
          </button>

          <br />
        </form>
        <label className="login-registerpage-link-lebel">
          Don't have an account ?
        </label>
        <a href="/register" className="Login-page-link">
          Create Account
        </a>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default LoginScreen;
