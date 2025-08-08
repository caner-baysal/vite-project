import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import Success from './components/Success';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
      <Route exact path="/" element={<Register/>}/>
              
      <Route path="/Success" component={<Success/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
