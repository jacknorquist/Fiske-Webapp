import React from "react";
import { ReactNode } from "react";
import LoginForm from "./LoginForm.tsx";
import { useError } from "../context/ErrorContext.tsx";
import FiskeAPI from "../api.ts";
import { useLoggedIn } from "../context/LoggedInContext.tsx";
import { useUser } from "../context/UserContext.tsx";

function LoginContainer(): ReactNode {

    const { setError } = useError();
    const { setLoggedIn } = useLoggedIn();
    const {setUser} = useUser()


  async function handleLogin(formData){

      try{
        const {user, token} = await FiskeAPI.login(formData)
        setLoggedIn(true)
        setUser(user)
        localStorage['fiske-token'] =token
      }catch (err){
        setError(err.message)
      }

  }


    return (
        <LoginForm handleLogin={handleLogin} />
    );
}

export default LoginContainer;