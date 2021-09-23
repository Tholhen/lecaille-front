import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {getOneRequest} from "../../api/requests"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"

//Imports depuis la librairie MaterialUI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const RequestSuccess = (props) => {

    const headerTitle = "Panier"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"}, {value: "Boutique", link:"/shop"}, {value: "Commande", link:null}]
    const [request, setRequest] = useState({})

    //Au chargement de la page
    useEffect(() => {
        getOneRequest(props.match.params.id)
        .then(requestDB => {
            setRequest(requestDB)
        })
    },[props.match.params.id])

    return(
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
            <section className="request-success-container">
                <h4>Commande enregistrée</h4>
                <p>Votre commande n°<strong>{request.request_number}</strong> a bien été été enregistrée.</p>
                <p>Vous pouvez la consulter directement sur votre profil</p>
                <Link to="/shop" className="general-link"><p><ArrowBackIcon />Retour à la boutique</p></Link>
            </section>
            <Footer />
        </section>
    )
}

export default RequestSuccess