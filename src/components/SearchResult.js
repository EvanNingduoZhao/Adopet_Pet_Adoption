import React, {useEffect,useState,useContext} from 'react'
import Header from './Header'
import axios from 'axios'
import SearchCriteriaContext from './SearchCriteriaContext'


function SearchResult(props) {
    const searchCriteriaObj = useContext(SearchCriteriaContext)
    console.log(searchCriteriaObj)

    // console.log(props.location.state)
    // const zipcode=props.location.state.zipcode
    // const animal=props.location.state.animal
    // const breed=props.location.state.breed
    // const maxAge=parseInt(props.location.state.maxAge)

    const zipcode=searchCriteriaObj.searchCriteria.zipcode
    const animal=searchCriteriaObj.searchCriteria.animal
    const breed=searchCriteriaObj.searchCriteria.breed
    const maxAge=parseInt(searchCriteriaObj.searchCriteria.maxAge)

    const [pets,setPets]=useState([])
    const [petPics,setPetPics]=useState({})
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
    useEffect(()=>{
        console.log(pets)
    },[pets])

    const capitalize=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const render_result_title=()=>{
        if(pets.length>1){
            return <h2 className="result-title">We Found {pets.length} {capitalize(animal)}s Near Your Location</h2>
        }
        else if(pets.length===1){
            return <h2 className="result-title">We Found {pets.length} {capitalize(animal)} Near Your Location</h2>
        }
        else{
            return <h2 className="result-title">Sorry. No pets meet your search criteria</h2>
        }
    }

    return (
        <div className="page-container">
            <Header/>
            {render_result_title()}
            <div className="modify-search">
                <div className="modify-msg">Didn't find your perfect one?</div>
                <p className="sub-modify-msg">Don't worry and modify your search here!</p>
                <button className="modify-search-button">Modify Your Search</button>
            </div>
            <div className="result-container">
                { pets.map((pet)=>{
                    console.log(pet)
                    let petPicURL=`http://localhost:5000/api/pets/picture/${pet.id}`
                    return(
                        <div className="pet-result">
                            <img className="pet-pic" src={petPicURL} alt="Pet-Picture"/>
                            <h3 className="pet-name">{pet.name}</h3>
                            <div className="pet-sex-age">{pet.gender},{pet.age}</div>
                            <div className="pet-location">{pet.location}</div>
                        </div>
                    )
                  })
                }
            </div>
        </div>
    )
}

export default SearchResult
