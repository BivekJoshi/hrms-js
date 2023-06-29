import React, { useState } from "react";
import { useSendEmail } from "../../hooks/Email/useemail";

function EmailForm() {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const { mutate } = useSendEmail();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Sending email:", emailData);

    mutate(emailData);

    setEmailData({
      to: "",
      subject: "",
      body: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", columnGap: "25px", lineHeight: "40px" }}>
        <div style={{ display: "grid", rowGap: "25px" }}>
          <label>To:</label>
          <label>Subject:</label>
        </div>
        <div style={{ display: "grid", rowGap: "25px", width: "400px" }}>
          <input
            type="text"
            name="to"
            value={emailData.to}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          columnGap: "43px",
          lineHeight: "40px",
          marginTop: "20px",
        }}
      >
        <label>Body:</label>
        <textarea
          style={{ width: "400px" }}
          type="text"
          name="body"
          value={emailData.body}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <br />
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;
