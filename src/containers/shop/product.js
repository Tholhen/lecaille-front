import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import {config} from "../../config/config"
import {addToBasket} from "../../utils/basket"
import {getOneProduct} from "../../api/products"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"

//Imports depuis la librairie MaterialUI
import TextField from '@material-ui/core/TextField'
import { makeStyles } from "@material-ui/styles"
import { Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Product = (props) => {

    const headerTitle = "Boutique"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"}, {value: "Boutique", link:null}]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState("")
    const [amount, setAmount] = useState(0)

    const [snackbarOpened, setSnackbarOpened] = useState(false)

    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        qtyInput:{
            width:"100%"
        },
        addToBasket:{
            marginTop: theme.spacing(2),
            width:"100%"
        }
        }));
        
    const classes = useStyles();

    //Au chargement de la page
    useEffect(() => {
        getOneProduct(props.match.params.id)
        .then(productDB => {
            setProduct(productDB)
        })
    }, [props.match.params.id])

    //Calcul du prix désiré en temps réel
    const displayAmount = (e) => {
        if(e.target.value > 0){
            if(e.target.value > 10000){
                setQuantity(10000)
                setAmount((10000*product.price/1000).toFixed(2))
            } else {
                setQuantity(e.target.value)
                setAmount((e.target.value*product.price/1000).toFixed(2))
            }
        } else {
            setQuantity("")
            setAmount(0)  
        }
        
    }

    return(
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
            <section className="product-container">
                <section className="product-content">
                    <section className="product-presentation">
                        <section className="product-header">
                            <p>{product.category}</p>
                            <p>{product.name}</p>
                        </section>
                        <section className="product-pict">
                            {product.pict_url && <img src={config.product_pict_url + product.pict_url} alt={product.name} />}
                        </section>
                        <section className="product-infos">
                            <section className="product-price">
                                <p>Prix : <strong>{product.price} €/Kg TTC</strong></p>
                            </section>
                            <section className="product-add-to-basket">
                                <section className="add-to-basket-quantity">
                                    <TextField variant="filled" 
                                            label="Quantité désirée"
                                            type="number"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">g</InputAdornment>,
                                                
                                            }} 
                                            className={classes.qtyInput}
                                            onChange={(e) => {displayAmount(e)}}
                                            value={quantity}/>
                                    {parseFloat(amount) !== 0 && <p>Montant désiré : {amount} € TTC</p>}
                                </section>
                                
                                <section>
                                    <Button variant="contained" color="primary" className={classes.addToBasket} 
                                        onClick={(e) => {addToBasket(product, quantity)
                                                         setSnackbarOpened(true)}}><AddShoppingCartIcon />
                                        Ajouter au panier
                                    </Button>
                                    <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={(e) => {setSnackbarOpened(false)}}>
                                        <MuiAlert onClose={(e) => {setSnackbarOpened(false)}} severity="success">Produit ajouté au panier.</MuiAlert>
                                    </Snackbar>
                                </section>
                            </section>
                        </section>
                        {product.description && <section className="product-description">
                            <p>Description</p>
                            <p>{product.description}</p>
                        </section>}
                    </section>
                </section>
                <section className="back-to-shop">
                    <Link className="general-link" to="/shop"><p><ArrowBackIcon /> Retour à la liste des produits</p></Link>
                </section>
                
                
            </section>
            <Footer />
        </section>
    )
}

export default Product