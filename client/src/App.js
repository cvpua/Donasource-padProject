import React,{useState} from 'react'
import LoginSignup from "./components/LoginSignup/LoginSignup.js";
import Layout from './Layout/Layout.js'
import './App.css';
import MarcoPic from './assets/dp.jpg'
import {Feed,Notification,Avail,Profile} from './Sections'
import {Typography, theme} from './components/home'
import {Switch, Route} from 'react-router-dom'

export const FeedContext = React.createContext()

const INITIAL_STATE = [
  {
    avatar: MarcoPic,
    title: "I need alcohol pls guys",
    author: "Marco Mirandilla",
    type: "request",
    status: "fulfilled",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor orci neque, vitae condimentum felis tincidunt non. Nulla commodo urna ac neque bibendum, sed convallis odio faucibus. Mauris accumsan ornare augue, ut porttitor lacus condimentum ut. Vestibulum consequat enim sit amet leo faucibus iaculis. Nam vehicula rutrum dui nec euismod. Curabitur eu interdum justo. Praesent malesuada, elit eu eleifend maximus, lorem purus molestie magna, sed blandit quam justo sed odio. Nulla varius finibus posuere. Vestibulum a turpis sed sem varius cursus sed vitae justo. Ut euismod erat neque.",
    items: "4",
  },
]

const App = () => {
  const [user, setUser] = useState(true)
  const [posts, setPosts] = useState(INITIAL_STATE)

  const login = () => {
    setUser(true)
  }

  const addPost = (data) => {
    const newPost = {
      ...data,
      avatar: MarcoPic,
      author: "Marco Mirandilla"
    }
    setPosts(prevState => (
      [
        ...prevState,
        newPost,
      ]
    ))
  }

  const feed = {
    addPost,
    posts,
  }

   // useEffect(() => {
  //    const fetchData = async () => {
  //      try{
  //        const { data } = await api.getAllPosts()
  //        setPosts(data)
  //      }catch(error){
  //        alert(error.response.data.data.message)
  //      }
  //    }
  //    fetchData()
  //  }, [])

  return (
    <div className="App">
      <FeedContext.Provider value={feed}>
      {user ?
        <Layout>
          <Switch>
            <Route path="/home" component={Feed} />
            <Route path="/notification" exact component={Notification} />
            <Route path="/avail" exact component={Avail} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Layout>
      : <LoginSignup event = {login}/>
      }
      </FeedContext.Provider>
    </div>
  )
}

export default App
