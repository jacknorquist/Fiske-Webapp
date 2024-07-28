import React from "react";
import { ReactNode } from "react";
import LoginForm from "./LoginForm.tsx";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import { useUser } from "../../context/UserContext.tsx";
import styles from './css/LoginContainer.module.css'
import { Button} from "reactstrap";
import { LoginFormDataType } from "../../types.ts";


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
  async function handleLogin(formData: LoginFormDataType){

      try{
        const {user, token} = await FiskeAPI.login(formData)
        setUser(user);
        localStorage['fiske-token'] =token;
        setMessage('Login Success', 'success')
      }catch(err:unknown){
        if (err instanceof Error) {
            setMessage(err.message, 'error');
          }else{
            setMessage('An Unknown Error Occurred', 'error')
          }
        }

  }

    return (
      <div className={styles.container}>
        <LoginForm handleLogin={handleLogin} />
        <Button
         href="/signup"
         className={styles.button}>
          Go to signup
        </Button>
      </div>
    );
}

export default LoginContainer;