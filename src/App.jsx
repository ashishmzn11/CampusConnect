import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";

import './App.css'
import StudentSignIn from './Component/User/StudentSignIn';
import StudentSignUp from './Component/User/StudentSignUp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
        <Route path="/" element={<StudentSignIn/>} />
        <Route path="/SignUp" element={<StudentSignUp/>} />
      </Routes>
    </>
  )
}

export default App
