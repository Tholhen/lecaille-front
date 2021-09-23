import React, {useState, useEffect} from "react";
import {connect} from "react-redux"

import {config} from "../../config/config"
import {getProducts} from "../../api/products"
import {Link} from "react-router-dom"

//Imports de la librairie MaterialUI
import { Button } from '@material-ui/core';

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

//Import des images
import editIcon from "../../assets/icons/edit-blue.svg"
import deleteIcon from "../../assets/icons/delete-blue.svg"


const AdminProducts = (props) => {
    const headerTitle = "Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"},{value: "Produits", link:null}]
    
    const range = 10
    const [startPoint, setStartPoint] = useState(0)
    const [selectedPage, setSelectedPage] = useState(1)

    const [allProducts, setAllProducts] = useState([])

    //Au chargement de la page
    useEffect(() => {
        getProducts()
        .then(response => {
            setAllProducts(response)
        })

    }, [])

    // Affichage des produits
    const showProducts = () => {
        // Définition de la liste des items affichés
        let items = []
        // Paramètres de la boucle d'affichage
        let loopMin;
        let loopMax;

        // Définition des paramètres pour la boucle d'affichage
        if(allProducts.length - startPoint < range){
          loopMin = startPoint
          loopMax = allProducts.length  
        }
        else {
            loopMin = startPoint
            loopMax = startPoint + range
        }

        // Génération des items pour l'affichage
        for(let i = loopMin; i < loopMax; i++){
            items.push(
                <article className="admin-product-list-item" key={i}>
                    {allProducts[i].pict_url && 
                    <section className="admin-product-list-item-pict">
                        <img src={config.product_pict_url + allProducts[i].pict_url}  alt="Illustration du produit"/>
                        </section>}

                    <section className="admin-product-list-item-infos">
                        <p>{allProducts[i].name}</p>
                        <p>{allProducts[i].price} €/Kg TTC</p>
                    </section>

                    <section className="edit-delete-product-container">
                        <Link to={"/admin/products/edit/"+allProducts[i].id}><img src={editIcon} alt="Edit icon" className="edit-delete-product"/></Link>
                        <Link to={"/admin/products/delete/"+allProducts[i].id}><img src={deleteIcon} alt="Delete icon" className="edit-delete-product"/></Link>
                    </section>
                </article>
            )
        }

        return(
            <section className="admin-product-list">
                {items}
            </section>
                
        )
    }

    // Au changement de page
    const changePage = (pageNumber) => {
        setSelectedPage(pageNumber)
        if(pageNumber > 1){
            setStartPoint(((pageNumber-1)*range))
        }
        else {
            setStartPoint(0) 
        }
    }
    
    // Affichage de la liste des pages
    const showPagesList = () => {
        let pagesList = []
        let numberOfPages = allProducts.length / range
        

        for(let i = 1; i < numberOfPages+1; i ++) {
            if(i === selectedPage) {
                pagesList.push(
                    <article className="admin-product-page-number-selected" onClick={(e) => {changePage(i)}} key={i}>
                        <p>{i}</p>
                    </article>
                )
            }
            else {
                pagesList.push(
                    <article className="admin-product-page-number" onClick={(e) => {changePage(i)}} key={i}>
                        <p>{i}</p>
                    </article>
                )
            }
        }

        return( <div className="admin-product-page-selection">
            {pagesList}
        </div>) 
    }

    return(
        <section className="root">
                <Header />
                <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
                <section className="admin-container">
                    <AdminMenu />
 
                    <section className="admin-content">
                        <h4>Gestion des produits</h4>
                        <section className="admin-add-product-btn">
                            <Button color="primary" variant="contained" component={Link} to="/admin/products/add">Ajouter un produit</Button>
                        </section>
                        <section className="product-list-container">
                            {showProducts()}
                        </section>
                        <section className="admin-product-page-selection-container">
                            {showPagesList()}
                        </section>
                    </section>
                </section>
                <Footer />
        </section>
    )
}

const mapStateToProps = (store) => {
    return {

    }
}   

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)