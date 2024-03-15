import React from "react";
import ImageComponent from "../../ImageComponent";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="account">
      <div className="row">
        <div className="col-2">
          <ImageComponent imagePath={"/images/image1.png"} altText="" />
        </div>
        <div className="col-2 login-col">
          {/* Register form */}
          <div className="form">
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
              <Link to="/login">
                <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
