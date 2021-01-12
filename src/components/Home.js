import React, { Component } from 'react'
import Header from './Header'
import './index.css'
import SearchCriteriaContext from "./SearchCriteriaContext"
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            formData:{
                zipcode:'',
                animal:'',
                breed:'',
                maxAge:''
            },
            animal_breeds_dict:{'Dog':['Husky']},
            zipcodeError:"",
            maxAgeError:"",
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/api/pets")
        .then(res=>{
            let fetched_pets=res.data
            console.log(fetched_pets)
            let animal_breeds={}
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
            console.log(this.state.animal_breeds_dict)
        })
    }


    validateForm=()=>{
        let zipcodeError="";
        let maxAgeError="";

        let currZipcode=this.state.formData.zipcode;
        let currMaxAge=this.state.formData.maxAge;
        console.log(currZipcode)
        console.log(currMaxAge)
        if(currZipcode.length!==5 || isNaN(currZipcode)){
            zipcodeError="Please enter a valid zipcode";
        }
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
        console.log("rendering home page")
        return (
            <SearchCriteriaContext.Consumer>
                {({SearchCriteria,setSearchCriteria})=>(
                    <div className="page-container">
                        <Header/>
                        <div className = "banner">      
                            <div className="contact-form">
                                <h3 className="form-header">Tell Us What You Are Looking For</h3>
                                <form onSubmit={(event)=>{
                                    event.preventDefault();
                                    const isValid = this.validateForm();
                                    if(isValid){
                                        setSearchCriteria(this.state.formData)
                                        this.props.history.push({
                                            pathname:'/result'
                                        })
                                    }
                                }}>

                                    <div className="input-container">
                                        <input type="text" value={this.state.formData.zipcode} onChange={this.handleZipcodeChange} 
                                            name="zipcode" className="input" placeholder=" Zipcode"/>
                                        {/* <label>Zipcode</label>
                                        <span>Zipcode</span> */}
                                        <div className="formError">{this.state.zipcodeError}</div>
                                    </div>

                                    <div className="input-container">
                                        <select value={this.state.formData.animal} onChange={this.handleAnimalChange} id="animal" name="animal" class="input" placeholder="Animal Type">
                                            {/* <option value="dog">Dog</option>
                                            <option value="cat">Cat</option> */}
                                            <option disabled={true} value="">Select Animal Type</option>
                                            {
                                                Object.keys(this.state.animal_breeds_dict).map((animal)=>{
                                                    return(
                                                        <option value={animal}>{animal}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {/* <label>Animal</label>
                                        <span>Animal</span> */}
                                    </div>

                                    <div className="input-container">
                                        <select value={this.state.formData.breed} onChange={this.handleBreedChange} id="breed" name="breed" className="input">
                                            <option disabled={true} value="">Select Breed</option>
                                            {
                                                this.state.animal_breeds_dict[this.state.formData.animal ? this.state.formData.animal:'Dog'].map((breed)=>{
                                                    return(
                                                        <option value={breed}>{breed}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {/* <label>Breed</label>
                                        <span>Breed</span> */}
                                    </div>

                                    <div className="input-container">
                                        <input value={this.state.formData.maxAge} onChange={this.handleMaxAgeChange} name="age" className="input" placeholder=" Max Age"></input>
                                        {/* <label>Max Age</label>
                                        <span>Max Age</span> */}
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
