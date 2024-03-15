import React from "react";
import "./Login.css";
import ImageComponent from "../../ImageComponent";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="account">
      <div className="row">
        <div className="col-2">
          <ImageComponent imagePath={"/images/image1.png"} altText="" />
        </div>
        <div className="col-2 login-col">
          {/* login form */}
          <div className="form">
            <p>Login</p>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit" className="btn">
              Login
            </button>
            <p>
              Don't have an account?
              <Link to="/register">
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Register
                </span>
              </Link>
            </p>
          </div>

          {/* Register form */}
          {/* <div className="form">
              <p>Register</p>
              <input type="name" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="password" required />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone number"
                pattern="[0-9]{10}"
                required
              />
              <button type="submit" className="btn">
                Register
              </button>
              <p>
                Already have an account?
                <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
              </p>
            </div> */}
        </div>
      </div>
    </div>
  );
}
