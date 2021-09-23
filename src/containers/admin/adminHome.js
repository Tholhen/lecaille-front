import React from "react"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

const AdminHome = (props) => {

    const headerTitle = "Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:null}]

    
    return(
        <section className="root">
                <Header />
                <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
                <section className="admin-container">
                    <AdminMenu />

                    <section className="admin-content">
                        <h4>Bienvenue sur votre interface de gestion</h4>
                        <p>Vous pouvez gérer ici toutes vos commandes, étal du jour, utilisateurs et avis soumis par les utilisateurs</p>
                    </section>
                </section>
                <Footer />
        </section>
    )
}

export default AdminHome