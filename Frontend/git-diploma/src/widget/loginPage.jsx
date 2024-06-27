import React from "react";
import Styles from "./styles.module.css"

const Login = () => {

    return (
        <>
            <div className={Styles.divForm}>
                <form className={Styles.formStyle}>
                    <div>
                        <label className={Styles.labelForm}>CIP:</label><br/>
                        <input type="text" className={Styles.inputTextForm}/>
                    </div><br/>
                    <div>
                        <label className={Styles.labelForm}>Mot de passe:</label><br/>
                        <input type="text" className={Styles.inputTextForm}/>
                    </div><br/>
                    <button className={Styles.buttonForm}>Login</button>

                </form>
            </div>
        </>
    );
};

export default Login;