import React, {useState, useEffect} from 'react';
import Header from './Header';
import axios from 'axios';



function PetDetailView(props) {
    // petInfo state is designed to store the pet's breed, weight, color, age, sex and story fetched from server
    const [petInfo,setPetInfo] = useState({})
    const petId = props.match.params['id']
    let petPicURL=`http://localhost:5000/api/pets/picture/${petId}`
    const leftAngleBracket = "<  "

    // fetch pet information from server and store them in petInfo state
    useEffect(() => {
        axios.get(`http://localhost:5000/api/pets/${petId}`)
        .then(res=>{
            const pet_data=res.data[0]
            setPetInfo(pet_data)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }, [])

    // set document title to include pet name
    useEffect(() => {
        document.title = `Adopet - ${petInfo.name}`
     }, [petInfo]);
    
    return (
        <div className="page-container">
            <Header/>

            <div className="page-left">
                {/* go-back-button */}
                <div className="go-back-button" onClick={()=>{
                    // programmatically redirect users back to search result list view page
                    props.history.push({
                        pathname:'/result'
                    })
                }}> {leftAngleBracket}Back to Results </div>

                {/* self-intro message and pet picture */}
                <div className="intro-pic">
                    <h1 className="introduction"> My name is {petInfo.name}! </h1>
                    <img className="pet-pic-detail" src={petPicURL}/>
                </div>
            </div>

            <div className="facts-story">
                {/* Facts About Me section */}
                <div className="facts-about-me">
                    <div className="section-title">Facts About Me</div>
                    <div className="facts-about-me-content">
                        <span className="attribute-name left-section">Breed</span>
                        <span className='attribute'>{petInfo.breed}</span>
                        <span className="attribute-name right-section">Weight</span>
                        <span className='attribute'>{petInfo.weight} Pounds</span>
                        
                        <span className="attribute-name left-section">Color</span>
                        <span className='attribute'>{petInfo.color}</span>
                        <span className="attribute-name right-section">Age</span>
                        <span className='attribute'>{petInfo.age} yrs old</span>
                        
                        <span className="attribute-name left-section">Sex</span>
                        <span className='attribute'>{petInfo.gender}</span>
                    </div>
                </div>

                {/* My Story section */}
                <div className="my-story">
                    <div className="section-title">My Story</div>
                    <p className="story-content">{petInfo.story}</p>
                </div>
            </div>
            
        </div>
    )
}

export default PetDetailView
