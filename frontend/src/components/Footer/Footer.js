import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col-1">
            <h3>Download Our App</h3>
            <p>Download App for Android and Ios Mobile Phone</p>
            <div className="app-logo">
              <img src="images/play-store.png" alt="" />
              <img src="images/app-store.png" alt="" />
            </div>
          </div>
          <div className="footer-col-2">
            <img src="images/logo-white.png" alt="" />
            <p>
              Our Purpose Is To Sustainably Make the Pleasure and Benefits of
              Sports Accesible to the Many.
            </p>
          </div>
          <div className="footer-col-3">
            <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>
          <div className="footer-col-4">
            <h3>Connect At</h3>
            <ul>
              <li>Facebook</li>
              <li>X</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">Copyright{new Date().getFullYear()}-ecommerce Website</p>
      </div>
    </div>
  );
}
