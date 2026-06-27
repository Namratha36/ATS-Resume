import React,{createContext,useState, useEffect} from "react";
import {getMe} from "./services/auth.api";

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    loading: false,
    setLoading: () => {}
});


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);



    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};