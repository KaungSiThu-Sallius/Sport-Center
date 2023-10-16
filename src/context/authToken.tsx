import React, { createContext, useState } from "react";

interface TokenContextProps {
    token: string;
    setToken: (token: string) => void;
}

const TokenContext = createContext<TokenContextProps>({
    token: '',
    setToken: () => { }
});

const TokenProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [token, setToken] = useState('');

    const tokenShare = {
        token,
        setToken
    };

    return (
        <TokenContext.Provider value={tokenShare}>
            {children}
        </TokenContext.Provider>
    );
};

export { TokenContext, TokenProvider };