import React, {useState} from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom"

//Imports de la librairie MaterialUI
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

//Import des images
import logoBig from "../../assets/images/logos/logo-complet.png"
import fishermanStamp from "../../assets/images/fisherman-stamp.png"

//Import des composants externes
import HeaderNav from "./headerNav"
import RegisterPopUp from "../../components/registerPopUp"
import LoginPopUp from "../../components/loginPopUp"


const HeaderHome = (props) => {

    const [openRegisterPopUp, setOpenRegisterPopUp] = useState(false);
    const [openLoginPopUp, setOpenLoginPopUp] = useState(false);

    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin:{
            margin: theme.spacing(3),
        }
        }));
        
    const classes = useStyles();

    const closeRegisterForm = () => {
        setOpenRegisterPopUp(false)
    }

    const closeLoginForm = () => {
        setOpenLoginPopUp(false)
    }

    
    return (<section className="headerhome-container default-background-gradient">

                <HeaderNav/>
                
                {!props.user.isLogged && 
                <section className="login-register-home">
                    <Button className={classes.margin} color="secondary" variant="outlined" onClick={(e) => {setOpenLoginPopUp(true)}}>Se connecter</Button>
                    {openLoginPopUp && <LoginPopUp opened={openLoginPopUp} closeLoginForm={(e) => {closeLoginForm()}} />}

                    <Button className={classes.margin} color="secondary" variant="outlined" onClick={(e) => {setOpenRegisterPopUp(true)}}>S'enregistrer</Button>
                    {openRegisterPopUp && <RegisterPopUp opened={openRegisterPopUp} closeRegisterForm={(e) => {closeRegisterForm()}} />}
                </section>}
                
                <section className="headerhome-content-container">
                    <section className="headerhome-content">
                        <img className="headerhome-logo" src={logoBig} alt="Logo"/>
                        <h1>Après la mer, <span>votre 
                            meilleure 
                            poissonnerie</span></h1>
                        <img className="fisherman-home" src={fishermanStamp} alt="fisherman" />
                    </section>
                </section>
                <section className="header-buttons-container">
                    <Button className={classes.margin} color="primary" variant="contained" component={Link} to="/shop/dailystand">Etal du jour</Button>
                    {props.user.isLogged && <Button className={classes.margin} color="secondary" variant="outlined" component={Link} to="/shop">Boutique</Button>}
                    
                </section>
                
            </section>)

    
}

const mapStateToProps = (store) => {
    return {
        user : store.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome) 