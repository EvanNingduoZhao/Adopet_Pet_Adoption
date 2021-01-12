import React, {useEffect,useState,useContext} from 'react'
import Header from './Header'
import axios from 'axios'
import SearchCriteriaContext from './SearchCriteriaContext'
import {Link} from 'react-router-dom'

function SearchResult(props) {
    // load user's form input from searchCriteria global state
    const searchCriteriaObj = useContext(SearchCriteriaContext)
    const zipcode=searchCriteriaObj.searchCriteria.zipcode
    const animal=searchCriteriaObj.searchCriteria.animal
    const breed=searchCriteriaObj.searchCriteria.breed
    const maxAge=parseInt(searchCriteriaObj.searchCriteria.maxAge)

    // pets state is an array desigened to store pets fetched from the server that meet the search criteria
    const [pets,setPets]=useState([])

    // fetch pets from the server and store the ones meeting the search criteria into the pets state
    useEffect(() => {
        axios.get("http://localhost:5000/api/pets")
        .then(res=>{
            const fetched_data=res.data
            const search_result = fetched_data.filter(pet=>pet.zipcode===zipcode && pet.animal===animal && pet.breed===breed && pet.age<=maxAge)
            setPets(search_result)
        })
        .catch(err=>{
            console.log(err)
        })   
    }, [])

    // set document title
    useEffect(() => {
        document.title = "Adopet - Search Results"
     }, []);

    // helper function to capitalize first character of a word
    const capitalize=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    // render a message at the top of the list view according to the number of pets that meet the 
    // search criteria
    const render_result_title=()=>{
        if(pets.length>1){
            return <h2 className="result-title">We Found {pets.length} {capitalize(animal)}s Near Your Location</h2>
        }
        else if(pets.length===1){
            return <h2 className="result-title">We Found {pets.length} {capitalize(animal)} Near Your Location</h2>
        }
        else{
            return <h2 className="result-title">Sorry! No pets meet your search criteria</h2>
        }
    }


    return (
        <div className="page-container">
            <Header/>
            {render_result_title()}

            <div className="search-page-content">

                {/* Modify your search button */}
                <div className="modify-search">
                    <div className="modify-msg">Didn't find your perfect one?</div>
                    <p className="sub-modify-msg">Don't worry and modify your search here!</p>
                    <button className="modify-search-button" onClick={()=>{
                        // programatically redirect users back to the home page
                        props.history.push({
                            pathname:'/'
                        })
                    }}>Modify Your Search</button>
                </div>

                <div className="result-container">
                    { pets.map((pet)=>{
                        // fetch pet picture
                        let petPicURL=`http://localhost:5000/api/pets/picture/${pet.id}`
                        return(
                            // displays pet gender, age and location
                            <div className="pet-result">
                                <img className="pet-pic" src={petPicURL} alt="Pet-Picture"/>
                                {/* link pet name to pet detail view page */}
                                <Link to={`/pet/${pet.id}`} className="pet-name"> <h3>{pet.name}</h3></Link>
                                <div className="pet-sex-age">{pet.gender}, {pet.age} yrs old</div>
                                <div className="pet-location">{pet.location}</div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
           
        </div>
    )
}

export default SearchResult
