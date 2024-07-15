import React from "react";
import { ReactNode } from "react";
import LoginForm from "./LoginForm.tsx";
import { useError } from "../../context/ErrorContext.tsx";
import FiskeAPI from "../../api.ts";
import { useUser } from "../../context/UserContext.tsx";
import styles from './css/LoginContainer.module.css'
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";


function LoginContainer(): ReactNode {

    const { setError } = useError();
    const {setUser} = useUser();
    const navigate = useNavigate();


  async function handleLogin(formData){

      try{
        const {user, token} = await FiskeAPI.login(formData)
        setUser(user);
        localStorage['fiske-token'] =token;
        // navigate('/')
      }catch (err){
        setError(err.message)
      }

  }


    return (
      <div className={styles.container}>
        <LoginForm handleLogin={handleLogin} />
        <Button href="/signup" className={styles.button}>Go to signup</Button>
      </div>
    );
}

export default LoginContainer;