import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { createBrowserHistory as history } from 'history'
import Home from "./components/Home";
import SearchResult from "./components/SearchResult"
import React, {Component} from 'react'
import SearchCriteriaContext from "./components/SearchCriteriaContext"
import PetDetailView from './components/PetDetailView';


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
            {/* Home component displays a form that let users enter their search criteria */}
            <Route path="/" exact component={Home}/>
            {/* SearchResult component displays a list view of search results */}
            <Route path="/result" component={SearchResult}/>
            {/* PetDetailView component display a detail view of a particular pet */}
            <Route path="/pet/:id" component={PetDetailView}/>
          </Switch>
        </Router>
      </div>
      </SearchCriteriaContext.Provider>
    );
  }
  
}

export default App;
