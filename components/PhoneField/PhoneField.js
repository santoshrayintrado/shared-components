import React from 'react';

import { TextField, withStyles } from '@material-ui/core';
import ReactPhoneInput from 'react-phone-input-2'
//import 'react-phone-input-2/lib/style.css'
import 'react-phone-input-2/lib/material.css'
const styles = theme => ({
  field: {
    margin: '10px 0',
  },
  countryList: {
    ...theme.typography.body1,
  },
});

 
 
function PhoneField(props) {
  const { value, defaultCountry, onChange, className} = props;
 
  return (
    <React.Fragment>
     
      {/* Configure more */}
      <ReactPhoneInput
        country={defaultCountry}
        placeholder = 'Phone number'
        countryCodeEditable={false}
        value={value}
        required
        enableSearch={true}
        disableSearchIcon={true}
        inputClass={className}
        inputProps={{
          name: 'phone',
          required: true,
        }}
      />
    </React.Fragment>
  );
}
 
export default withStyles(styles)(PhoneField);