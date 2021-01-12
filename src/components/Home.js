import React, { Component } from 'react'
import Header from './Header'
import './index.css'
import SearchCriteriaContext from "./SearchCriteriaContext"
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            // stores use form input
            formData:{
                zipcode:'',
                animal:'',
                breed:'',
                maxAge:''
            },

            // stores animal and breeds options fetched from the server
            animal_breeds_dict:{'Dog':['Husky']},

            zipcodeError:"",
            maxAgeError:"",
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/api/pets")
        .then(res=>{
            let fetched_pets=res.data
            let animal_breeds={}

            // fetch animal and breeds data from sever
            // store unique animal type and corresponding breeds options
            fetched_pets.forEach(pet => {
                if(pet.animal in animal_breeds){
                    if (animal_breeds[pet.animal].includes(pet.breed)===false){
                        animal_breeds[pet.animal].push(pet.breed)
                    } 
                }else{
                    animal_breeds[pet.animal]=[pet.breed]
                }
            });

            // sort the array of breeds of each animal in alphabetical order
            for (const animal in animal_breeds){
                animal_breeds[animal].sort()
            }
            this.setState({animal_breeds_dict:animal_breeds})
        })
    }


    validateForm=()=>{
        let zipcodeError="";
        let maxAgeError="";

        let currZipcode=this.state.formData.zipcode;
        let currMaxAge=this.state.formData.maxAge;

        // if user input zipcode is not a 5-digit number, show zipcode error message
        if(currZipcode.length!==5 || isNaN(currZipcode)){
            zipcodeError="Please enter a valid zipcode";
        }

        // if user input max age is not a positive integer, show max age error message
        if(parseInt(currMaxAge)<=0 || isNaN(currMaxAge) || currMaxAge.length===0){
            maxAgeError="Please enter a valid max age";
        }

        if (zipcodeError || maxAgeError){
            this.setState({
                zipcodeError:zipcodeError,
                maxAgeError:maxAgeError
            })
            return false;
        }
        return true;
    }

    handleZipcodeChange = (event)=>{
        this.setState({
            formData:{...this.state.formData,zipcode:event.target.value}
        })
    }

    handleAnimalChange=(event)=>{
        this.setState({
            formData:{...this.state.formData,animal:event.target.value}
        })
    }

    handleBreedChange=(event)=>{
        this.setState({
            formData:{...this.state.formData,breed:event.target.value}
        })
    }

    handleMaxAgeChange=(event)=>{
        this.setState({
            formData:{...this.state.formData,maxAge:event.target.value}
        })
    }

   
    
    render() {
        return (
            <SearchCriteriaContext.Consumer>
                {({SearchCriteria,setSearchCriteria})=>(
                    <div className="page-container">
                        <Header/>

                        <div className = "banner">      
                            <div className="search-form">
                                <h3 className="form-header">Tell Us What You Are Looking For</h3>
                                <form onSubmit={(event)=>{
                                    event.preventDefault();
                                    const isValid = this.validateForm();
                                    if(isValid){
                                        // if form input is valid, use the setSearchCriteria function
                                        // provided by searchCriteriaContext.Consumer to update 
                                        // the searchCriteria global state
                                        setSearchCriteria(this.state.formData)
                                        // programmatically redirect to search result list view page
                                        this.props.history.push({
                                            pathname:'/result'
                                        })
                                    }
                                }}>
                                    
                                    {/* Zipcode input field */}
                                    <div className="input-container">
                                        <input type="text" value={this.state.formData.zipcode} onChange={this.handleZipcodeChange} 
                                            name="zipcode" className="input" placeholder=" Zipcode"/>
                                        <div className="formError">{this.state.zipcodeError}</div>
                                    </div>

                                    {/* Animal Type input field */}
                                    <div className="input-container">
                                        <select value={this.state.formData.animal} onChange={this.handleAnimalChange} id="animal" 
                                        name="animal" class="input" placeholder="Animal Type">
                                            <option disabled={true} value="">Select Animal Type</option>
                                            {
                                                // generate option tags of available animal types fetched from the server
                                                Object.keys(this.state.animal_breeds_dict).map((animal)=>{
                                                    return(
                                                        <option value={animal}>{animal}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    {/* Breed input field */}
                                    <div className="input-container">
                                        <select value={this.state.formData.breed} onChange={this.handleBreedChange} id="breed" name="breed" className="input">
                                            <option disabled={true} value="">Select Breed</option>
                                            {
                                                // generate option tags of avaiable breed options based on animal type selected
                                                this.state.animal_breeds_dict[this.state.formData.animal ? this.state.formData.animal:'Dog'].map((breed)=>{
                                                    return(
                                                        <option value={breed}>{breed}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    {/* Max Age input field */}
                                    <div className="input-container">
                                        <input value={this.state.formData.maxAge} onChange={this.handleMaxAgeChange} name="age" className="input" placeholder=" Max Age"></input>
                                        <div className="formError">{this.state.maxAgeError}</div>
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
