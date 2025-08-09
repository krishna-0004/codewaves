import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../Style/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_b1wwqca",
        "template_li3lznk",
        e.target,
        "zAjJwk5oA8NMC8WEM"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Email send failed:", error);
        setSuccessMessage("Failed to send your message. Please try again.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h2 className="contact-title">Contact Us</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="contact-content">
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn" disabled={isSending}>
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
