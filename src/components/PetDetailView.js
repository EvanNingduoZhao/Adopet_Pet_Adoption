import React, {useState, useEffect, useContext} from 'react';
import Header from './Header';
import axios from 'axios';
import SearchCriteriaContext from './SearchCriteriaContext';


function PetDetailView(props) {
    const [petInfo,setPetInfo] = useState({})
    const petId = props.match.params['id']
    let petPicURL=`http://localhost:5000/api/pets/picture/${petId}`
    console.log(petId)
    const leftAngleBracket = "<  "
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

    useEffect(()=>{
        console.log(petInfo)
    },[petInfo])

    const renderStory=(story)=>{
        if(story.split(" ").length<200){
            return (<p className="story-content">{petInfo.story}</p>)
        }else{
            let shortened = story.split(" ").slice(0,201).join(" ");
            return (<div>
                        <span className="story-content">{shortened}</span>
                        <span className="show-more">Show More</span>
                    </div>)
        }
    }
    return (
        <div className="page-container">
            <Header/>
            <div className="page-left">
                <div className="go-back-button" onClick={()=>{
                    props.history.push({
                        pathname:'/result'
                    })
                }}> {leftAngleBracket}Back to Results </div>
                <div className="intro-pic">
                    <h1 className="introduction"> My name is {petInfo.name}! </h1>
                    <img className="pet-pic-detail" src={petPicURL}/>
                </div>
            </div>

            <div className="facts-story">
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
                <div className="my-story">
                    <div className="section-title">My Story</div>
                    <p className="story-content">{petInfo.story}</p>
                    {/* {renderStory(petInfo.story? petInfo.story : " ")} */}
                </div>
            </div>
            
        </div>
    )
}

export default PetDetailView
