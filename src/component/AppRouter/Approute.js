import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../HomePage/Home'
import SingleCoin from '../Single/SingleCoin'

function Approute() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='coins/:id' element={<SingleCoin/>}></Route>
      </Routes>
    </div>
  )
}

export default Approute
