import React from 'react'

export default function Contact() {
  return (
    <div className="contact">
      <div className="contactMain">
        <h1>Contact Us</h1>
        <form method="POST">
          <input
            name="Name"
            className="feedback-input"
            placeholder="Name"
            required=""
          />
          <input
            name="Email"
            type="email"
            className="feedback-input"
            placeholder="Email"
            required=""
          />
          <textarea
            name="Message"
            className="feedback-input"
            placeholder="Message"
            maxLength="2500"
            required=""
          ></textarea>
          <input type="submit" value="SUBMIT" />
        </form>
      </div>
    </div>
  )
}
