import React, { useContext, useEffect } from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    textField: {
      height: "35px",
      marginTop: "8px",
      alignContent: "left",
      textAlign: "left",
      width: 'auto',
      '& .MuiOutlinedInput-root, & .MuiInputBase-root': {
        width: '95%',
        fontFamily: 'Poppins',
        borderRadius: "10px",
        background: "white",
        color: "#353535",
        border: "solid transparent 0px",
        padding: '0 3px',        
      },
      '& .Mui-focused': {
        borderColor: "#00B1FF"
      },
      '& .MuiInput-root.Mui-error': {
        borderColor: '#FF2F54',
        color: '#FF2F54',
        '&:focus, &:hover, &:focus-visible, &:active': {
          borderColor: '#FF2F54',
        },
      },
      '& .MuiOutlinedInput-root.Mui-disabled, & .MuiInputBase-root.Mui-disabled': {
        borderColor: '#F5F5F5',
        backgroundColor: '#F5F5F5',
        color: '#BEBEBE',
        '&:focus, &:hover, &:focus-visible, &:active': {
          borderColor: '#F5F5F5',
        },
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: '#FF2F54',
      },
      '& .MuiInput-underline': {
        '&:before, &:after, &:focus, &:hover, &:focus-visible': {
          borderColor: 'transparent',
        },
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderColor: 'transparent'
      },
      '& ::-webkit-calendar-picker-indicator': {
        filter: 'invert(51%) sepia(85%) saturate(2108%) hue-rotate(166deg) brightness(101%) contrast(102%)'
      },
      '& .MuiInput-inputMultiline': {
        padding: '5px 3px',
      }
    },
  }))

const BuscadorContext = React.createContext({
    search: "",
    setSearch: () => {}, 
});

export function BuscadorProvider(props) {
    const [search, setSearch] = useState("Hola");
    const result = React.useMemo(() => ({
        search, setSearch
    }), [search]);

    return (
        <BuscadorContext.Provider value={result} {...props} />
    )
}

export function BuscadorConsumer(props) {
    const { t, i18n } = useTranslation(['translate']);
    const classes = useStyles(props);
    const { search, setSearch } = useContext(BuscadorContext);
    return(  
        <div className="center-a" style={{paddingTop: '100px'}}>
            <TextField placeholder={t("search")} className={classes.textField} type="text" onChange={(e) => setSearch(e.target.value)}/>            
        </div>                
    )
}

export function Result() {
    const datos = useContext(BuscadorContext);
    return datos;
}