import React, { useState, useEffect } from "react"
import {connect} from "react-redux"

import {updateUser, updatePassword} from "../../api/user"
import {getAllRequestsByCustomer, getAllRequestDetails} from "../../api/requests"
import {convertDate} from "../../utils/utils"
import {getOneUser} from "../../api/user"
import {refreshUserInfos} from "../../actions/user/userAction"
import {config} from "../../config/config"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"

//Imports depuis la librairie MaterialUI
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles } from "@material-ui/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Profile = (props) => {

    const headerTitle = "Profil"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"}, {value: "Profil", link:null}]

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
    const [passwordUpdated, setPasswordUpdated] = useState(false)

    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorText, setPhoneErrorText] = useState("")

    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")

    const [displayedRequests, setDisplayedRequests] = useState([])

    const [snackBarOpened, setSnackBarOpened] = useState(false)
    const [snackBarSeverity, setSnackBarSeverity] = useState("")
    const [successUpdateText, setSuccessUpdateText] = useState("")

    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1)
        }
        }));
        
    const classes = useStyles();

    //A chaque modification du redux user
    useEffect(() => {
        setFirstName(props.user.infos.first_name)
        setLastName(props.user.infos.last_name)
        setEmail(props.user.infos.email)
        setPhone(props.user.infos.phone)
        setAddress(props.user.infos.address)
        setZip(props.user.infos.zip)
        setCity(props.user.infos.city)

        getAllRequestsByCustomer(props.user.infos.id)
        .then((requestsDB) => {
            loadRequestsDetails(requestsDB)
        })
        
    }, [props.user])

    // Au click sur le bouton envoyer
    const onSubmit = () => {
        globalVerify()
    }

    //Fonction de vérification de bonne saisie des informations
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
                setEmailErrorText("Adresse email non valide")
            }
            else {
                setEmailError(false)
                setEmailErrorText("")
            }
        }
        if(password !== ""){
            setPasswordUpdated(true)
        }
        else {
            setPasswordUpdated(false)
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

        //Si tous les champs sont bons, on enregistre les modification apportées à l'utilisateur
        if(firstName && lastName && email && phone && phone.match(config.phoneRegEx) && email.match(config.emailRegEx)){
            
            let datas = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: address,
                zip: zip,
                city: city
            }    

            updateUser(datas, props.user.infos.id)
            .then(responseUpdateUser => {
                if(responseUpdateUser.data.status === 200){
                    
                    if(passwordUpdated){
                        let datasPassword = {
                            password: password
                        }
                        updatePassword(datasPassword, props.user.infos.id)
                        .then(responsePassword => { 
                            if(responsePassword.data.status === 200){
                                endUpdateProcess("success","Succès de la mise à jour de votre profil et du mot de passe")
                            }
                            else {
                                endUpdateProcess("error","Erreur lors de la mise à jour du mot de passe")
                            }
                        })
                    }
                    else{
                        endUpdateProcess("success","Succès de la mise à jour de votre profil")
                    }
                }
                else {
                    endUpdateProcess("error","Erreur lors de la mise à jour de votre profil")
                }
            })         
        }
    }

    const endUpdateProcess = (result, message) => {
        setSnackBarSeverity(result)
        setSuccessUpdateText(message)
        openSnackbar()
        if(result==="success"){
            getOneUser(props.user.infos.id)
            .then(user => {
                props.refreshUserInfos(user)
            })  
        }
        
    }

    //Fonctions de gestion de l'ouverture/fermeture de la snackbar
    const closeSnackbar = () => {
        setSnackBarOpened(false)
    }

    const openSnackbar = () => {
        setSnackBarOpened(true)
    }

    //Contruction de la liste des commandes passées à afficher
    const loadRequestsDetails = (requests) => {
        for(let i = 0; i < requests.length; i++){
            let requestDetails = []
            getAllRequestDetails(requests[i].id)
            .then((requestLines) => {
                for(let j = 0; j < requestLines.length; j++){
                    requestDetails = [...requestDetails,
                        <article key={requestLines[j].id} className="request-details-item">
                            <section className="request-details-item-pict">
                                <img src={config.product_pict_url + requestLines[j].pict_url} alt={"illustration"+requestLines[j].id}/>
                            </section>
                            <section className="request-details-item-infos">
                                <p>{requestLines[j].name}</p>
                                <p>{requestLines[j].quantity} g</p>
                                <p>{requestLines[j].price} € TTC</p>
                            </section>
                        </article>]
                }

                setDisplayedRequests(displayedRequests => [...displayedRequests,
                    <article key={requests[i].id} className="profile-user-request-item">
                        <section className="request-item-header">
                            <p>N°{requests[i].request_number}</p>
                            <p>du {convertDate(requests[i].request_date)}</p>
                            <p>Statut : {requests[i].preparation_status}</p>
                        </section>
                        <section className="request-item-details">
                            {requestDetails}
                        </section>
                        <section className="request-item-resume">
                            <p>Total</p>
                            <p>{requests[i].total_amount} € TCC</p>
                        </section>
                    </article>])
            })
        }
    }

    //Fonction d'affichage des commandes de l'utilisateur
    const showRequestsDetails = () => {
        return (
        <section className="profile-user-requests-container">
                    {displayedRequests}
        </section>)
    }

    return(
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
            
            <section className="profile-container">
                <h4>Mes informations</h4>
                <section className="profile-user-infos-container default-background-gradient">
                    <section className="profile-user-informations">

                        <section className="profile-header">
                            <p><AccountCircleIcon /></p>
                            <p className="profile-header-title">Informations personnelles</p>
                        </section>
                        <section className="profile-user-informations-content">
                            <FormControl error className={classes.margin}>
                                <TextField variant="filled" label="Nom" color="primary" required onChange={(e) => {setLastName(e.target.value)}} error={lastNameError} value={lastName || ""} 
                                InputLabelProps={{style : {color : "#B4B4B4"}}}
                                InputProps={{style : {color : "#fff"}}}/>
                                <FormHelperText>{lastNameErrorText}</FormHelperText>
                            </FormControl>

                            <FormControl error className={classes.margin}>
                                <TextField variant="filled" label="Prénom" color="primary"  required onChange={(e) => {setFirstName(e.target.value)}} error={firstNameError} value={firstName || ""}
                                InputLabelProps={{style : {color : "#B4B4B4"}}}
                                InputProps={{style : {color : "#fff"}}}/>
                                <FormHelperText>{firstNameErrorText}</FormHelperText>
                            </FormControl>

                            <FormControl error className={classes.margin}>
                                <TextField variant="filled" label="Mot de passe" color="primary" onChange={(e) => {setPassword(e.target.value)
                                e.target.value ? setPasswordUpdated(true) : setPasswordUpdated(false)}} type="password" defaultValue=""
                                InputLabelProps={{style : {color : "#B4B4B4"}}}
                                InputProps={{style : {color : "#fff"}}}/>
                            </FormControl>
                        </section>
                    </section>
                    
                    <section className="profile-user-contact">
                            <section className="profile-header">
                                <p><MailIcon /></p>
                                <p className="profile-header-title">Contact</p>
                            </section>
                            <section className="profile-user-contact-content">
                                
                                    <FormControl error className={classes.margin} >
                                        <TextField variant="filled" label="Email" color="primary" required onChange={(e) => {setEmail(e.target.value)}} error={emailError} type="email" value={email || ""}
                                        InputLabelProps={{style : {color : "#B4B4B4"}}}
                                        InputProps={{style : {color : "#fff"}}}/>
                                        <FormHelperText>{emailErrorText}</FormHelperText>
                                    </FormControl>

                                    <FormControl error className={classes.margin}>
                                        <TextField variant="filled" label="Téléphone" color="primary" required  error={phoneError} type="tel" value={phone || ""
                                        } onChange={(e) => {setPhone(e.target.value)}} 
                                        InputLabelProps={{style : {color : "#B4B4B4"}}}
                                        InputProps={{style : {color : "#fff"}}}/>
                                        <FormHelperText>{phoneErrorText}</FormHelperText>
                                    </FormControl>

                                    <FormControl error className={classes.margin}>
                                        <TextField variant="filled" label="Adresse" color="primary" onChange={(e) => {setAddress(e.target.value)}} value={address || ""}
                                        InputLabelProps={{style : {color : "#B4B4B4"}}}
                                        InputProps={{style : {color : "#fff"}}}/>
                                    </FormControl>

                                    <FormControl error className={classes.margin}>
                                        <TextField variant="filled" label="Code Postal" color="primary" onChange={(e) => {setZip(e.target.value)}} value={zip || ""}
                                        InputLabelProps={{style : {color : "#B4B4B4"}}}
                                        InputProps={{style : {color : "#fff"}}}/>
                                    </FormControl>

                                    <FormControl error className={classes.margin}>
                                        <TextField variant="filled" label="Ville" color="primary" onChange={(e) => {setCity(e.target.value)}} value={city || ""}
                                        InputLabelProps={{style : {color : "#B4B4B4"}}}
                                        InputProps={{style : {color : "#fff"}}}/>
                                    </FormControl>

                                    
                            </section>
                            <section className="profile-submit-button">
                                <Button className="admin-user-edit-button" color="primary" variant="contained" onClick={onSubmit}>Modifier</Button>
                            </section>
                            <Snackbar open={snackBarOpened} autoHideDuration={6000} onClose={(e) => {closeSnackbar()}}>
                                <MuiAlert onClose={(e) => {closeSnackbar()}} severity={snackBarSeverity}>{successUpdateText}</MuiAlert>
                            </Snackbar>
                    </section>      
                </section>
                <div className="profile-page-divider"></div>
                <h4>Mes commandes</h4>
                {showRequestsDetails()}
            </section>
            <Footer />
        </section>
    )
}

const mapStateToProps = (store) => {
    return {

    }

}

const mapDispatchToProps = {
    refreshUserInfos
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)