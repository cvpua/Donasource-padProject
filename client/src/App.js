import React,{useState, useEffect} from 'react'
import customTheme from './styles/theme'
import { ThemeProvider,CSSReset,Flex, useToast } from '@chakra-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header, Left, Nav, Logout, Middle, Home, Right } from './components'
import PostSection from './components/PostSection.js'
import Profile from './components/Profile.js'
import Search from './components/Search.js'
import LoginSignup from './components/LoginSignup/LoginSignup.js'
import axios from 'axios'
import Toast from './components/Toast.js'

// To do: 
// (done) Add Profile Component
// Add Avails Component
// Add Notification Component
// Login
// Logout
// Signup


// ThemeProvider - provides 'customTheme' to every component using context api
// CSSReset - removes browser default styles
//          - recommended to ensure all components work correctly.

export const UserContext = React.createContext()

const App = () => {
  // #DevOnly - custom theme
  console.log(customTheme)

  const [user, setUser] = useState()
  const [message, setMessage] = useState()
 
  const login = async (user) => {
    try{
      const { data } = await axios.post('/api/login',user)
      setUser({
        user: data.user,
        token: data.token,
      })
      setMessage({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 6000,
        isClosable: true,
      })
    }catch(error){
      setMessage({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 6000,
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
        duration: 6000,
        isClosable: true,
      })
    }catch(error){
      setMessage({
        title: "Success",
        description: error.message,
        status: "success",
        duration: 6000,
        isClosable: true,
      })
    }
  }

  return (
    <Router>
      <ThemeProvider theme={customTheme}>
        <CSSReset/>
        <UserContext.Provider value={user}>
          <Toast message={message} />
          {
            !user ? <LoginSignup login={login} signup={signup} />
            : <div>
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
                      <Search />
                  </Right>
                  {/* End of Right/Ads */}
                </Flex>
                {/* End of Main */}
              </div>
          }
        </UserContext.Provider>
      </ThemeProvider>
    </Router>
  )
}

export default App
