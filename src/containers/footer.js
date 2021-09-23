import React from 'react'

//Import des images
import logoText from "../assets/images/logos/lecaille.png"
import logoHalf from "../assets/images/logos/logo-half.png"

const Footer = (props) => {

    return(<section className="footer-container default-background-gradient">
        <img src={logoText} alt="Logo texte L'écaille" className="footer-logo-text"/>
        <img src={logoHalf} alt="Logo" className="logo-half"/>
        <section className="copyright">
            <p>Copyright © 2021 L'écaille - Tous droits réservés</p>
        </section>
    </section>)
}

export default Footer