import React, {useState} from "react";
import {Link} from "react-router-dom"
import {connect} from"react-redux"

import logo from "../../assets/images/logos/logo-complet.png"

//Imports des composants de l'UI externes
import HeaderNav from "./headerNav"
import RegisterPopUp from "../../components/registerPopUp"
import LoginPopUp from "../../components/loginPopUp"

//Imports de la librairie MaterialUI
import {makeStyles } from "@material-ui/styles";
import { Button } from '@material-ui/core';

const Header = (props) => {

    const [openRegisterPopUp, setOpenRegisterPopUp] = useState(false);
    const [openLoginPopUp, setOpenLoginPopUp] = useState(false);

    //Définition du style MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
            width: "90%"
        },
    }));

    const classes = useStyles();

    const registerForm = () => {
        setOpenRegisterPopUp(false)
    }

    const closeRegisterForm = () => {
        setOpenRegisterPopUp(false)
    }

    const loginForm = () => {
        setOpenLoginPopUp(false)
    }

    const closeLoginForm = () => {
        setOpenLoginPopUp(false)
    }

    return (<div className="header-container default-background-gradient">

                <HeaderNav />

                <section className="header-content-container">
                        <Link to="/"><img className="header-logo" src={logo} alt="Logo"/></Link>
                </section>

                {!props.user.isLogged && 
                    <section className="login-register">
                        <Button color="secondary" variant="outlined" onClick={(e) => {setOpenLoginPopUp(true)}} className={classes.margin}>Se connecter</Button>
                        {openLoginPopUp && <LoginPopUp loginForm={(e) => { loginForm()}} opened={openLoginPopUp} closeLoginForm={(e) => {closeLoginForm()}}/>}

                        <Button color="secondary" variant="outlined" onClick={(e) => {setOpenRegisterPopUp(true)}} className={classes.margin}>S'enregistrer</Button>
                        {openRegisterPopUp && <RegisterPopUp registerForm={(e) => { registerForm()}} opened={openRegisterPopUp} closeRegisterForm={(e) => {closeRegisterForm()}}/>}
                    </section>}

                
                
            </div>)
}

const mapStateToProps = (store) => {
    return {
        user : store.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)