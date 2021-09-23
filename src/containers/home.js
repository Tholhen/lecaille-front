import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"

import {getFishesCount, getCrustaceansCount} from "../api/products"
import {getLatestShopOpinions} from "../api/shopOpinions"

import emailjs from 'emailjs-com';
import { configEmailJS } from "../config/configEmailJS";
import {config} from "../config/config"

//Import des composants externes
import HeaderHome from "./headers/headerHome"
import ShopOpinionPopUp from "../components/shopOpinionPopUp"

//Imports de la librairie MaterialUI
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/styles";
import { Button } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Import des images
import wave1 from "../assets/images/wave1.svg"
import wave2 from "../assets/images/wave2.svg"
import waveWhite1 from "../assets/images/wave-white1.svg"
import waveWhite2 from "../assets/images/wave-white2.svg"
import poissons from "../assets/images/poissons.jpeg"
import crustaces from "../assets/images/crustacés.jpeg"
import saintJacques from "../assets/images/saint_jacques.jpeg"
import plateaux from "../assets/images/plateau.jpeg"
import logo from "../assets/images/logos/logo-vertical.png"


const Home = (props) => {

    //Compteur de produits par catégories
    const [fishesCount, setFishesCount] = useState(0)
    const [crustaceansCount, setCrustaceansCount] = useState(0)

    const [shopOpinions, setShopOpinions] = useState([])
    //Données du formulaire de contact + gestion de la snackbar associée
    const [mailName, setMailName] = useState("")
    const [mailNameError, setMailNameError] = useState(false)
    const [mailNameErrorMsg, setMailNameErrorMsg] = useState("")

    const [mailFrom, setMailFrom] = useState("")
    const [mailFromError, setMailFromError] = useState(false)
    const [mailFromErrorMsg, setMailFromErrorMsg] = useState("")

    const [mailMsg, setMailMsg] = useState("")
    const [mailMsgError, setMailMsgError] = useState(false)
    const [mailMsgErrorMsg, setMailMsgErrorMsg] = useState("")

    const [mailSnackBarOpened, setMailSnackBarOpened] = useState(false)

    //Gestion de la popUp d'ajout d'avis
    const [shopOpinionPopUpOpened, setShopOpininionPopUpOpened] = useState(false)
    const [shopOpinionSnackbarOpened, setShopOpininionSnackbarOpened] = useState(false)

    //Actions au chargement de la page
    useEffect(() => {
        getFishesCount()
        .then(count => {
            setFishesCount(count)
        })
        
        getCrustaceansCount()
        .then(count => {
            setCrustaceansCount(count)
        })

        getLatestShopOpinions(5)
        .then(opinions => {
            setShopOpinions(opinions)
        })
        //Initialisation de l'utilisateur pour l'envoi de mail de contact
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

    //Configuration du slider des avis
    const sliderSettings = {
        showStatus: false,
        showArrows: false,
        showThumbs:false,
        showIndicators: true,
        autoPlay:true,
        interval:5000,
        stopOnHover:true,
        infiniteLoop:true,
        swipeable:false,
      }

    //Fonctions de gestion de l'ouverture/fermeture de la snackbar de contact
    const closeMailSnackbar = () => {
        setMailSnackBarOpened(false)
    }

    const openMailSnackbar = () => {
        setMailSnackBarOpened(true)
    }

    //Gestion de la fermeture de la popUp d'ajout d'avis
    const closeShopOpininionPopUp = () => {
        setShopOpininionPopUpOpened(false)
    }
    
    //Fonctions de gestion de l'ouverture/fermeture de la snackbar d'avis
    const openShopOpinionSnackbar = () => {
        setShopOpininionSnackbarOpened(true)
    }

    const closeShopOpinionSnackbar = () => {
        setShopOpininionSnackbarOpened(false)
    }
    //Fonction d'envoi du mail de contact
    const sendMail = () => {
        emailjs.send(configEmailJS.serviceId, configEmailJS.templateId, {from_name:mailName, from_mail:mailFrom, message: mailMsg})
        .then(response => {
            if(response.status === 200){
                openMailSnackbar()
                setMailName("")
                setMailFrom("")
                setMailMsg("")
            }
        })
    }

    //Vérification du formulaire de contact et envoi du mail
    const verifyContactForm = () => {
        if(!mailName){
            setMailNameError(true)
            setMailNameErrorMsg("Veuillez saisir un nom")
        }
        else{
            setMailNameError(false)
            setMailNameErrorMsg("")
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

        if(mailName && mailFrom && mailMsg && mailFrom.match(config.emailRegEx)){
            sendMail()
        }
    }

    

    return (
        <section className="root">
            <HeaderHome />
            

            {/** Types de produits proposés par la boutique */}
            <section className="product-categories-container-home  default-background-gradient">
                <section className="wave-categories-home">
                    <img src={wave1} className="wave-categories-home-1" alt="Vague 1"/>
                    <img src={wave2} className="wave-categories-home-2" alt="Vague 2"/>
                </section>
                <section className="product-categories-content-home">
                        <article>
                            <section>
                                <img src={poissons} alt="Poissons"/>
                            </section>
                            <p>Poissons</p>
                        </article>
                        <article>
                            <section>
                                <img src={crustaces} alt="Crustacés"/>
                            </section>
                            <p>Crustacés</p>
                        </article>
                        <article>
                            <section>
                                <img src={saintJacques} alt="Coques"/>
                            </section>
                            <p>Coquillages</p>
                        </article>
                        <article>
                            <section>
                                <img src={plateaux} alt="Plateaux"/>
                            </section>
                            <p>Plateaux</p>
                        </article>
                </section>
            </section>
            

            <div className="divider-home">
            </div>

            <section className="products-presentation-home">
                {/*Compteur de produits*/}
                <section className="product-counter default-background-gradient">
                    <img src={waveWhite1} alt="Vague blanche"></img>
                    <section className="product-counter-content-container">
                        <section className="product-counter-content">
                            <article className="product-counter-item">
                                <p>{fishesCount}</p>
                                <p>Variétés de poissons</p>
                            </article>
                            <article className="product-counter-item">
                                <p>{crustaceansCount}</p>
                                <p>Variétés de crustacés</p>
                            </article>
                        </section>
                    </section>
                </section>

                {/**Présentation générale des produits */}
                <section className="products-presentation-home-text">
                    <p>Avec un arrivage tous les matins, synonyme de fraicheur, la qualité des produits est notre priorité.</p>
                </section>
            </section>
            
            
            {/**Avis des clients */}
            {shopOpinions.length > 0 && 
            <section className="latest-shop-opinions default-background-gradient">
                <img src={waveWhite2} alt="Vague blanche"/>
                <section className="latest-shop-opinions-container">
                    <h2>On parle de nous</h2>
                    <section className="latest-shop-opinions-carousel">
                        <Carousel {...sliderSettings}>
                            {shopOpinions.map((opinion) => {
                                return (
                                    <article key={opinion.id} className="latest-shop-opinions-item-container">
                                        <section className="latest-shop-opinions-item">
                                            <section className="latest-shop-opinions-item-content">
                                                <div className="shop-opinions-item-left">
                                                    <p>"</p>
                                                </div>
                                                <div className="shop-opinions-item-comment">
                                                    <p>{opinion.comment}</p>
                                                    <p><em>- {opinion.first_name} {opinion.last_name}</em></p>
                                                </div>
                                                <div className="shop-opinions-item-right">
                                                    <p>"</p>
                                                </div>
                                            </section>
                                            {opinion.pict_url && 
                                                    <section className="shop-opinions-item-pict">
                                                        <img src={config.shop_opinion_pict_url + opinion.pict_url} alt={"illustration"+opinion.id} />
                                                    </section>}
                                        </section>
                                    </article>)
                            })}
                        </Carousel>
                    </section>
                    {props.user.isLogged && 
                    <section className="latest-shop-opinions-button">
                        <Button className={classes.margin} variant="outlined" color="secondary" onClick={(e) => {setShopOpininionPopUpOpened(true)}}>Laissez un avis</Button>
                        {shopOpinionPopUpOpened && <ShopOpinionPopUp opened={shopOpinionPopUpOpened} closeShopOpinionPopUp={(e) => {closeShopOpininionPopUp()}} openShopOpinionSnackbar={(e) => {openShopOpinionSnackbar()}}/>}

                        <Snackbar open={shopOpinionSnackbarOpened} autoHideDuration={6000} onClose={(e) => {closeShopOpinionSnackbar()}}>
                            <MuiAlert onClose={(e) => {closeShopOpinionSnackbar()}} severity="success">Votre avis a été envoyé avec succès.</MuiAlert>
                        </Snackbar>
                    </section>}
                    
                </section>
            </section>}

            {/**Pied de page */}
            <section className="footer-home default-background-gradient">
                <section className="footer-home-container">
                    <article className="footer-home-general-infos">
                        <img src={logo} alt="logo" />
                        <p>
                            <span>50 Av. de Tarbes</span>
                            <span>65500 Vic-en-Bigorre</span>
                        </p>
                    </article>
                    <article className="footer-home-schedule">
                        <p>Horaires</p>
                        <p><strong>Mardi:</strong> 8h30 - 12h30 et 16h - 19h</p>
                        <p><strong>Mecredi:</strong> 8h30 - 13h</p>
                        <p><strong>Du jeudi au samedi:</strong> 8h30 - 12h30 et 16h - 19h</p>
                    </article>
                    <article className="footer-home-contact-form" id="contact-form-home">
                        <p>Une question ? Une demande particulière ?</p>
                        <p>Contactez-nous !</p>
                        <form>
                            <FormControl error className="footer-home-contact-formcontrol">
                                <TextField variant="filled" 
                                            className={classes.inputTextWhite}
                                            label="Nom"
                                            required
                                            InputLabelProps={{style : {color : "#B4B4B4"}}}
                                            InputProps={{style : {color : "#12455A"}}} 
                                            error={mailNameError}
                                            value={mailName}
                                            onChange={(e) => {setMailName(e.target.value)}}/>
                                <FormHelperText>{mailNameErrorMsg}</FormHelperText>
                            </FormControl>
                            
                            <FormControl error className="footer-home-contact-formcontrol">
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

                            <FormControl error className="footer-home-contact-formcontrol">
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
                        <Snackbar open={mailSnackBarOpened} autoHideDuration={6000} onClose={(e) => {closeMailSnackbar()}}>
                            <MuiAlert onClose={(e) => {closeMailSnackbar()}} severity="success">Votre message a été envoyé avec succès.</MuiAlert>
                        </Snackbar>
                    </article>

                </section>
            </section>
        </section>
    )
}

const mapStateToProps = (store) => {
    return {
        user : store.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home) 