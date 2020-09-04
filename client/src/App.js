import React,{useState, useLayoutEffect} from 'react'
import customTheme from './styles/theme'
import { ThemeProvider,CSSReset,Flex } from '@chakra-ui/core'
import { Route, Switch } from 'react-router-dom'
import { Header, Left, Nav, Middle, Home, Right } from './components'
import PostSection from './components/PostSection.js'
import Profile from './components/Profile.js'
import Search from './components/Search.js'
import LoginSignup from './components/LoginSignup.js'
import SearchSection from './components/SearchSection.js'
import axios from 'axios'
import Toast from './components/Toast.js'
import PostProvider from './components/PostProvider.js'
import NotificationSection from './components/NotificationSection.js'
import AvailsSection from './components/AvailsSection.js'

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
        description: "You have successfully created your account.",
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
                      <Route path="/search" component={SearchSection} />
                      <Route path="/notification" component={NotificationSection} />
                      <Route path="/avails" component={AvailsSection} />
                      <Route exact path="/:username" component={Profile} />
                      <Route path="/:username/post/:id" component={PostSection} />
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
