import React, {useState, useEffect} from "react"

import {getOneRequest, getAllRequestDetails, getAllRequestsStatus, updateRequestStatus} from "../../api/requests"
import {convertDate} from "../../utils/utils"
import {config} from "../../config/config"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

//Imports de la librairie MaterialUI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const AdminRequestEdit = (props) => {

    const headerTitle ="Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"},{value: "Commandes", link:"/admin/requests"}, {value: "Edition", link:null}]
    const [request, setRequest] = useState({})
    const [displayedDetails, setDisplayedDetails] = useState([])
    const [displayedSelect, setDisplayedSelect] = useState("")

    const [snackbarOpened, setSnackbarOpened] = useState(false)

    //Au chargement de la page
    useEffect(() => {
        getOneRequest(props.match.params.id)
        .then(requestDB => {
            setRequest(requestDB)
            getAllRequestsStatus()
            .then(statusDB => {
                //Création de la liste déroulante des statuts de commande
                setDisplayedSelect(
                    <FormControl >
                        <InputLabel shrink={true}>Statut</InputLabel>
                        <NativeSelect defaultValue={requestDB.id_preparation_status} variant="filled" onChange={(e) => {handleChangeSelect(requestDB.id, e.target.value)}}>
                                {   
                                    statusDB.map(statusItem => {
                                    return(
                                    <option value={statusItem.id} key={statusItem.id}>{statusItem.label}</option>
                                    )
                                })}
                        </NativeSelect>
                    </FormControl>)
            })
        })
        
        getAllRequestDetails(props.match.params.id)
        .then(requestDetailsDB => {
            loadDisplayedDetails(requestDetailsDB)
        })

        
    }, [props.match.params.id])

    //Fonction de chargement de l'affichage des détails de la commandes
    const loadDisplayedDetails = (details) => {
        for(let i = 0; i < details.length; i++){
            setDisplayedDetails(displayedDetails => [...displayedDetails,
                <article className="admin-request-detail-item" key={details[i].id}>
                    <section className="request-detail-item-presentation">
                        <section>
                            <p>{details[i].category}</p>
                            <p>{details[i].name}</p>
                        </section>
                        <img src={config.product_pict_url + details[i].pict_url} alt={"Illustration "+details[i].name} />
                    </section>
                    <section className="request-detail-item-resume">
                        <p>Prix : {details[i].price} €/Kg TTC</p>
                        <p>Poids : {details[i].quantity} g</p>
    
                        <section>
                            <p>Montant : <span>{details[i].total_amount_detail} € TTC</span></p>
                        </section>
                        
                    </section>
                </article>])
        }
    }
    
    //Affichage des détails de la commande
    const showDisplayedDetails = () => {
        return(
            <section className="admin-request-content">
                <section className="admin-request-content-header">
                    <p>Détails</p>
                </section>
                {displayedDetails}
            </section>)
    }

    //Affichage de la liste déroulante
    const showDisplayedSelect = () => {
        return(
            <div>
                {displayedSelect}
            </div>
        )
    }

    //Fonction de modification du status de la commande
    const handleChangeSelect = (idRequest, value) => {
        let datas = {
            id_request: idRequest,
            id_preparation_status: value
        }

        updateRequestStatus(datas)
        .then(response => {
            if(response.status === 200){
                setSnackbarOpened(true)
            }
        })
    }

    return (
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
            <section className="admin-container">
                <AdminMenu />

                <section className="admin-content">
                    <h4>Edition de commande</h4>
                    <section className="admin-request-container">
                        <section className="admin-request-header">
                            <p>N°{request.request_number}</p>
                            <p>du {convertDate(request.request_date)}</p>
                            {showDisplayedSelect()}
                        </section>
                        <section className="admin-request-customer-container">
                            <section className="admin-request-customer-title">
                                <p>Client</p>
                            </section>
                            
                            <section className="admin-request-customer-content">
                                <p>Nom : {request.first_name} {request.last_name}</p>
                                <p>Tel. : {request.phone}</p>
                                <p>Mail : {request.email}</p>
                                <p>
                                    Adresse : <span>{request.address}</span>
                                    <span>{request.zip}</span>
                                    <span>{request.city}</span>
                                </p>
                            </section>
                        </section>
                        {showDisplayedDetails()}
                        <section className="admin-request-resume">
                            <p>Total</p>
                            <p>{request.total_amount} € TTC</p>
                        </section>
                    </section>
                </section>
            </section>
            <Footer />
            <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={(e) => {setSnackbarOpened(false)}}>
                <MuiAlert onClose={(e) => {setSnackbarOpened(false)}} severity="success">Modification du status effectuée.</MuiAlert>
            </Snackbar>
        </section>
    )
}

export default AdminRequestEdit