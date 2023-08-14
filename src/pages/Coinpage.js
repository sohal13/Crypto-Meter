import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../Contectapi';
import axios from 'axios';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core';
import Coininfo from './components/Coininfo';


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
            alignItems: "center",
        }
    },
    sidebar: {
        width: "30%",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    },
    heading: {
        fontWeight: "bold",
        marginBottom: 20,
    },
    description: {
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        padding: 25,
        paddingTop: 0

    },
    marketdata: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        //responsive
        [theme.breakpoints.down("md")]: {

            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
        },
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
            alignItems: "center",
        }
    }
}))

const Coinpage = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState();


    const { currency, symble } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        setCoin(data)
    };

    useEffect(() => {
        fetchCoin()
        // eslint-disable-next-line 
    }, [currency])

    const classes = useStyles();
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />


    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }} />
                <Typography variant='h3' className={classes.heading}>
                    {coin?.name}
                </Typography>
                <Typography variant='subtitle1' className={classes.description}>
                    {coin?.description.en.split(". ")[0]}
                </Typography>
                <div className={classes.marketdata} >
                    <span className={classes.marketdata} >
                        <Typography variant='h5'>Rank:  {coin?.market_cap_rank}</Typography>
                        &nbsp;  &nbsp;
                        <Typography variant='h5' >Current Price: {symble}{" "}{(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
                        &nbsp;  &nbsp;
                        <Typography variant='h5'>Market Cap: {symble}{" "} {coin?.market_data.market_cap[currency.toLowerCase()]
                            .toString().slice(0, -6)}M</Typography>
                    </span>
                </div>

            </div>
            {/*chart*/}
            <Coininfo coin={coin} />
        </div>
    )
}

export default Coinpage