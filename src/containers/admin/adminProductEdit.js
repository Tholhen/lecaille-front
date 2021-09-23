import React, {useState, useEffect} from "react"
import {Redirect} from "react-router-dom"

import {config} from "../../config/config"
import {getOneProduct, getAllProductCat,updateProduct, saveProductPict} from "../../api/products"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

//Import des composants de la librairie MaterialUI
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';

import {makeStyles } from "@material-ui/styles";

const AdminProductEdit = (props) => {

    const headerTitle = "Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"},{value: "Produits", link:"/admin/products"},{value: "Edition", link:null}]

    const [productName, setProductName] = useState("")
    const [productNameError, setProductNameError] = useState(false)
    const [productNameErrorMsg, setProductNameErrorMsg] = useState("")

    const [productPrice, setProductPrice] = useState("")
    const [productPriceError, setProductPriceError] = useState(false)
    const [productPriceErrorMsg, setProductPriceErrorMsg] = useState("")

    const [productDesc, setProductDesc] = useState("")
    

    const [selectedCategory, setSelectedCategory] = useState(0)
    const [categoryError, setCategoryError] = useState(false)
    const [categoryErrorMsg, setCategoryErrorMsg] = useState("")
    const [displayedSelect, setDisplayedSelect] = useState("")

    const [selectedFile, setSelectedFile] = useState("")
    const [filePreview, setFilePreview] = useState("")
    const [defaultPict, setDefaultPict] = useState("no-pict.png")

    const [redirect, setRedirect] = useState(false)

    //Définition du style MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1)
        },
        formControl: {
            margin: theme.spacing(1),
            width: "90%"
        }
        }));
        
    const classes = useStyles();

    
    useEffect(() => {
        getOneProduct(props.match.params.id)
        .then(response => {
            setProductName(response.name)
            setProductDesc(response.description)
            setProductPrice(response.price)
            if(response.pict_url){
                setDefaultPict(response.pict_url)
                setFilePreview(config.product_pict_url + response.pict_url)
            }
            setSelectedCategory(response.id_product_category)
            getAllProductCat()
            .then(categoriesDB => {
                setDisplayedSelect(
                <FormControl error>
                    <InputLabel shrink={true} error={categoryError}>Catégorie</InputLabel>
                    <NativeSelect
                        onChange={(e) => {setSelectedCategory(e.target.value)}} error={categoryError} defaultValue={response.id_product_category}>
                            {categoriesDB.map((category) => {
                                return(<option value={category.id} key={category.id} >{category.label}</option>)
                            })}
                    </NativeSelect>
                    <FormHelperText>{categoryErrorMsg}</FormHelperText>
                </FormControl>)
            })
        })
        
    }, [props.match.params.id,categoryError,categoryErrorMsg])


    const handleSubmit = () => {

        //Vérification de la bonne saisie du formulaire
        if(!productName) {
            setProductNameError(true)
            setProductNameErrorMsg("Veuillez saisir une dénomination")
        }
        else{
            setProductNameError(false)
            setProductNameErrorMsg("")
        }

        if(!productPrice) {
            setProductPriceError(true)
            setProductPriceErrorMsg("Veuillez saisir un prix")
        }
        else{
            setProductPriceError(false)
            setProductPriceErrorMsg("")
        }

        if(selectedCategory === 0){
            setCategoryError(true)
            setCategoryErrorMsg("Veuillez sélectionner une catégorie")
        }
        else{
            setCategoryError(false)
            setCategoryErrorMsg("")
        }

        //Si les données ont bien été saisies
        if(selectedCategory !== 0 && productName && productPrice){
            //Construction du prototype à enregistrer
            let datas = {
                name: productName,
                price: productPrice,
                description: productDesc,
                pict_url: defaultPict,
                id_product_category: selectedCategory
            }
            //S'il n'y a pas de fichier sélectionné
            if(!selectedFile){
                updateProduct(props.match.params.id, datas)
                setRedirect(true)
            }
            else {
                saveProductPict(selectedFile, datas)
                .then(response => {
                    datas.pict_url = response.data.url
                    updateProduct(props.match.params.id, datas)
                    setRedirect(true)
                })  
            }
        }
    }

    const showSelect = () => {
        return(<div>
            {displayedSelect}
        </div>)
    }

    return(
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
            <section className="admin-container">
                    <AdminMenu />
 
                    <section className="admin-content">
                        <h4>Edition du produit</h4>
                        <section className="product-add-edit-container">
                            <form className="product-add-edit-form">
                                <FormControl error className={classes.formControl}>
                                    <TextField label="Nom" required onChange={(e) => {setProductName(e.target.value)}} error={productNameError} value={productName} variant="filled"/>
                                    <FormHelperText>{productNameErrorMsg}</FormHelperText>
                                </FormControl>

                                <FormControl error className={classes.formControl}>
                                    <TextField label="Description" multiline rows={8} onChange={(e) => {setProductDesc(e.target.value)}} value={productDesc} variant="filled"/>
                                </FormControl>
                                
                                <FormControl error className={classes.formControl}>
                                    <TextField label="Prix" type="number" onChange={(e) => {setProductPrice(e.target.value)}} InputProps={{
                                        endAdornment: <InputAdornment position="start">€/Kg TTC</InputAdornment>,
                                    }} error={productPriceError} value={productPrice} variant="filled"/>
                                    <FormHelperText>{productPriceErrorMsg}</FormHelperText>
                                </FormControl>
                                
                                {showSelect()}

                                <FormControl className={classes.formControl}>
                                    <input 
                                    accept="images/*"
                                    style={{display: 'none'}}
                                    id="file-select"
                                    type="file"
                                    onChange={(e) => {setSelectedFile(e.target.files[0])
                                                        if(e.target.files.length > 0) {
                                                            setFilePreview(URL.createObjectURL(e.target.files[0]))
                                                        }
                                                        else {
                                                            setFilePreview("")
                                                        }
                                                    }}
                                    />
                                    <label htmlFor="file-select">
                                        <Button color="primary" component="span" className={classes.margin}>Ajouter une photo</Button>
                                        
                                    </label>
                                    
                                </FormControl>
                                
                            </form>
                            
                            {selectedFile && selectedFile.name}
                            <img className="product-add-file-preview" src={filePreview} alt="Prévisualisation du fichier"/>
                                
                            <Button variant="contained" color="primary" className={classes.margin} onClick={(e) => {handleSubmit()}}>Enregistrer</Button>
                        </section>
                    </section>
                    {redirect && <Redirect to="/admin/products" />}
                </section>
            <Footer />
        </section>
        
    )
}

export default AdminProductEdit