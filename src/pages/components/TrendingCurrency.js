import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../Contectapi';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    coins: {
        height: "56%",
        display: "flex",
        alignItems: "center",
        textAlign: "center"
    },
    items: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white"
    }
}))


const TrendingCurrency = () => {

    const [trending, setTrending] = useState([]);

    const { currency, symble } = CryptoState()

    const classes = useStyles();

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
            setTrending(data)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchTrendingCoins()
        // eslint-disable-next-line 
    }, [currency])


    const items = trending.map((coin) => {

        const profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className={classes.items} to={`/coins/${coin.id}`}>
                <img src={coin?.image}
                    alt={coin?.name}
                    height={"80"}
                    style={{ marginBottom: 10 }} />
                <span>{coin?.symbol}
                    &nbsp;
                    <span style={{ color: `${profit ? "green" : "red"}` }}>
                        {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>{symble}&nbsp;{coin?.current_price?.toFixed(2)}</span>
            </Link>

        )
    })

    //css
    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    };
    return (
        <div className={classes.coins}>
            <AliceCarousel disableButtonsControls mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay
                items={items} />
        </div>
    )
}

export default TrendingCurrency