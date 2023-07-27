import React from "react";
import "./profileDetail.css";

const ProfileDetail = () => {
  return (
    <>
      <div className="section">
        <div className="whole-left">
          <div className="left">
            <div className="left-img">
              <img src="https://smarthr.dreamguystech.com/materialize/template/assets/img/profiles/avatar-02.jpg"></img>
            </div>
            <div className="left-inner">
              <h5>John Doe</h5>
              <p>Admin</p>
              <h6>Employee Id: 4</h6>
              <p>Date Of Join: 2023-04-23</p>
            </div>
          </div>
          <button>Send Message</button>
        </div>
        <hr />
        <div className="right">
          <ul>
            <li>
              <span className="title">Email:</span>
              <h6 className="desc"> joshDoe@gmail.com</h6>
            </li>
            <li>
              <span className="title">BirthDay:</span>
              <h6 className="desc"> 1989-01-23</h6>
            </li>
            <li>
              <span className="title">Adress:</span>
              <h6 className="desc"> fjkw wkjjwb wkjvbwk</h6>
            </li>
            <li>
              <span className="title">Gender:</span>
              <h6 className="desc"> Male</h6>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="personal-details">
        <div className="personal-details-inner">
          <h4>Personal Details</h4>
          <div>
            <ul>
              <li>
                <h6>Name: </h6>
                <p>John Doe</p>
              </li>
              <li>
                <h6>Phone: </h6>
                <p>9861989252</p>
              </li>
              <li>
                <h6>Nationality: </h6>
                <p>Nepal</p>
              </li>
              <li>
                <h6>Marital Status: </h6>
                <p>Unmarried</p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h4>Emergency Contact</h4>
            <ul>
              <li>
                <h6>Name: </h6>
                <p>Sam Doe</p>
              </li>
              <li>
                <h6>Relationship: </h6>
                <p>Father</p>
              </li>
              <li>
                <h6>Phone: </h6>
                <p>9861989252</p>
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <ul>
              <li>
                <h6>Bank Name: </h6>
                <p>ICIC Bank</p>
              </li>
              <li>
                <h6>Bank Account No.: </h6>
                <p>273648274627834</p>
              </li>
              <li>
                <h6>PAN No: </h6>
                <p>27462992</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
