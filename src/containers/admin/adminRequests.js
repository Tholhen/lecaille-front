import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {getAllRequests} from "../../api/requests"
import {loadAllRequests} from "../../actions/request/requestAction"
import {convertDate} from "../../utils/utils"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

//Imports de la librairie MaterialUI
import CreateIcon from '@material-ui/icons/Create'

const AdminRequests = (props) => {

    const headerTitle ="Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"},{value: "Commandes", link:null}]

    const [displayedRequests, setDisplayedRequests] = useState([])

    //Au chargement de la page
    useEffect(() => {
        getAllRequests()
        .then(requestsDB => {
            loadDisplayedRequests(requestsDB)
        })
    }, [])

    /*//A chaque modification du redux requests
    useEffect(() => {
        loadDisplayedRequests(props.requests.list)
    }, [props.requests])*/

    //Construction de la liste des commandes à afficher
    const loadDisplayedRequests = (requests) => {
        for(let i = 0; i < requests.length; i++){
            setDisplayedRequests(displayedRequests => [...displayedRequests,
                <article key={requests[i].id} className="admin-request-item">
                    <section className="request-item-header">
                        <p>N°{requests[i].request_number}</p>
                        <p>du {convertDate(requests[i].request_date)}</p>
                        <p>Statut : {requests[i].preparation_status}</p>
                    </section>
                    <section className="request-item-content">
                        <Link to={"/admin/request/"+requests[i].id} className="general-link"><p><CreateIcon /> Editer / Plus d'infos</p></Link>
                    </section>
                    <section className="request-item-resume">
                        <p>Total</p>
                        <p>{requests[i].total_amount} € TCC</p>
                    </section>
                </article>])
        }
    }  

    //Fonction d'affichage de la liste des commandes de
    const showDisplayedRequests = () => {
        return(
            <section>
                {displayedRequests}
            </section>
        )
    }

    return (    
        <div className="root">
                <Header />
                <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
                <section className="admin-container">
                    <AdminMenu />
 
                    <section className="admin-content">
                        <h4>Gestion des commandes</h4>
                        {showDisplayedRequests()}
                    </section>
                </section>
                <Footer />
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        requests: store.requests
    }
}

const mapDispatchToProps = {
    loadAllRequests
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRequests)