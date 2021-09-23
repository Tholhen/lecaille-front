import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {loadProducts} from "../../actions/product/productAction"

import {config} from "../../config/config"
import {getBasket} from "../../utils/basket"

import {getOneProduct, getProducts,getAllProductCat} from "../../api/products"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"

//Imports depuis la librairie MaterialUI
import TextField from '@material-ui/core/TextField'
import { makeStyles } from "@material-ui/styles"
import { Button } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'

const Shop = (props) => {

    const headerTitle = "Boutique"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},
                               {value: "Boutique", link:null}]

    
    const [userSearchValue, setUserSearchValue] = useState("")
    const [categories, setCategories] = useState([])
    
    const [filters, setFilters] = useState([])

    const [products, setProducts] = useState([])
    const [dataRefreshNeeded, setDataRefreshNeeded] = useState(false)

    const [basket, setBasket] = useState([])
    const [displayedBasket, setDisplayedBasket] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    
    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin:{
            margin: theme.spacing(1),
        },
        addToBasket:{
            marginTop: theme.spacing(2),
            width:"3em"
        },
        categories:{
            width:"100%"
        },
        filterButton:{
            margin:theme.spacing(1)
        }
        }));
        
    const classes = useStyles();


    //Au chargement de la page
    useEffect(() => {
        //Chargement des produits dans le redux depuis la BDD s'il est vide
        if(props.products.list.length===0){
            getProducts()
            .then(productsDB => {
                props.loadProducts(productsDB)
                setProducts(productsDB)
            })
        } else {
            setProducts(props.products.list)
        }
        
        getAllProductCat()
        .then(categoriesDB => {
            setCategories(categoriesDB)
            for(let i = 0; i < categoriesDB.length; i++){
                setFilters(filters => [...filters, {name:categoriesDB[i].label, id: categoriesDB[i].id, isChecked: false}])
            }
        })

        setBasket(getBasket())
        
        //Suppression de l'avertissement des problèmes de dépendances UNIQUEMENT dans le cas d'un équivalent du ComponentDidMount()
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    //A chaque changement de l'état de basket
    useEffect(() => {
        setDisplayedBasket([])
        for(let i = 0; i < basket.length; i ++){
            getOneProduct(basket[i].productId)
            .then((product) => {
                let productAmount = (basket[i].quantity * product.price/1000).toFixed(2)
                
                setTotalAmount(totalAmount => totalAmount + parseFloat(productAmount))
                setDisplayedBasket(displayedBasket => [...displayedBasket,
                    <article className="aside-basket-item" key={i}>
                        <section className="aside-basket-item-pict">
                            <img src={config.product_pict_url + product.pict_url} alt={"illustration"+product.id} />
                        </section>
                        <section className="aside-basket-item-infos">
                            <Link className="general-link" to={"/shop/products/"+basket[i].productId}><p><span>{product.name}</span></p></Link>
                            <section>
                                <p>{basket[i].quantity} g</p>
                                <p><span>{productAmount} €</span></p>
                            </section>
                        </section>
                    </article>])
            })
        }
    }, [basket])

    //Au click sur les checkboxes, on inverse la valeur checked
    const handleCheck = (e) => {
        filters[filters.findIndex(checkbox => checkbox.name === e.target.name)].isChecked = !filters[filters.findIndex(checkbox => checkbox.name === e.target.name)].isChecked
        setDataRefreshNeeded(true)
    } 

    //Filtrage des résultats
    const filterProducts = () => {
        if(dataRefreshNeeded){
            let datas = {}
            if(userSearchValue){
                datas = {user_search_value: userSearchValue}
                
            } else {
                let selectedCategories = []
                for(let i = 0; i < filters.length; i++){
                    if(filters[i].isChecked){
                        selectedCategories.push(filters[i].id)
                    }
                }
                datas = {categories : selectedCategories}
            }
            
            getProducts(datas)
                .then(productsDB => {
                    props.loadProducts(productsDB)
                    setProducts(productsDB)
                    setDataRefreshNeeded(false)
                })
        }
        
    }

    //Fonction d'affichage du panier
    const showDisplayedBasket = () => {

        return (<section className="aside-basket">
                        <section className="aside-basket-header">
                            <p>Panier</p>
                        </section>
                        <section className="aside-basket-content">
                            {displayedBasket}
                        </section>
                        <section className="aside-basket-footer">
                            <p className="aside-basket-total-amount">Total : <span>{totalAmount.toFixed(2)} €</span></p>
                            <Button variant="contained" color="primary" component={Link} to="/shop/basket">Voir mon panier</Button>
                        </section>
                    </section>)
    }

    return(
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
            <section className="shop-container">
                

                {/** Boutique */}
                <section className="shop-content-container">
                    <section className="shop-content-header">
                        <p>{products && products.length + " résultat(s)"}</p>
                    </section>
                    <section className="shop-content">
                        
                        {products &&  products.map((product, index) => {
                            return(
                                <article key={index} className="shop-content-item">
                                    <section className="shop-content-item-infos-container">
                                        <section className="shop-content-item-pict">
                                            <img src={config.product_pict_url + product.pict_url} alt={"illustration"+index}/>
                                        </section>
                                        <section className="shop-content-item-infos-text">
                                            <article>
                                                <p className="shop-content-item-category">{product.category}</p>
                                                <p className="shop-content-item-name">{product.name}</p>
                                            </article>
                                            
                                            <p className="shop-content-item-desc">{product.description}</p>
                                            <p className="shop-content-item-price">{product.price} €/Kg</p>
                                            <Button color="primary" variant="contained" className={classes.addToBasket} component={Link} to={"/shop/products/"+product.id}><AddShoppingCartIcon /></Button>
                                        </section>
                                    </section>
                                    
                                </article>
                            )
                        })}
                    </section>
                </section>

                {/* Menu latéral*/}
                <aside className="shop-aside">
                    <section className="aside-searchbox">
                        <FormControl className="searchbox-formcontrol">
                            <TextField type="search"
                                        variant="filled" 
                                        className={classes.margin}
                                        label="Rechercher un produit"
                                        InputLabelProps={{style : {color : "#B4B4B4"}}}
                                        value={userSearchValue}
                                        onChange={(e) => {setUserSearchValue(e.target.value)
                                                          setDataRefreshNeeded(true)}}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <SearchIcon />
                                                </InputAdornment>
                                            ),
                                            }}/>
                        </FormControl>
                        
                    </section>

                    {/**Catégories de produits */}
                    <section className="aside-categories">
                        <section className="aside-categories-header">
                            <p>Catégories</p>
                        </section>
                        <section className="aside-categories-content">
                            <FormGroup className={classes.categories}>
                                {categories && categories.map((category) => {
                                    return(<FormControlLabel 
                                        control={<Checkbox name={category.label} color="primary" onChange={(e) => {handleCheck(e)}}/>}
                                        label={category.label}
                                        key={category.id}
                                        
                                    />)
                                })}
                                
                            </FormGroup>
                            <Button variant="contained" color="primary" className={classes.filterButton} onClick={(e) => {filterProducts()}}>Filtrer</Button>
                        </section>
                    </section>

                    {/** Panier*/}
                    {basket.length > 0 && showDisplayedBasket()}

                </aside>
            </section>
            <Footer />
        </section>
    )
}

const mapStateToProps = (store) => {
    return {
        products: store.products
    }
}

const mapDispatchToProps = {
    loadProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)