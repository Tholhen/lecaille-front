import React, {useState, useEffect} from "react"
import emailjs from 'emailjs-com';
import { configEmailJS } from "../config/configEmailJS";
import {config} from "../config/config"

//Imports des composants de l'UI externes
import Header from "./headers/header"
import HeaderPages from "./headers/headerPages"
import Footer from "./footer"

//Import des composants de la librairie MaterialUI
import TextField from '@material-ui/core/TextField';
import {makeStyles } from "@material-ui/styles";
import { Button } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Import des images
import nearMe from "../assets/icons/near-me-blue.svg"
import phone from "../assets/icons/call-blue.svg"
import email from "../assets/icons/email-blue.svg"
import schedule from "../assets/icons/schedule-blue.svg"

const Contact = (props) => {

    const headerTitle = "Contact"
    const headerBreadcrumbs  = [{value: "Accueil", link:"/"},{value: "Contact", link:null}]

    //Données du formulaire de contact
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [nameErrorMsg, setNameErrorMsg] = useState("")

    const [mailFrom, setMailFrom] = useState("")
    const [mailFromError, setMailFromError] = useState(false)
    const [mailFromErrorMsg, setMailFromErrorMsg] = useState("")

    const [mailMsg, setMailMsg] = useState("")
    const [mailMsgError, setMailMsgError] = useState(false)
    const [mailMsgErrorMsg, setMailMsgErrorMsg] = useState("")

    const [snackBarOpened, setSnackBarOpened] = useState(false)

    //Actions au chargement de la page
    useEffect(() => {
        emailjs.init(configEmailJS.userId)
    }, [])

    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin:{
            margin: theme.spacing(1),
        },
        inputTextWhite : {
            margin: theme.spacing(1),
            color:"white",
            backgroundColor:"white",
            borderTopLeftRadius:"4px",
            borderRadius:"4px",
        }
        }));
        
    const classes = useStyles();

    //Fonctions de gestion de l'ouverture/fermeture de la snackbar
    const closeSnackbar = () => {
        setSnackBarOpened(false)
    }

    const openSnackbar = () => {
        setSnackBarOpened(true)
    }

    //Fonction d'envoi du mail de contact
    const sendMail = () => {
        emailjs.send(configEmailJS.serviceId, configEmailJS.templateId, {from_name:name, from_mail:mailFrom, message: mailMsg})
        .then(response => {
            if(response.status === 200){
                openSnackbar()
                setName("")
                setMailFrom("")
                setMailMsg("")
            }
        })
    }

    //Vérification du formulaire de contact et envoi du mail
    const verifyContactForm = () => {
        if(!name){
            setNameError(true)
            setNameErrorMsg("Veuillez saisir un nom")
        }
        else{
            setNameError(false)
            setNameErrorMsg("")
        }

        if(!mailFrom){
            setMailFromError(true)
            setMailFromErrorMsg("Veuillez saisir un e-mail")
        }
        else {
            if(!mailFrom.match(config.emailRegEx)){
                setMailFromError(true)
                setMailFromErrorMsg("Format d'email non valide")
            }
            else {
                setMailFromError(false)
                setMailFromErrorMsg("")
            }
            
        }

        if(!mailMsg){
            setMailMsgError(true)
            setMailMsgErrorMsg("Saisissez votre message")
        }
        else {
            setMailMsgError(false)
            setMailMsgErrorMsg("")
        }

        if(name && mailFrom && mailMsg && mailFrom.match(config.emailRegEx)){
            sendMail()
        }
    }


    return(<section className="root">
                <Header />
                <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>

                <section className="contact-infos-container">
                    <article className="contact-infos-item">
                        <section className="contact-infos-item-header">
                            <img src={nearMe} alt="Adresse"/>
                            <p>Adresse</p>
                        </section>
                        <p>
                            <span>50 Avenue de Tarbes</span>
                            <span>65500 Vic-en-Bigorre</span>
                        </p>
                    </article>

                    <article className="contact-infos-item">
                        <section className="contact-infos-item-header">
                            <img src={phone} alt="Téléphone"/>
                            <p>Téléphone</p>
                        </section>
                        <p>05 62 31 94 33</p>
                    </article>

                    <article className="contact-infos-item">
                        <section className="contact-infos-item-header">
                            <img src={email} alt="Email"/>
                            <p>Mail</p>
                        </section>
                        <p>mailtest@gmail.com</p>
                    </article>

                    <article className="contact-infos-item">
                        <section className="contact-infos-item-header">
                            <img src={schedule} alt="Horaires"/>
                            <p>Horaires</p>
                        </section>
                        <section>
                            <p><strong>Mardi:</strong> 8h30 - 12h30 et 16h - 19h</p>
                            <p><strong>Mecredi:</strong> 8h30 - 13h</p>
                            <p><strong>Du jeudi au samedi:</strong> 8h30 - 12h30 et 16h - 19h</p>
                        </section>
                    </article>
                </section>
                {/* Intégration de la carte GMaps*/}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.092654233334!2d0.05941222992945523!3d43.37508666409139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a9d973b17561ff%3A0x76550f41d8810aca!2s50%20Avenue%20de%20Tarbes%2C%2065500%20Vic-en-Bigorre!5e0!3m2!1sfr!2sfr!4v1626874184166!5m2!1sfr!2sfr" loading="lazy" title="Nous trouver sur Google Map"></iframe>

                <section className="contact-form-container default-background-gradient">
                    <h4>Contactez-nous !</h4>
                    <p>Vous avez une question ? Une demande particulière ?</p>
                    <form>
                            <FormControl error className="contact-form-formcontrol">
                                <TextField variant="filled" 
                                            className={classes.inputTextWhite}
                                            label="Nom"
                                            required
                                            InputLabelProps={{style : {color : "#B4B4B4"}}}
                                            InputProps={{style : {color : "#12455A"}}} 
                                            error={nameError}
                                            value={name}
                                            onChange={(e) => {setName(e.target.value)}}/>
                                <FormHelperText>{nameErrorMsg}</FormHelperText>
                            </FormControl>
                            
                            <FormControl error className="contact-form-formcontrol">
                                <TextField variant="filled" 
                                            className={classes.inputTextWhite}
                                            label="Mail"
                                            required
                                            InputLabelProps={{style : {color : "#B4B4B4"}}}
                                            InputProps={{style : {color : "#12455A"}}} 
                                            error={mailFromError}
                                            value={mailFrom}
                                            onChange={(e) => {setMailFrom(e.target.value)}}/>
                                <FormHelperText>{mailFromErrorMsg}</FormHelperText>
                            </FormControl>

                            <FormControl error className="contact-form-formcontrol">
                                <TextField variant="filled" 
                                            className={classes.inputTextWhite}
                                            label="Message"
                                            required
                                            InputLabelProps={{style : {color : "#B4B4B4"}}}
                                            InputProps={{style : {color : "#12455A"}}} 
                                            multiline rows={4}
                                            error={mailMsgError}
                                            value={mailMsg}
                                            onChange={(e) => {setMailMsg(e.target.value)}}/>
                                <FormHelperText>{mailMsgErrorMsg}</FormHelperText>
                            </FormControl>
                            <Button color="primary" variant="contained" className={classes.margin} onClick={(e) => {verifyContactForm()}}>Envoyer</Button>
                        </form>
                        <Snackbar open={snackBarOpened} autoHideDuration={6000} onClose={(e) => {closeSnackbar()}}>
                            <MuiAlert onClose={(e) => {closeSnackbar()}} severity="success">Votre message a été envoyé avec succès.</MuiAlert>
                        </Snackbar>
                    
                </section>
                <Footer />
           </section>)
}

export default Contact