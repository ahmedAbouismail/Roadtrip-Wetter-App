import React from 'react';
import '../../App.css';
import Planing from '../Frontend/Planing';
import Autocomplete from '../google-autocomplete/AutoCompelete'
import DateField from '../DateForm/DateField'
function RoutePlaning() {
  return (
    <>
      {/* <Planing /> */}
      <Autocomplete/>
      <DateField/>
    </>
  );
}

export default RoutePlaning;
