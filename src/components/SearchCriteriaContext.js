import React from 'react'

// searchCriteria is an object designed to store users' form input
// setSearchCriteria is a function designed to update searchCriteria according to new form inputs, this 
// function is defined inside App.js

// SearchCriteriaContext is a context that allows other components to access or modify
// the above two global states

// In App.js, SearchCriteriaContext's provider wraps around all the components of this project.
// Thus, every component can use SearchCriteria's consumer to access or modify searchCriteria 

const SearchCriteriaContext = React.createContext({
    searchCriteria: {},
    setSearchCriteria:()=>{}
})

export default SearchCriteriaContext