import React, {useState, useEffect} from "react"
import {Redirect} from "react-router-dom"

import {getAllProductCat,saveProduct, saveProductPict} from "../../api/products"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

//Imports de la librairie MaterialUI
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';

import {makeStyles } from "@material-ui/styles";

const AdminProductAdd = (props) => {

    const headerTitle = "Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"},{value: "Produits", link:"/admin/products"},{value: "Ajout", link:null}]

    const [productName, setProductName] = useState("")
    const [productNameError, setProductNameError] = useState(false)
    const [productNameErrorMsg, setProductNameErrorMsg] = useState("")

    const [productPrice, setProductPrice] = useState("")
    const [productPriceError, setProductPriceError] = useState(false)
    const [productPriceErrorMsg, setProductPriceErrorMsg] = useState("")

    const [productDesc, setProductDesc] = useState("")
    
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [categoryError, setCategoryError] = useState(false)
    const [categoryErrorMsg, setCategoryErrorMsg] = useState("")

    const [selectedFile, setSelectedFile] = useState("")
    const [filePreview, setFilePreview] = useState("")
    const defaultPict = "no-pict.png"

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

    //Au chargement de la page
    useEffect(() => {
        getAllProductCat()
        .then(categoriesDB => {
            setCategories(categoriesDB)
        })
    }, [])


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
            let datas = {
                name: productName,
                price: productPrice,
                description: productDesc,
                pict_url: defaultPict,
                id_product_category: selectedCategory
            }
            //S'il n'y a pas de fichier sélectionné
            if(!selectedFile){
                saveProduct(datas)
                setRedirect(true)
            }
            else {
                saveProductPict(selectedFile)
                .then(response => {
                    datas.pict_url = response.data.url
                    saveProduct(datas)
                    setRedirect(true)
                })  
            }
        }
    }

    return(
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
            <section className="admin-container">
                    <AdminMenu />
 
                    <section className="admin-content">
                        <h4>Ajout d'un produit</h4>
                        <section className="product-add-edit-container">
                            <form className="product-add-edit-form">
                                <FormControl error className={classes.formControl}>
                                    <TextField label="Nom" required onChange={(e) => {setProductName(e.target.value)}} error={productNameError} variant="filled"/>
                                    <FormHelperText>{productNameErrorMsg}</FormHelperText>
                                </FormControl>

                                <FormControl error className={classes.formControl}>
                                    <TextField label="Description" multiline rows={8} onChange={(e) => {setProductDesc(e.target.value)}} variant="filled"/>
                                </FormControl>
                                
                                <FormControl error className={classes.formControl}>
                                    <TextField label="Prix" type="number" onChange={(e) => {setProductPrice(e.target.value)}} InputProps={{
                                        endAdornment: <InputAdornment position="start">€/Kg TTC</InputAdornment>,
                                    }} error={productPriceError} variant="filled"/>
                                    <FormHelperText>{productPriceErrorMsg}</FormHelperText>
                                </FormControl>
                                
                                <FormControl error className={classes.formControl}>
                                    <InputLabel shrink={true} error={categoryError}>Catégorie</InputLabel>
                                    <NativeSelect
                                        name="catégorie"
                                        onChange={(e) => {setSelectedCategory(e.target.value)}} error={categoryError}>
                                            <option value={0}>--</option>
                                            {categories.map((category) => {
                                                return(<option value={category.id} key={category.id}>{category.label}</option>)
                                            })}
                                    </NativeSelect>
                                    <FormHelperText>{categoryErrorMsg}</FormHelperText>
                                </FormControl>

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
                            {selectedFile &&<img className="product-add-file-preview" src={filePreview} alt="Prévisualisation du fichier"/>}
                                
                            <Button variant="contained" color="primary" className={classes.margin} onClick={(e) => {handleSubmit()}}>Enregistrer</Button>
                        </section>
                    </section>
                    {redirect && <Redirect to="/admin/products" />}
                </section>
            <Footer />
        </section>
        
    )
}

export default AdminProductAdd