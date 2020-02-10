import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const SearchForm = ({ searchResults, searchDistrict, history, location }) => {
    console.log(location, '......mmmm')
    const [query, setQuery] = useState("");
    return (
        <form 
            className="form" id="searchDistrict"
        >
            <input
                type="search"
                id="searchInput"
                value={query}
                placeholder="search by district"
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" className="button is-info"  onClick={(e)=> {
                e.preventDefault()
                history.push(`/district/search?q=${query}`)
                searchDistrict(query)
                }} >
                Search
            </button>
        </form>
    )
};

const searchWithRouter = withRouter(SearchForm)
export { searchWithRouter as Search };
