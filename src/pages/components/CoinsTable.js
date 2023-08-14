import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../Contectapi'
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131111",
        },
    }
    ,
    Pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold",
        },
    },
}))



const CoinsTable = () => {

    const { currency, symble } = CryptoState();
    const navigate = useNavigate();
    const classes = useStyles();


    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);

    const fetchCoins = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            setCoins(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line 
    }, [currency])


    const darkTheme
        = createTheme({
            palette: {
                primary: {
                    main: "#fff",
                },
                type: "dark"
            }
        })

    const handelSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center", marginTop: 18 }}>
                <Typography variant='h4' style={{ fontFamily: "Montserrat", fontWeight: 500 }}>Explore the Crypto Market</Typography>
                <TextField
                    onChange={(e) => setSearch(e.target.value)}
                    label="Search Crypto Currency.."
                    variant='outlined'
                    style={{ width: "100%", marginTop: 18, marginBottom: 18 }} />

                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ background: "gold" }} />
                        ) : (
                            <>
                                <Table>
                                    <TableHead style={{ backgroundColor: "gold" }}>
                                        <TableRow>
                                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                                <TableCell style={{ color: "black", fontWeight: 700 }}
                                                    key={head}

                                                >
                                                    {head}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        {handelSearch()
                                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                            .map((row) => {
                                                const profit = row.price_change_percentage_24h > 0;

                                                return (
                                                    <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                                                        className={classes.row}
                                                        key={row.name}>
                                                        <TableCell component='th' scope='row' style={{ display: "flex", gap: "15" }} >
                                                            <img src={row?.image} alt={row?.name} height="50" style={{ marginBottom: 10 }} />
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <span style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}>{row.symbol}</span>
                                                                <span style={{ color: "darkgray" }}>{row.name}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='right' style={{

                                                            fontWeight: 500
                                                        }}>
                                                            {symble}{" "}{row.current_price.toFixed(2)}

                                                        </TableCell>
                                                        <TableCell align='right' style={{
                                                            color: profit > 0 ? "green" : "red",
                                                            fontWeight: 500
                                                        }}>
                                                            {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell align='right' style={{

                                                            fontWeight: 500
                                                        }}>
                                                            {symble}{" "}{row.market_cap.toFixed(2)}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
                            </>
                        )
                    }
                </TableContainer>
                <Pagination style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}
                    classes={{ ul: classes.pagination }}
                    count={10}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable