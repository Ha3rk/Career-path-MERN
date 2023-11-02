import React from 'react'
import career1 from './icons/career1.png'
import planaheadlogoblack from './planahead-logo-black.png'
import benefits from './icons/icons8-benefits-100.png'

export default function CareerResources() {
  return (
    <div className="careerResources">
      <div className="careerHeader">
        <h2>
          Why should you use <span className="gradient-text">PlanAhead?</span>
        </h2>
      </div>
      <div className="careerCards">
        <div className="card">
          <img src={planaheadlogoblack} className="planaheadlogoblack" />
          <p className="title">What is PlanAhead?</p>
          <p className="text">
            PlanAhead is a Career Path Aggregator, which web service API which
            allows the user search a career path.{' '}
          </p>
        </div>
        <div className="card">
          <img src={career1} />
          <p className="title">How can it help you?</p>
          <p className="text">
            PlanAhead Career Path Aggregator can help you find paths of
            different specified careers to make it easier to find details on
            what path to take and which resources to use to learn the specified
            path.
          </p>
        </div>
        <div className="card">
          <img src={benefits} />
          <p className="title">What are the benefits?</p>
          <p className="text">
            Using the Career Path Aggregator allows you to explore career paths,
            figure out the right path for you or find resources where to learn
            technologies required for specified career path
          </p>
        </div>
      </div>
    </div>
  )
}
