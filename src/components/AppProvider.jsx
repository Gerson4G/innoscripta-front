import React, { useState } from 'react';

const AppContext = React.createContext()

export const AppProvider = ({children}) => {
    
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([])
    
    return(
        <AppContext.Provider value={{user, cart}}>
            {children}
        </AppContext.Provider>
    );
}

export const ContextData = AppContext.Consumer;