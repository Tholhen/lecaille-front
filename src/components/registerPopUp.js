import React, {useState} from 'react'
import {saveUser} from "../api/user"

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

import {config} from "../config/config"

const RegisterPopUp = (props) => {

    //Définition des variables
    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [firstNameErrorText, setFirstNameErrorText] = useState("")

    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState(false)
    const [lastNameErrorText, setLastNameErrorText] = useState("")

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState("")

    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorText, setPhoneErrorText] = useState("")

    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")

    //Définition du style MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
            width: "90%"
        },
    }));
        
    const classes = useStyles();

    const globalVerify = () => {

            if(!firstName){
                setFirstNameError(true)
                setFirstNameErrorText("Prénom non renseigné")
            }
            else {
                setFirstNameError(false)
                setFirstNameErrorText("")
            }

            if(!lastName){
                setLastNameError(true)
                setLastNameErrorText("Nom non renseigné")
            }
            else {
                setLastNameError(false)
                setLastNameErrorText("")
            }
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
                setPasswordErrorText("Mot de passe non renseigné")
            }
            else {
                setPasswordError(false)
                setPasswordErrorText("")
            }
            if(!phone){
                setPhoneError(true)
                setPhoneErrorText("N° de téléphone non renseigné")
            }
            else{
                if(!phone.match(config.phoneRegEx)){
                    setPhoneError(true)
                    setPhoneErrorText("N° de téléphone incorrect")
                }
                else {
                    setPhoneError(false)
                    setPhoneErrorText("")
                }
            }

            //Si tous les champs sont bons, on enregistre l'utilisateur
            if(firstName && lastName && email && password && phone && phone.match(config.phoneRegEx) && email.match(config.emailRegEx)){
                
                let datas = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    phone: phone,
                    address: address,
                    zip: zip,
                    city: city
                }    
                
                saveUser(datas)
                .then(response => {
                    if(response.data.status === 401){
                        setEmailErrorText("Utilisateur existant")
                        setEmailError(true)
                    }
                    else{
                        props.closeRegisterForm()
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
            onClose={(e) => {props.closeRegisterForm()}}
        >
            <DialogTitle>S'enregistrer</DialogTitle>
            <DialogContent>
            <form className="login-register-form" autoComplete="off">
                <FormControl error>
                    <TextField label="Nom" variant="filled" color="primary" className={classes.margin} required onChange={(e) => {setLastName(e.target.value)}} error={lastNameError} />
                    <FormHelperText>{lastNameErrorText}</FormHelperText>
                </FormControl>

                <FormControl error>
                    <TextField label="Prénom" variant="filled" color="primary" className={classes.margin} required onChange={(e) => {setFirstName(e.target.value)}} error={firstNameError} value={firstName}/>
                    <FormHelperText>{firstNameErrorText}</FormHelperText>
                </FormControl>

                <FormControl error>
                    <TextField label="Email" variant="filled" color="primary" className={classes.margin} required onChange={(e) => {setEmail(e.target.value)}} error={emailError} type="email" value={email}/>
                    <FormHelperText>{emailErrorText}</FormHelperText>
                </FormControl>

                <FormControl error>
                    <TextField label="Mot de passe" color="primary" variant="filled" className={classes.margin} required onChange={(e) => {setPassword(e.target.value)}} error={passwordError} type="password" value={password}/>
                    <FormHelperText>{passwordErrorText}</FormHelperText>
                </FormControl>

                <FormControl error>
                    <TextField label="Téléphone" variant="filled" color="primary" className={classes.margin} required  error={phoneError} type="tel"  onChange={(e) => {setPhone(e.target.value)}} />
                    <FormHelperText>{phoneErrorText}</FormHelperText>
                </FormControl>

                <FormControl error>
                    <TextField label="Adresse" variant="filled" color="primary" className={classes.margin} onChange={(e) => {setAddress(e.target.value)}} />
                </FormControl>

                <FormControl error>
                    <TextField label="Code Postal" variant="filled" color="primary" className={classes.margin} onChange={(e) => {setZip(e.target.value)}} />
                </FormControl>

                <FormControl error>
                    <TextField label="Ville" variant="filled" color="primary" className={classes.margin} onChange={(e) => {setCity(e.target.value)}} />
                </FormControl>
            </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={(e) => {props.closeRegisterForm()}} color="primary">
                Annuler
            </Button>
            <Button onClick={(e) => {onSubmit()}} color="primary">
                Envoyer
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RegisterPopUp