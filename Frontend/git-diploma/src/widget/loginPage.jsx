import React from "react";
import Styles from "./styles.module.css"

const Login = () => {

    return (
        <>
            <div className={Styles.divForm}>
                <form className={Styles.formStyle}>
                    <div>
                        <label className={Styles.labelForm}>cip:</label><br/>
                        <input type="text" className={Styles.inputTextForm}/>
                    </div><br/>
                    <div>
                        <label className={Styles.labelForm}>mot de passe:</label><br/>
                        <input type="text" className={Styles.inputTextForm}/>
                    </div><br/>
                    <button className={Styles.buttonForm}>se connecter</button>

                </form>
            </div>
        </>
    );
};

export default Login;