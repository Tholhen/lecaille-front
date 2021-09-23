import axios from "axios"
import {config} from "../config/config"
import tokenConfig from "../config/tokenConfig"

//Enregistrement d'un utilisateur
export const saveUser = (datas) => {

    return axios.post(config.api_url + "/user/register", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })
}

//Connexion d'un utilisateur
export const loginUser = (datas) => {

    return axios.post(config.api_url + "/user/login", datas)
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })
}

//Récupération de tous les utilisateurs
export const getAllUsers = () => {

    return axios.get(config.api_url + "/user/all", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err)
    })
} 

//Récupération d'un utilisateur
export const getOneUser = (id) => {
    
    return axios.get(config.api_url + "/users/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response.data.user[0]
    })
    .catch(err => console.log(err))
}

//Mise à jour d'un utilisateur
export const updateUser = (datas, id) => {
    return axios.put(config.api_url + "/users/update/"+id, datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err =>  console.log("err",err))
}

//Mise à jour du mot de passe de l'utilisateur
export const updatePassword = (datas, id) => {
    return axios.put(config.api_url + "/users/update/password/"+id, datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => console.log(err))
}

//Mise à jour du rôle de l'utilisateur
export const updateUserRole = (datas, id) => {
    
    return axios.put(config.api_url + "/users/update/role/"+id, datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => console.log(err))
}

//Récupération de tous les roles
export const getAllRoles = () => {
    return axios.get(config.api_url +"/users/roles/all", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => console.log(err))
}

//Suppression d'un utilisateur
export const deleteUser = (id) => {
    return axios.delete(config.api_url + "/users/delete/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err)
    })
}