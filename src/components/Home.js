import React, { Component } from 'react'
import Header from './Header'
import './index.css'
import SearchCriteriaContext from "./SearchCriteriaContext"

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             zipcode:'',
             animal:'',
             breed:'',
             maxAge:''
        }
    }


    handleZipcodeChange = (event)=>{
        this.setState({
            zipcode:event.target.value
        })
    }

    handleAnimalChange=(event)=>{
        this.setState({
            animal:event.target.value
        })
    }

    handleBreedChange=(event)=>{
        this.setState({
            breed:event.target.value
        })
    }

    handleMaxAgeChange=(event)=>{
        this.setState({
            maxAge:event.target.value
        })
    }

    // handleSubmit=(event)=>{
    //     this.props.history.push({
    //         pathname:'/result',
    //         state:this.state
    //     })
    // }
    
    render() {
        console.log("rendering home page")
        return (
            <SearchCriteriaContext.Consumer>
                {({SearchCriteria,setSearchCriteria})=>(
                    <div className="page-container">
                        <Header/>
                        <div className = "banner">      
                            <div className="contact-form">
                                <h3 className="form-header">Tell Us What You are Looking For</h3>
                                <form onSubmit={()=>{
                                    setSearchCriteria(this.state)
                                    this.props.history.push({
                                        pathname:'/result'
                                    })
                                }}>

                                    <div className="input-container">
                                        <input type="text" value={this.state.zipcode} onChange={this.handleZipcodeChange} 
                                            name="zipcode" className="input" />
                                        <label>Zipcode</label>
                                        <span>Zipcode</span>
                                    </div>

                                    <div className="input-container">
                                        <select value={this.state.animal} onChange={this.handleAnimalChange} id="animal" name="animal" class="input">
                                            <option value="dog">Dog</option>
                                            <option value="cat">Cat</option>
                                        </select>
                                        <label>Animal</label>
                                        <span>Animal</span>
                                    </div>

                                    <div className="input-container">
                                        <select value={this.state.breed} onChange={this.handleBreedChange} id="breed" name="breed" className="input">
                                            <option value="American Bulldog">American Bulldog</option>
                                            <option value="Alaskan Malamute">Alaskan Malamute</option>
                                            <option value="Anatolian Shepherd">Anatolian Shepherd</option>
                                        </select>
                                        <label>Breed</label>
                                        <span>Breed</span>
                                    </div>

                                    <div className="input-container">
                                        <input value={this.state.maxAge} onChange={this.handleMaxAgeChange} name="age" className="input"></input>
                                        <label>Max Age</label>
                                        <span>Max Age</span>
                                    </div>

                                    <button type="submit"  className="btn">Search</button>
                                </form>
                            </div>
                    
                        </div>
                        
                    </div>
                )}
            </SearchCriteriaContext.Consumer>
        )
    }
}

export default Home
