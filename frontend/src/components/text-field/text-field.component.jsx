import { TextField } from '@material-ui/core';
import React from 'react';
import './text-field.styles.scss';
import { makeStyles } from '@material-ui/core/styles';




const CustomTextField = ({color, type, label, helperText, onChange }) => {
    return (
        
        <div className = 'custom-text-field'>
            <TextField id ="outline-basic" onChange = {e => onChange(e)} helperText = {helperText} label= {label} variant="outlined" type = {type}></TextField>
        </div>
    )
}

export default CustomTextField;

//outline-basic
//standard-error


