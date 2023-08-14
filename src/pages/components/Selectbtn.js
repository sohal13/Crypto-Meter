import { makeStyles } from '@material-ui/core';
import React from 'react'


const Selectbtn = ({ children, selected, onClick }) => {


    const useStyles = makeStyles(() => ({
        selectBtn: {
            border: '1px solid gold',
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "gold",
                color: "black"
            },
            width: "22%"

        }
    }))


    const classes = useStyles();
    return (
        <span className={classes.selectBtn} onClick={onClick} >{children}</span>
    )
}

export default Selectbtn