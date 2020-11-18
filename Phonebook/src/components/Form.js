import React from 'react';

const Form = ({addPerson, newName, handlePersonNameChange, newNumber, handlePersonNumberChange}) => {

  return (
    <div>
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handlePersonNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  )
}

export default Form
