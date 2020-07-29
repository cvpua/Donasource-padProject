import React,{Component} from 'react';
import PostButton from './components/post-component/PostButton';
import LoginSignup from "./components/LoginSignup/LoginSignup.js";
import Layout from './Layout/Layout.js'
import Main from './Layout/Main.js'
import './App.css';

class App extends Component{
  state = {
    user: true,
  }
  login = () => {
    this.setState ({
      user: true,
    })
  }
  render(){
    return(
      <div className="App">
        {this.state.user ?
          <Layout>
            <Main />
          </Layout>
        : <LoginSignup event = {this.login}/>
        }
      </div>
    )
  }
}

export default App;
