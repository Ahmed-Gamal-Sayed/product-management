import React, { createContext, useState, useEffect } from "react";

const storeContext = createContext();

const StoreProvider = ({ children }) => {
    const [store, setStore] = useState([]);

    useEffect(() => {
        const product = localStorage.getItem('product');
        if (product) {
            setStore(JSON.parse(product));
        }
    }, []);

    const addProduct = (newData) => {
        const updatedStore = [...store, newData];
        setStore(updatedStore);
        localStorage.setItem('product', JSON.stringify(updatedStore));
    };

    const updateProduct = (idx, newData) => {
        const updatedStore = [...store];
        updatedStore[idx] = newData;
        setStore(updatedStore);
        localStorage.setItem('product', JSON.stringify(updatedStore));
    };

    const deleteProduct = (idx) => {
        const updatedStore = store.filter((_, index) => index !== idx);
        setStore(updatedStore);
        localStorage.setItem('product', JSON.stringify(updatedStore));
    };

    const deleteAllProduct = () => {
        setStore([]);
        localStorage.removeItem('product');
    };


    return (
        <storeContext.Provider value={{ store, addProduct, updateProduct, deleteProduct, deleteAllProduct }}>
            {children}
        </storeContext.Provider>
    );
};

export { StoreProvider, storeContext };
