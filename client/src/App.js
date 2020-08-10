import React,{useState} from 'react'
import LoginSignup from "./components/LoginSignup/LoginSignup.js";
import Layout from './Layout/Layout.js'
import './App.css';
import {Feed,Notification,Avail,Profile,Post} from './Sections'
import {Switch, Route} from 'react-router-dom'
import SectionHeader from './components/home/SectionHeader.js'
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState(false)
  
  const login = async (user) => {
    try{
      const { data } = await axios.post('/api/login',user)
      setUser(data)
    }catch(error){
      alert(error.response.data.message)
    }
  }

  const signup = async (user) => {
    try{
      const { data } = await axios.post('/api/signup',user)
      alert(data.message)
    }catch(error){
      alert(error.response.data.message)
    }
  }

  return (
    <div className="App">
      {user ?
        <Layout>
          <Switch>
            <Route path="/home">
              <>
                <SectionHeader title="Home" />
                <Feed />
              </>
            </Route>
            <Route path="/notification">
              <Notification />
            </Route>
            <Route path="/avail">
              <Avail />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
const Container = styled.div `
            <Route path="/profile/post/:id">
              <Post />
            </Route>
          </Switch>
        </Layout>
      : <LoginSignup login={login} signup={signup}  />
      }
    </div>
  )
}

export default App
