import React from 'react'
import Helpimg from './helpimg.svg'

export default function Help() {
  return (
    <div className="helpContainer">
      <div className="leftHelp">
        <img src={Helpimg} alt="Help"></img>
      </div>
      <div className="rightHelp">
        <h2 className="gradient-text">Do you need help?</h2>
        <p>
          It can be difficult not knowing the path to the career you want. Some
          people end up halfway through their careers before realising they are
          on the wrong path to what they really want to do. We are here to help.
        </p>
        <p>
          You will have endless opportunities to progress with Career Path
          Aggregator. It will transform your career as you will have laser focus
          on your career goals. No matter your background, interests or
          aspirations, we will point you in the right direction.
        </p>
      </div>
    </div>
  )
}
