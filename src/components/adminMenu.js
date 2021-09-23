
import React  from "react"
import {Link} from 'react-router-dom';


//Import des images
import pointOfSale from "../assets/icons/point-of-sale-white.svg"
import accounts from "../assets/icons/manage-accounts-white.svg"
import comments from "../assets/icons/comment.svg"
import today from "../assets/icons/today-white.svg"
import products from "../assets/icons/sell-white.svg"

const AdminMenu = (props) => {
    return (<section className="admin-menu-container">
                <section className="admin-menu default-background-gradient">
                    <section className="admin-menu-header">
                            <h3>Tableau de bord</h3>
                    </section>
                    <section className="admin-menu-content">
                        <article className="admin-menu-item">
                            <Link to="/admin/requests" className="admin-menu-link">
                            <img src={pointOfSale} alt="Icone commandes"/>
                            <p>Commandes</p></Link>
                        </article>
                        <article className="admin-menu-item">
                            <Link to="/admin/products" className="admin-menu-link"><img src={products} alt="Icone produits"/>
                            <p>Produits</p></Link>
                        </article>
                        <article className="admin-menu-item">
                            <Link to="/admin/dailystand" className="admin-menu-link">
                            <img src={today} alt="Icone étal du jour"/>
                            <p>Etal du jour</p></Link>
                        </article>
                        <article className="admin-menu-item">
                            <Link to="/admin/shop/opinions" className="admin-menu-link">
                            <img src={comments} alt="Icone commentaires"/>
                            <p>Avis</p></Link>
                        </article>
                        <article className="admin-menu-item">
                            <Link to="/admin/users" className="admin-menu-link"><img src={accounts} alt="Icone comptes utilisateurs"/>
                            <p>Utilisateurs</p></Link>
                        </article>
                    </section>
                    
                </section>
            </section>)
}

export default AdminMenu