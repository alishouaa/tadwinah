import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/home';
import Login from './component/login';
import Register from './component/register';
import createPost from './component/createPost';
import viewPost from './component/viewPost';
import EditPost from './component/EditPost';
import axios from 'axios';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { 'Authorization': token };
  }
  render() {

    return (
      <Router>
        <div>
          <Header> </Header>

          <div className="conatiner">

            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/Login' component={Login} />
              <Route path='/Register' component={Register} />
              <Route path='/post/create' component={createPost}/>
              <Route path='/post/view/:id' component={viewPost}/>
              <Route path='/post/edit/:id' component={EditPost}/>


            </Switch>

          </div>
        </div>
      </Router>
    );
  }


}

export default App;
