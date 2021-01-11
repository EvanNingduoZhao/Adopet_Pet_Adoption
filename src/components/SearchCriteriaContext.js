import React from 'react'

const SearchCriteriaContext = React.createContext({
    searchCriteria: {},
    setSearchCriteria:()=>{}
})

export default SearchCriteriaContext