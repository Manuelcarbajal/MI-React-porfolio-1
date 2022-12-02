import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginImg from "../../images/auth/login.jpg";





const Contact = () => {
    return (
        <div className="content-page-wrapper">
          <div
            className="left-column"
            style={{
              background: "url(" + loginImg + ") no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <div className="right-column">
            <div className="contact-bullet-points">
              <div className="bullet-point-group">
                <div className="icon">
                  <FontAwesomeIcon icon="phone" />
                </div>
    
                <div className="text">555-555-5555</div>
              </div>
    
              <div className="bullet-point-group">
                <div className="icon">
                  <FontAwesomeIcon icon="envelope" />
                </div>
    
                <div className="text">manuelcrabajal@gmail.com</div>
              </div>
    
              <div className="bullet-point-group">
                <div className="icon">
                  <FontAwesomeIcon icon="map-marked-alt" />
                </div>
    
                <div className="text">chihu, Mex</div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Contact;
