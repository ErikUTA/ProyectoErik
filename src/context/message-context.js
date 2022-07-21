import React, { useContext, useEffect } from "react";
import { useState } from "react";

const MessageContext = React.createContext({
    pokemons: 1126,
    setPokemons: () => {}, 
});

export function MessageProvider(props) {
    const [pokemons, setPokemons] = useState(1126);
    const result = React.useMemo(() => ({
        pokemons, setPokemons
    }), [pokemons]);

    return (
        <MessageContext.Provider value={result} {...props} />
    )
}

export function Number() {
    const datos = useContext(MessageContext);
    return datos;
}