import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { createBrowserHistory as history } from 'history'
import Home from "./components/Home";
import SearchResult from "./components/SearchResult"
import React, {Component} from 'react'
import SearchCriteriaContext from "./components/SearchCriteriaContext"

const searchCriteriaInitial = {}
const searchCriteriaReducer = (state,action)=>{
  switch(action.type){
    case 'update':
      return action.data
    default:
      return state
  }
}

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       searchCriteria:{},
       setSearchCriteria:this.setSearchCriteria
    }
  }
  
  setSearchCriteria = newSC =>{
    this.setState({searchCriteria:newSC})
  }

  render(){
    return (
      <SearchCriteriaContext.Provider value={this.state}>
      <div className="App">
        <Router history ={history}>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/result" component={SearchResult}/>
          </Switch>
        </Router>
      </div>
      </SearchCriteriaContext.Provider>
    );
  }
  
}

export default App;
