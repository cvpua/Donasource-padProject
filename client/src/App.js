import React,{useState, useLayoutEffect} from 'react'
import customTheme from './styles/theme'
import { ThemeProvider,CSSReset,Flex, IconButton, Box } from '@chakra-ui/core'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { Header, Left, Nav, Logout, Middle, Home, Right } from './components'
import PostSection from './components/PostSection.js'
import Profile from './components/Profile.js'
import Search from './components/Search.js'
import LoginSignup from './components/LoginSignup.js'
import SearchSection from './components/SearchSection.js'
import axios from 'axios'
import Toast from './components/Toast.js'
import PostProvider from './components/PostProvider.js'
import { BiHomeSmile, BiBell, BiFace, BiBox, BiPlus } from 'react-icons/bi'
import NotificationSection from './components/NotificationSection.js'
import AvailsSection from './components/AvailsSection.js'

// To do: 
// (Done) Add Avails Component
// (Done) Add Notification Component

/*
  
  (Done) Buttom Navigation for mobile
  (Done) Spinner for Profile Section
  (Done) Edit Profile Form
  (Done) Add Image Feature
  (Done) Add Empty Messages
  (Done) Add design to Search
  (Done) Add logout api
  (Done) Add Deadline Featutre/Unfulfilled
  (Done) Add  Search Section
  (Done) Account Button
  (Done) Prevent Search Section to render if there is no input
  (Done) Fix logout
  
  Add Error Toast Messages
  Add Back Button
  Toast Message for every alert
  Don't send the complete user object in login
  Change Password
  Change user info to userId
  
  
*/

// ThemeProvider - provides 'customTheme' to every component using context api
// CSSReset - removes browser default styles
//          - recommended to ensure all components work correctly.

export const UserContext = React.createContext(null)


const App = () => {
  console.log('Theme: ', customTheme)

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
              {/* Header */}
              <Header title="Donasource" />
              {/* Main */}
              <Flex 
                justify={{base: "center", xl: "space-evenly"}}  
              >
                {/* Left/Sidebar */}
                <Left>
                  {/* Navigation */}
                  <Nav variant="side" />
                </Left>
                {/* End of Left/Sidebar */}

                <PostProvider>
                  {/* Middle */}
                  <Middle>
                    {/* Section */}
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/profile" component={Profile} />
                      <Route path="/search" component={SearchSection} />
                      <Route path="/notification" component={NotificationSection} />
                      <Route path="/avails" component={AvailsSection} />
                      <Route path="/profile/post/:id" component={PostSection} />
                    </Switch>
                  </Middle>
                  {/* End of Middle */}
                  
                  {/* Bottom Navigation */}
                  <Nav variant="bottom" d={{base: "flex", md: "none"}} />

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
