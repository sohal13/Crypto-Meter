import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../../Contectapi'

const useStyles = makeStyles(() => ({
    title: {
        fontSize: 25,
        flex: 1,
        color: "gold",
        fontWeight: "bold",
        cursor: "pointer",

    }
}))

const Header = () => {

    const { currency, setCurrency } = CryptoState();

    const classes = useStyles();
    const history = useNavigate();



    const darkTheme
        = createTheme({
            palette: {
                primary: {
                    main: "#fff",
                },
                type: "dark"
            }
        })
    return (
        <ThemeProvider theme={darkTheme}>

            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => history('/')} className={classes.title}>Crypto Meter</Typography>
                        <Select variant='outlined' style={{
                            width: 82,
                            height: 35,
                            marginRight: 10,
                        }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header