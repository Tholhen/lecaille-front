import React, {useState, useEffect} from "react"

import {getAllShopOpinions} from "../../api/shopOpinions"
import {convertDate} from "../../utils/utils"
import {config} from "../../config/config"
import {deleteOpinion} from "../../api/shopOpinions"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

//Imports depuis la librairie MaterialUI
import { makeStyles } from "@material-ui/styles"
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const AdminShopOpinions = (props) => {

    const headerTitle ="Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"},{value: "Avis", link:null}]

    const [displayedShopOpinions, setDisplayedShopOpinions] = useState([])

    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        deleteBtn:{
            color:"#cc0e00"
        }
        }));
        
    const classes = useStyles();

    //Au chargement de la page
    useEffect(() => {
        refreshDisplay()
        //Suppression de l'avertissement des problèmes de dépendances UNIQUEMENT dans le cas d'un équivalent du ComponentDidMount()
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    const refreshDisplay = () => {
        getAllShopOpinions()
        .then(shopOpinionsDB => {
            setDisplayedShopOpinions([])
            loadDisplayedShopOpinions(shopOpinionsDB)
        })
    }

    const deleteDisplayedOpinion = (id, index) => {
        deleteOpinion(id)
        .then(response => {
            refreshDisplay()
        })
    }

    //Chargement des avis à afficher
    const loadDisplayedShopOpinions = (shopOpinions) => {
        for(let i = 0; i < shopOpinions.length; i++){
            setDisplayedShopOpinions(displayedShopOpinions => [...displayedShopOpinions, 
                <article key={shopOpinions[i].id} className="shop-opinion-item">
                    <section className="shop-opinion-infos">
                        <p>" {shopOpinions[i].comment} "</p>
                        <p>Auteur : <em>{shopOpinions[i].first_name} {shopOpinions[i].last_name}</em></p>
                        <p><em>le {convertDate(shopOpinions[i].creation_timestamp)}</em></p>
                    </section>
                    {shopOpinions[i].pict_url &&
                    <section className="shop-opinion-pict">
                        <img src={config.shop_opinion_pict_url + shopOpinions[i].pict_url} alt={"illustration"+shopOpinions[i].id}/>
                    </section>}
                    <Button className={classes.deleteBtn} onClick={() => {deleteDisplayedOpinion(shopOpinions[i].id, i)}}><DeleteIcon /></Button>
                </article>])
        }
    }

    //Fonction d'affichage des avis
    const showDisplayedShopOpinions = () => {
        return(
            <section className="shop-opinions-container">
                {displayedShopOpinions.length > 0 ? displayedShopOpinions : <p>Aucun avis à afficher</p>}
            </section>
        )
    }

    return (
        <section className="root">
                <Header />
                <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
                <section className="admin-container">
                    <AdminMenu />
 
                    <section className="admin-content">
                        <h4>Gestion des avis</h4>
                        {showDisplayedShopOpinions()}
                    </section>
                </section>
                <Footer />
        </section>
    )
}

export default AdminShopOpinions