import React from 'react'
import customTheme from './styles/theme'
import { ThemeProvider,CSSReset,Flex } from '@chakra-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header, Left, Nav, Logout, Middle, Home, Right } from './components'
import PostSection from './components/PostSection.js'
import Profile from './components/Profile.js'

// To do: 
// Add Profile Component
// Add Avails Component
// Add Notification Component
// Login
// Logout
// Signup


// ThemeProvider - provides 'customTheme' to every component using context api
// CSSReset - removes browser default styles
//          - recommended to ensure all components work correctly.

const App = () => {
  // #DevOnly - custom theme
  console.log(customTheme)

//   const login = async (user) => {
//     try{
//       const { data } = await axios.post('/api/login',user)
//       setUser(data)
//     }catch(error){
//       alert(error)
//     }
//   }

//   const signup = async (user) => {
//     try{
//       const { data } = await axios.post('/api/signup',user)
//       alert(data.message)
//     }catch(error){
//       alert(error)
//     }
//   }

  return (
    <Router>
      <ThemeProvider theme={customTheme}>
        <CSSReset/>
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
            
          </Right>
          {/* End of Right/Ads */}
        </Flex>
        {/* End of Main */}
      </ThemeProvider>
    </Router>
  )
}

export default App
