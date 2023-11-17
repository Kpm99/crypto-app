import React from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Header from './component/header'
import Coins from './component/coins'
import Exchanges from './component/Exchanges'
import CoinDetails from './component/CoinDetails'
import Home from './component/home'
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/exchanges' element={<Exchanges/>}/>
        <Route path='/coin/:id' element={<CoinDetails/>}/>
      </Routes>
    </Router>
  )
}


export default App
