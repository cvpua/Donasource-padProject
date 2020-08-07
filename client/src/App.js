import React,{useState} from 'react'
import LoginSignup from "./components/LoginSignup/LoginSignup.js";
import Layout from './Layout/Layout.js'
import './App.css';
import {Feed,Notification,Avail,Profile,Post} from './Sections'
import {Switch, Route} from 'react-router-dom'
import SectionHeader from './components/home/SectionHeader.js'

const App = () => {
  const [user, setUser] = useState(true)

  const login = () => {
    setUser(true)
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
            <Route path="/profile/post/:id">
              <Post />
            </Route>
          </Switch>
        </Layout>
      : <LoginSignup event = {login}/>
      }
    </div>
  )
}

export default App
