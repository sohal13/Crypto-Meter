import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../Contectapi';
import axios from 'axios';
import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { chartDays } from '../../config/data';
import Selectbtn from './Selectbtn';
import { elements } from 'chart.js/auto';



const useStyles = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        }
    }
}))

const Coininfo = ({ coin }) => {

    const [hisData, setHisData] = useState();
    const [day, setDay] = useState(1);

    const { currency } = CryptoState();

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${day}`)
        setHisData(data.prices)
    }


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, [currency, day])

    const darkTheme
        = createTheme({
            palette: {
                primary: {
                    main: "#fff",
                },
                type: "dark"
            }
        })

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {!hisData ? (<CircularProgress style={{
                    color: "gold"
                }}
                    size={250}
                    thickness={1}
                />) : (<>
                    <Chart type='line' data={{
                        labels: hisData.map((coin) => {
                            let date = new Date(coin[0])
                            let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`

                            return day === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                data: hisData.map((coin) => coin[1]),
                                label: `price (past ${day} Days) in ${currency}`,

                            },
                        ],
                    }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                }
                            }
                        }}
                    />
                </>)}
                <div style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%"
                }}>

                    {chartDays.map(day => (
                        <Selectbtn key={day.value} onClick={() => setDay(day.value)}
                            selected={day.value === day}>
                            {day.label}
                        </Selectbtn>
                    ))}

                </div>
            </div>
        </ThemeProvider>

    )
}

export default Coininfo