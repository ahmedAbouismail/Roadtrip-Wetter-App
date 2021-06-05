import {React, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

const address = [{
    id: uuidv4(),
    country: "",
    city:"",
},]

var count = 0;

function RouteForm() {


  
    // const [inputFields, setInputFields] = useState(address)
    const [inputFields, setInputFields] = useState([address]);

    const handleAddFields = () => {
        count++;
        setInputFields([...inputFields, { id: uuidv4(), country: '', city: '' }])
      }

      const handleRemoveFields = id => {
        
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
      }
    

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setInputFields(newInputFields);
      }

    return(
        <div>
            {inputFields.map(inputField => (
                <div key={inputField.id}>
                    <h3>Ort {inputFields.indexOf(inputField) + 1} hinzfügen</h3>
                    <label htmlFor="country_field">Land</label>
                    <input 
                    id="country_field" 
                    name="country" 
                    value={inputField.country}
                    onChange={event => handleChangeInput(inputField.id, event)}
                    />
                    <label htmlFor="city_field">City</label>
                    <input 
                    id="city_field" 
                    name="city" 
                    value={inputField.city}
                    onChange={event => handleChangeInput(inputField.id, event)}
                    />
                    <button onClick={handleAddFields}>ADD</button>
                    <button 
                    disabled={inputFields.length === 1} 
                    onClick={() => handleRemoveFields(inputField.id)}>remove</button>
                </div>
            ))}    
        </div>
    ) 
}

export default RouteForm