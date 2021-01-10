import React, { Component } from 'react'
import Header from './Header'
import './index.css'

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

    handleSubmit=(event)=>{
        this.props.history.push({
            pathname:'/result',
            state:this.state
        })
    }
    
    render() {
        console.log("rendering home page")
        return (
            <div className="page-container">
                <Header/>
                <div class = "banner">      
                    <div class="contact-form">
                        <h3 class="form-header">Tell Us What You are Looking For</h3>
                        <form onSubmit={this.handleSubmit} autocomplete="off">

                            <div class="input-container">
                                <input type="text" value={this.state.zipcode} onChange={this.handleZipcodeChange} 
                                    name="zipcode" class="input" />
                                <label for="">Zipcode</label>
                                <span>Zipcode</span>
                            </div>

                            <div class="input-container">
                                <select value={this.state.animal} onChange={this.handleAnimalChange} id="animal" name="animal" class="input">
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                </select>
                                <label for="">Animal</label>
                                <span>Animal</span>
                            </div>

                            <div class="input-container">
                                <select value={this.state.breed} onChange={this.handleBreedChange} id="breed" name="breed" class="input">
                                    <option value="husky">Husky</option>
                                    <option value="labrador">Labrador</option>
                                </select>
                                <label for="">Breed</label>
                                <span>Breed</span>
                            </div>

                            <div class="input-container">
                                <input value={this.state.maxAge} onChange={this.handleMaxAgeChange} name="age" class="input"></input>
                                <label for="">Max Age</label>
                                <span>Max Age</span>
                            </div>

                            <input type="submit" value="Search" class="btn" />
                        </form>
                    </div>
            
                </div>
                
            </div>
        )
    }
}

export default Home
