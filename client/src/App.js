import React,{useState, useLayoutEffect} from 'react'
import customTheme from './styles/theme'
import { ThemeProvider,CSSReset,Flex } from '@chakra-ui/core'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Header, Left, Nav, Logout, Middle, Home, Right } from './components'
import PostSection from './components/PostSection.js'
import Profile from './components/Profile.js'
import Search from './components/Search.js'
import LoginSignup from './components/LoginSignup.js'
import axios from 'axios'
import Toast from './components/Toast.js'
import PostProvider from './components/PostProvider.js'

// To do: 
// Add Avails Component
// Add Notification Component

/*
  
  Buttom Navigation for mobile
  Spinner for Profile Section
  Toast Message for every alert
  Edit Profile Form
  Sessions
  Add Image Feature
*/

// ThemeProvider - provides 'customTheme' to every component using context api
// CSSReset - removes browser default styles
//          - recommended to ensure all components work correctly.

export const UserContext = React.createContext(null)


const App = () => {

  const [user, setUser] = useState()
  // Toast Message
  const [message, setMessage] = useState()

  const login = async (user) => {
    try{
      const { data } = await axios.post('/api/login',user)
      const info = {
        user: data.user,
        token: data.token,
      }
      setUser(info)
      localStorage.setItem("user", JSON.stringify(info))
      setMessage({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }catch(error){
      setMessage({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const signup = async (user) => {
    try{
      const { data } = await axios.post('/api/signup',user)
      setMessage({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }catch(error){
      setMessage({
        title: "Success",
        description: error.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  useLayoutEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset/>
      <UserContext.Provider value={[user,setUser]}>
        <Toast message={message} />
        {
          !user ? <LoginSignup login={login} signup={signup} />
          : <div>
              <Redirect to="/home" />
              
              {/* Header */}
              <Header title="Donasource" />
              {/* Main */}
              <Flex 
                justify={{base: "center", xl: "space-evenly"}}  
                bg="gray.100"
              >
                {/* Left/Sidebar */}
                <Left>
                  {/* Navigation */}
                  <Nav />
                  {/* Logout */}
                  <Logout />
                </Left>
                {/* End of Left/Sidebar */}

                <PostProvider>
                  {/* Middle */}
                  <Middle>
                    {/* Section */}
                    <Switch>
                      <Route path="/home" component={Home} />
                      <Route exact path="/profile" component={Profile} />
                      {/*<Route path="/notification" component={Notification} />
                      <Route path="/avail" component={Avails} />
                      */}
                      <Route path="/profile/post/:id" component={PostSection} />
                    </Switch>
                  </Middle>
                  {/* End of Middle */}
                  

                  {/* Right/Ads */}
                  <Right>
                      <Search/>
                  </Right>
                  {/* End of Right/Ads */}
                </PostProvider>
              </Flex>
              {/* End of Main */}
            </div>
        }
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
