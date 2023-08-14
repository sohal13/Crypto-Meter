import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import bg from '../image/cryptobg.jpg';
import TrendingCoins from '../components/TrendingCurrency';

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundposition: "center",
    },
    content: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    }
}))
const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.content}>
                <div className={classes.tagline}>
                    <Typography variant='h3'
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,

                        }}>Crypto Meter
                    </Typography>
                    <Typography style={{
                        fontWeight: 500,
                        color: "darkgray",
                        textTransform: "capitalize"

                    }}>
                        "Stay Ahead of the Crypto Game - Real-Time Price Tracking at Your Fingertips!"
                    </Typography>
                </div>
                <TrendingCoins />
            </Container>
        </div>
    )
}

export default Banner