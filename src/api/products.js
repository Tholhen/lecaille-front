import axios from "axios"
import {config} from "../config/config"
import tokenConfig from "../config/tokenConfig"


//Récupération du nombre de variétés de poissons
export const getFishesCount = () => {
    
    return axios.get(config.api_url+"/products/allfishes/count")
    .then(response => {
        return response.data.result[0].fishes_count;
    })
    .catch(err => { console.log(err)})
}

//Récupération du nombre de variétés de crustacés
export const getCrustaceansCount = () => {
    return axios.get(config.api_url+"/products/allcrustaceans/count")
    .then(response => {
        return response.data.result[0].crustaceans_count
    })
    .catch(err => { console.log(err)})
}

//Récupération d'un produit
export const getOneProduct = (id) => {
    return axios.get(config.api_url+"/product/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response.data.result[0]
    })
    .catch(err => {console.log(err)})
}

//Récupération des produits en fonction des catégories choisies
export const getProducts = (datas = null) => {
    return axios.post(config.api_url + "/products/", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response.data.result
    })
    .catch(err => {console.log(err)})
}

//Enregistrement d'un produit
export const saveProduct = (datas) => {
    return axios.post(config.api_url + "/product/save", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => {console.log(err)})
}

//Enregistrement de la photo d'un produit
export const saveProductPict = (fileDatas) => {
    let formData = new FormData()
    formData.append('image', fileDatas)

    return axios({method: "post",
                  url: config.api_url + "/product/pict",
                  data: formData,
                  headers: {
                      "Content-Type":"multipart/form-data",
                      "x-access-token":localStorage.getItem(tokenConfig.token.name)
                  }})
                .then(response => {return response})
                .catch(err => {console.log(err)})
}

//Mise à jour d'un produit
export const updateProduct = (id, datas) => {
    return axios.put(config.api_url + "/product/update/" + id, datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => console.log(err))
}

//Récupération de toutes les catégories de produit
export const getAllProductCat = () => {
    return axios.get(config.api_url + "/products/categories/all", {headers: {"x-access-token":localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response.data.result
    })
    .catch(err => {console.log(err)})
}

//Suppression d'un produit
export const deleteProduct = (id) => {
    return axios.delete(config.api_url + "/product/delete/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => {console.log(err)})
}