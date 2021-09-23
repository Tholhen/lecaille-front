import React, {useState} from "react"
import {Link} from "react-router-dom"
import {connect} from"react-redux"
import { NavHashLink } from 'react-router-hash-link';

//Imports de la librairie MaterialUI
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Import des images
import logoBig from "../../assets/images/logos/logo-complet.png"
import logoSmall from "../../assets/images/logos/logo-nav.png"
import menuIcon from "../../assets/icons/menu-icon.svg"
import adminIcon from "../../assets/icons/admin-icon.svg"
import profileIcon from "../../assets/icons/profile-icon.svg"
import cartIcon from "../../assets/icons/cart-icon.svg"
import logoutIcon from "../../assets/icons/logout-icon.svg"

const HeaderNav = (props) => {

    const [drawerMenuOpened, setDrawerMenuOpened] = useState(false)

    return(<section className="header-nav-container">
                {/*Création du menu de navigation*/}
                <img className="header-nav-menu-icon" src={menuIcon} alt="Icone menu" onClick={(e) => {setDrawerMenuOpened(true)}}/>

                <section className="header-nav-logo-container">
                    <Link to="/">{window.location.pathname !== "/" ? <img className="header-nav-logo-small" src={logoSmall} alt="Logo"/> : <img className="header-nav-logo-big" src={logoBig} alt="Logo"/>}</Link>
                </section>
                

                <nav className="header-nav-desktop" aria-label="Menu du site">
                    <ul>
                        <li><Link to="/" className={window.location.pathname === "/" ? "header-nav-desktop-link-selected" : "header-nav-desktop-link"} >Accueil</Link></li>
                        <li><Link to="/shop/dailystand" className="header-nav-desktop-link">Etal du jour</Link></li>
                        {props.user.isLogged &&<li><Link to="/shop" className="header-nav-desktop-link">Boutique</Link></li>}
                        <li><NavHashLink smooth to={window.location.pathname === "/" ? "/#contact-form-home" : "/contact"} className="header-nav-desktop-link">Contact</NavHashLink></li>
                    </ul>
                </nav>
                
                {props.user.isLogged &&
                <nav className="header-nav" aria-label="Menu du compte">
                    {props.user.infos.role === "Admin" && <Link to="/admin"><img className="header-nav-icon" src={adminIcon} alt="Panneau d'administration"/></Link>}
                    <Link to="/user/profile"><img className="header-nav-icon" src={profileIcon} alt="Profil"/></Link>
                    <Link to="/shop/basket"><img className="header-nav-icon" src={cartIcon} alt="Panier"/></Link>
                    <Link to="/user/logout"><img className="header-nav-icon" src={logoutIcon} alt="Se déconnecter"/></Link>
                </nav>}

                {/*Création du menu latéral*/}
                <Drawer anchor="left" open={drawerMenuOpened} onClose={(e) => {setDrawerMenuOpened(false)}} variant="temporary">
                    <List className="default-background-gradient">
                        <ListItem>
                            <img className="header-logo" src={logoBig} alt="Logo"/>
                        </ListItem>
                    </List>
                    <List>
                        <Link to="/" className="drawer-menu-link">
                            <ListItem button>
                                <ListItemText primary="Accueil"/>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/shop/dailystand" className="drawer-menu-link">
                            <ListItem button>
                                <ListItemText primary="Etal du jour"/>
                            </ListItem>
                        </Link>
                        {props.user.isLogged && <Link to="/shop" className="drawer-menu-link">
                            <ListItem button>
                                <ListItemText primary="Boutique"/>
                            </ListItem>
                        </Link>}
                    </List>
                    <Divider />
                    <List>
                        <Link to="/contact" className="drawer-menu-link">
                            <ListItem button>
                                <ListItemText primary="Contact"/>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </section>)

}

const mapStateToProps = (store) => {
    return {
        user : store.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav)