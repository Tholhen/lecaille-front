import axios from "axios"
import {config} from "../config/config"
import tokenConfig from "../config/tokenConfig"

//Enregistrement d'un avis
export const saveShopOpinion = (datas) => {
    return axios.post(config.api_url + "/shop/opinion/save", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => {console.log(err)})
}

//Enregistrement de la photo d'un avis
export const saveShopOpinionPict = (fileDatas) => {
    
    let formData = new FormData()
    formData.append("image", fileDatas)

    return axios({method: "post",
                  url: config.api_url + "/shop/opinion/pict",
                  data: formData,
                  headers: {
                      "Content-Type":"multipart/form-data",
                      "x-access-token":localStorage.getItem(tokenConfig.token.name)
                  }})
                .then(response => {return response})
                .catch(err => {console.log(err)})
}

//Suppression d'un avis
export const deleteOpinion = (id) => {
    return axios.delete(config.api_url + "/shop/opinion/delete/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response
    })
    .catch(err => { console.log(err)})
}

//Récupération de tous les avis
export const getAllShopOpinions = () => {
    return axios.get(config.api_url + "/shop/opinions/all", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then(response => {
        return response.data.result
    })
    .catch(err => console.log(err))
}

//Récupération des X derniers avis
export const getLatestShopOpinions = (limit) => {
    return axios.get(config.api_url + "/shop/opinions/latest/"+limit)
    .then(response => {
        return response.data.result
    })
    .catch(err => {console.log(err)})
}

//Récupération d'un avis