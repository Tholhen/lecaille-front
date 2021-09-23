import React, {useState} from 'react'
import {connect} from "react-redux"
import {connectUser} from "../actions/user/userAction"

import {loginUser} from "../api/user"

import tokenConfig from "../config/tokenConfig"
import {config} from "../config/config"

//Imports de la librairie MaterialUI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles } from "@material-ui/styles";

const LoginPopUp = (props) => {

    //Définition des variables
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState("")

    //Définition du style MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
            width: "90%"
        },
    }));

    const classes = useStyles();
    
    const globalVerify = () => {

            if(!email){
                setEmailError(true)
                setEmailErrorText("Adresse email non renseignée")
            }
            else {
                if(!email.match(config.emailRegEx)){
                    setEmailError(true)
                    setEmailErrorText("Format d'email non valide")
                }
                else {
                    setEmailError(false)
                    setEmailErrorText("")
                }
            }
            if(!password){
                setPasswordError(true)
                setPasswordErrorText("Mot de passe non reseigné")
            }
            else {
                setPasswordError(false)
                setPasswordErrorText("")
            }

            if(email.match(config.emailRegEx)){
                let datas = {
                    email: email,
                    password: password
                }    
                
                loginUser(datas)
                .then(response => {
                    if(response.data.status === 404){
                        setEmailErrorText("Utilisateur inexistant")
                        setEmailError(true)
                    } else {
                        setEmailErrorText("")
                        setEmailError(false)

                        if(response.data.status === 401) {
                            setPasswordErrorText("Mot de passe incorrect")
                            setPasswordError(true)
                        }
                        else {
                            localStorage.setItem(tokenConfig.token.name, response.data.token)
                            props.connectUser(response.data.user)
                            props.closeLoginForm()
                        }
                    }
                })
            }
            
    }

    const onSubmit = () =>{
        globalVerify() 
    }

    return(
            <Dialog
                open={props.opened}
                onClose={(e) => {props.closeLoginForm()}}
            >
                <DialogTitle>Se connecter</DialogTitle>
                    <DialogContent>
                    <form className="login-register-form" autoComplete="off">
                        <FormControl error>
                            <TextField variant="filled" label="Email" color="primary" className={classes.margin} required onChange={(e) => {setEmail(e.target.value)}} error={emailError} type="email" value={email}/>
                            <FormHelperText>{emailErrorText}</FormHelperText>
                        </FormControl>

                        <FormControl error>
                            <TextField variant="filled" label="Mot de passe" color="primary" className={classes.margin} required onChange={(e) => {setPassword(e.target.value)}} error={passwordError} type="password" value={password}/>
                            <FormHelperText>{passwordErrorText}</FormHelperText>
                        </FormControl>
                    </form>
                    </DialogContent>
                <DialogActions>
                <Button onClick={(e) => {props.closeLoginForm()}} color="primary">
                    Annuler
                </Button>
                <Button onClick={(e) => {onSubmit()}} color="primary" >
                    Connexion
                </Button>
                </DialogActions>
            </Dialog>
    )
}

const mapStateToProps = (store) => {
    return {
        
    }
}

const mapDispatchToProps = {
    connectUser
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPopUp)