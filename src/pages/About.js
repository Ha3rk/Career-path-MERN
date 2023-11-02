import React from 'react'
import aboutIllustration from '../aboutIllustration.svg'

export default function About() {
  return (
    <div className="about">
      <div className="aboutText">
        <h1>ABOUT US</h1>
      </div>
      <div className="aboutContainer">
        <div className="aboutLeft">
          <div className="aboutImg">
            <img src={aboutIllustration} className="aboutIllustration" />
            <h1>
              ALPHA<span className="gradient-text">DEVELOPERS</span>
            </h1>
          </div>
        </div>
        <div className="aboutRight">
          <h2>
            ALPHA<span className="gradient-text">DEVELOPERS</span>
          </h2>
          <p>
            We are a team of 6 people of designers, programmers, managers and
            more. We designed this application to showcase the capabilities of
            React and the whole MERN stack, including working with databases and
            REST API.
          </p>
        </div>
      </div>
    </div>
  )
}
