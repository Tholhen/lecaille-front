import axios from "axios"
import {config} from "../config/config"
import tokenConfig from "../config/tokenConfig"

/*************************/
/* GESTION DES COMMANDES */
/*************************/

//Récupération de toutes les commandes
export const getAllRequests = () => {
    return axios.get(config.api_url + "/requests", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response.data.result
    })
    .catch(err => console.log(err))
}

//Récupération des commandes d'un client
export const getAllRequestsByCustomer = (id) =>{
    return axios.get(config.api_url + "/requests/customer/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response.data.result
    })
    .catch(err => console.log(err))
}

//Récupération d'une commande
export const getOneRequest = (id) => {
    return axios.get(config.api_url + "/request/"+id,{headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response.data.result[0]
    })
    .catch(err => console.log(err))
}

//Sauvegarde d'une commande
export const saveRequest = (datas) => {
    return axios.post(config.api_url + "/request/save", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response.data.result
    })
    .catch(err => console.log(err))
}

//Suppression d'une commande
export const deleteRequest = (id) => {
    return axios.delete(config.api_url + "/request/delete/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response
    })
    .catch(err => console.log(err))
}

//Mise à jour du status de préparation


/*************************************/
/* GESTION DES DETAILS DES COMMANDES */
/*************************************/

//Récupération de toutes les lignes d'une commande
export const getAllRequestDetails = (id) => {
    return axios.get(config.api_url +"/request/"+id+"/details", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response.data.result
    })
    .catch(err => console.log(err))
}

//Sauvegarde d'une ligne de commande
export const saveRequestDetails = (id_request, datas) => {
    return axios.post(config.api_url +"/request/"+id_request+"/details/save", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response.data.result
    })
    .catch(err => console.log(err))
}

/*************************************/
/* GESTION DES STATUTS DES COMMANDES */
/*************************************/

//Récupération de tous les status de commande existants
export const getAllRequestsStatus = () => {
    return axios.get(config.api_url + "/requests/status/all", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response.data.result
    })
    .catch(err => console.log(err))

}

//Mise à jour du statut d'une commande
export const updateRequestStatus = (datas) => {
    return axios.put(config.api_url + "/request/" + datas.id_request + "/status/update", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => console.log(err))
}