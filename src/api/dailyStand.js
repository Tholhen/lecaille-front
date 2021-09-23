import axios from "axios"
import {config} from "../config/config"
import tokenConfig from "../config/tokenConfig"

/*********************/
/* GESTION DE L'ETAL */
/*********************/

//Récupération de l'étal du jour
export const getDailyStand = () => {
    return axios.get(config.api_url + "/shop/dailystand")
    .then((response) => {
        return response.data.result[0]
    })
    .catch(err => console.log(err))
}

//Enregistrement de l'étal du jour
export const saveDailyStand = (datas) => {
    return axios.post(config.api_url + "/shop/dailystand/save", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response
    })
    .catch(err => console.log(err))
}

//Suppression de l'étal du jour
export const deleteDailyStand = () => {
    return axios.delete(config.api_url + "/shop/dailystand/delete", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response
    })
    .catch(err => console.log(err))
}

//Mise à jour de l'étal du jour
export const updateDailyStand = (datas) => {
    return axios.put(config.api_url + "/shop/dailystand/update", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response
    })
    .catch(err => console.log(err))
}

/*********************************/
/* GESTION DES DETAILS DE L'ETAL */
/*********************************/

//Récupération des détails de l'étal du jour
export const getDailyStandDetails = () => {
    return axios.get(config.api_url + "/shop/dailystand/details")
    .then((response) => {
        return response.data.result
    })
    .catch(err => console.log(err))
}

//Enregistrement des détails de l'étal du jour
export const saveDailyStandDetail = (datas) => {
    return axios.post(config.api_url + "/shop/dailystand/detail/save", datas, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response
    })
    .catch(err => console.log(err))
}

//Enregistrement de la photo du détail de l'étal du jour
export const saveDailyStandDetailPict = (fileDatas) => {
    let formData = new FormData()
    formData.append('image', fileDatas)

    return axios({method: "post",
                  url: config.api_url + "/shop/dailystand/pict",
                  data: formData,
                  headers: {
                      "Content-Type":"multipart/form-data",
                      "x-access-token":localStorage.getItem(tokenConfig.token.name)
                  }})
                .then(response => {return response})
                .catch(err => {console.log(err)})
}

//Suppression du détail de l'étal du jour
export const deleteDailyStandDetail = (id) => {
    return axios.delete(config.api_url + "/shop/dailystand/detail/delete/"+id, {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response
    })
    .catch(err => console.log(err))
}

//Suppression de tous les détails de l'étal du jour
export const clearDailyStandDetails = () => {
    return axios.delete(config.api_url + "/shop/dailystand/details/clear", {headers: {"x-access-token": localStorage.getItem(tokenConfig.token.name)}})
    .then((response) => {
        return response
    })
    .catch(err => console.log(err))
}