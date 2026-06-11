import { useContext } from "react";
import {AuthContext} from "../auth.context.jsx";
import{login, registerUser, getMe, logOut} from "../services/auth.api.js";


export const useAuth = () => {
    // const context  = useConext(AuthContext);
    // const {user, setUser, loading, setLoading} = context;
    const {user, setUser, loading, setLoading} = useContext(AuthContext);
    


    const handleLogin = async (email, password) => {
        setLoading(true);
        try{

        const data = await login({email, password});
        setUser(data.user);}
        catch(error){
            console.error("Login failed:", error);
        }finally{   
        setLoading(false);
        }
    }  

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try{
        const data = await registerUser({username, email, password});
        setUser(data.user);
        }catch(error){
            console.error("Registration failed:", error);
        }finally{   
        setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try{
            const data = await logOut();
            setUser(null);
        } catch(error){
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,handleLogin,
        handleRegister,
        handleLogout
    };
}