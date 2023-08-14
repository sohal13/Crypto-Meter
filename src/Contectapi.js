import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';

const Crypto = createContext();

const Contectapi = ({ children }) => {

    const [currency, setCurrency] = useState("INR");
    const [symble, setSymble] = useState("₹");

    useEffect(() => {
        if (currency === "INR") setSymble("₹");
        else if (currency === "USD") setSymble("$");
    }, [currency])


    return (
        <Crypto.Provider value={{ currency, symble, setCurrency }} >
            {children}
        </Crypto.Provider>
    )
};

export default Contectapi;

export const CryptoState = () => {
    return useContext(Crypto);
}