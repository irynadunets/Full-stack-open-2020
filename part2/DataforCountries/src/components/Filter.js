import React from 'react';

const Filter = ({searchCountry, handleCountrySearch}) => {
  return (
    <div>
      find countries <input value={searchCountry} onChange={handleCountrySearch}/>
    </div>
  )
}

export default Filter
