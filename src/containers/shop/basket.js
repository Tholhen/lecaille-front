import React, {useState, useEffect} from "react"
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {config} from "../../config/config"
import {getBasket, deleteFromBasket, clearBasket} from "../../utils/basket"
import {getOneProduct} from "../../api/products"
import {saveRequest, saveRequestDetails} from "../../api/requests"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"

//Imports depuis la librairie MaterialUI
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const Basket = (props) => {

    const headerTitle = "Panier"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"}, {value: "Boutique", link:"/shop"}, {value: "Panier", link:null}]

    const [basket, setBasket] = useState([])
    const [displayedBasket, setDisplayedBasket] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [redirectRequestSuccess, setRedirectRequestSuccess] = useState(false)
    const [redirectRequestSuccessURL, setRedirectRequestSuccessURL] = useState("")

    //Au chargement de la page
    useEffect(() => {
        setBasket(getBasket())
    },[])

    //A chaque modification de basket
    useEffect(() => {
        setDisplayedBasket([])
        for(let i = 0; i < basket.length; i ++){
            getOneProduct(basket[i].productId)
            .then((product) => {
                let productAmount = (basket[i].quantity * product.price/1000).toFixed(2)
                
                setTotalAmount(totalAmount => totalAmount + parseFloat(productAmount))
                setDisplayedBasket(displayedBasket => [...displayedBasket,
                    <article className="basket-item-container" key={i}>
                        <section className="basket-item">
                            <section className="basket-item-pict">
                                <img src={config.product_pict_url + product.pict_url} alt={"illustration"+product.id}/>
                            </section>
                            <section className="basket-item-infos">
                                <Link className="general-link" to={"/shop/products/"+product.id}><p>{product.name}</p></Link>
                                <p><em>{product.category}</em></p>
                                <p>{product.price} €/Kg TTC</p>
                                
                            </section>
                        </section>
                        <section className="basket-item-resume">
                            <p>Quantité désirée : <span>{basket[i].quantity} g</span></p>
                            <p>Prix total (TTC) : <span>{productAmount} € </span> </p>
                        </section>
                        <section className="basket-item-user-interactions">
                            <Button onClick={(e) => {removeItemFromBasket(basket[i].productId)}}><DeleteIcon /></Button>
                        </section>
                    </article>])
            })
            
        }
    }, [basket])

    //Suppression du produit du panier
    const removeItemFromBasket = (id) => {
        deleteFromBasket(id)
        setBasket(getBasket())
    }

    //Fonction d'affichage du panier
    const showDisplayedBasket = () => {

        return (<section className="basket-content">
            {displayedBasket}
        </section>)
    }

    //Enregistrement de la commande
    const saveBasket = () => {
        let datas = {request_number: new Date().getTime(),
                     id_user: props.user.infos.id}
        saveRequest(datas)
        .then(response => {
            for(let i = 0; i < basket.length; i++){
                getOneProduct(basket[i].productId)
                .then((product) => {
                    let detailsDatas = {quantity: basket[i].quantity,
                                        price: product.price,
                                        id_product: basket[i].productId}
                    saveRequestDetails(response.insertId, detailsDatas)
                })
            }
            setRedirectRequestSuccessURL("/shop/request/success/"+response.insertId)
            setRedirectRequestSuccess(true)
            clearBasket()
        })
    }

    return(
        <section className="root">

            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>

            <section className="basket-container">
                <section className="basket-content-container">
                    <section className="basket-header">
                        <p>Mon panier</p>
                        <p>{basket.length > 0 && basket.length + " produit(s)"}</p>    
                    </section>
                    {basket.length === 0 && 
                            <section className="empty-basket">
                                <p>Votre panier est vide</p>
                            <Button variant="contained" color="primary" component={Link} to ="/shop">Commencer mes achats</Button>
                            </section>}

                    {basket && showDisplayedBasket()}
                </section>

                <aside className="basket-resume default-background-gradient">
                    <section className="basket-resume-header">
                        <p>Total</p>
                    </section>
                    <section className="basket-resume-content">
                        <article>
                            <p>Montant total (HT) : </p>
                            <p>{(totalAmount*0.8).toFixed(2)} €</p>
                        </article>
                        <article>
                            <p>Montant TVA : </p>
                            <p>{(totalAmount*0.2).toFixed(2)} €</p>
                        </article>
                        <article>
                            <p>Montant total (TTC) :</p>
                            <p><span>{totalAmount.toFixed(2)} €</span></p>
                        </article>
                    </section>
                    
                    {basket.length > 0 && <section className="basket-resume-footer">
                        <Button variant="contained" color="primary" onClick={(e) => {saveBasket()}}>Commander</Button>
                    </section>}
                </aside>
            </section>
            <Footer/>

            {redirectRequestSuccess && <Redirect to={redirectRequestSuccessURL} />}
        </section>
    )
}

const mapStateToProps = (store) => {
    return {
        user : store.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(Basket) 