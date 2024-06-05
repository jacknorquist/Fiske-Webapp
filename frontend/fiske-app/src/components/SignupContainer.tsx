import React from "react";
import { ReactNode } from "react";
import SignupForm from "./SignupForm.tsx";
import { useError } from "../context/ErrorContext.tsx";
import FiskeAPI from "../api.ts";
import { useLoggedIn } from "../context/LoggedInContext.tsx";
import { useUser } from "../context/UserContext.tsx";


function SignupContainer(): ReactNode {

    const { setError } = useError();
    const { setLoggedIn } = useLoggedIn();
    const {setUser} = useUser()


  async function handleSignup(formData){

      try{
        const {user, token} = await FiskeAPI.signup(formData)
        setLoggedIn(true)
        console.log(user)
        setUser(user)
        localStorage['fiske-token'] =token
      }catch (err){
        setError(err.message)
      }

  }


    return (
        <SignupForm handleSignup={handleSignup} />
    );
}

export default SignupContainer;