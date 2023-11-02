/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CareerResources from './CareerResources'
import CareerList from './components/CareerList'
import Help from './Help'

export default function Main() {
  const [table, setTable] = useState()
  useEffect(() => {
    const loadCareers = async () => {
      const response = await axios.get('http://localhost:8080/career')
    }
    loadCareers()
  }, [])
  // const onChangeHandler = (text) => {
  //   let matches = []
  //   if (text.length > 0) {
  //     matches = careers.filter((career) => {
  //       const regex = new RegExp(`${text}`, 'gi')
  //       return career.title.match(regex)
  //     })
  //   }
  //   console.log('matches', matches)
  //   setSuggestions(matches)
  //   setText(text)
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   console.log('Careers:', careers)
  //   const filteredCareers = careers.filter((career) => career.title.match(text))

  //   setFilteredCareers(filteredCareers)
  //   console.log('filteredCareers', filteredCareers)
  // }

  const onClickHandler = () => {
    setTable(<CareerList />)
  }

  return (
    <>
      <div className="Main" id="main">
        <h1>CAREER PATH AGGREGATOR</h1>
        <p>Get a list of required tech and courses for your career</p>
        <button onClick={onClickHandler}>Get Table</button>
        {table}
      </div>
      <CareerResources />
      <Help />
    </>
  )
}
