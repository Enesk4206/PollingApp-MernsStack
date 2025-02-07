import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,} from "react-router-dom"
import LoginForm from "./pages/Auth/LoginForm"
import SignUpForm from "./pages/Auth/SignUpForm"
import Home from "./pages/Dashboard/Home"
import CreatePoll from "./pages/Dashboard/CreatePoll"
import VotedPolls from "./pages/Dashboard/VotedPolls"
import Bookmarks from "./pages/Dashboard/Bookmarks"
import MyPoll from "./pages/Dashboard/MyPoll"
import UserProvider from './context/UserProvider'

const App = () => {
  return (
    <div className=''>
      <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' exact element={<LoginForm/> } />
          <Route path='/signup' exact element={<SignUpForm/> } />
          <Route path='/dashboard' exact element={<Home/> } />
          <Route path='/create-poll' exact element={<CreatePoll/> } />
          <Route path='/my-polls' exact element={<MyPoll/> } />
          <Route path='/voted-polls' exact element={<VotedPolls/> } />
          <Route path='/bookmarked-polls' exact element={<Bookmarks/> } />
        </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App

//Define to Root 

const Root = () => {
  //check token AS HAVE TOKEN
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to={"/dashboard"}/>
    
  ) : (
      <Navigate to={"/login"}/>
  )
}