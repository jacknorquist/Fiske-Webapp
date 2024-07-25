import React from "react";
import { ReactNode } from "react";
import LoginForm from "./LoginForm.tsx";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import { useUser } from "../../context/UserContext.tsx";
import styles from './css/LoginContainer.module.css'
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

/**LoginContainer: renders LoginForm and handles login functionality
 *
 *Props:
 * - none
 *
 *State:
 * - none
 *
 * App -> RoutesList -> LoginContainer -> LoginForm
 */
function LoginContainer(): ReactNode {
    const { setMessage} = useMessage();
    const {setUser} = useUser();

  //login user
  async function handleLogin(formData){

      try{
        const {user, token} = await FiskeAPI.login(formData)
        setUser(user);
        localStorage['fiske-token'] =token;
        setMessage('Login Success', 'success')
      }catch (err){
        setMessage(err.message, 'error')
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