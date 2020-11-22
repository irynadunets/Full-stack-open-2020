import React from 'react';

const Filter = ({searchName, handlePersonNameSearch}) => {
  return (
    <div>
      filter shown with <input value={searchName} onChange={handlePersonNameSearch}/>
    </div>
  )
}

export default Filter
