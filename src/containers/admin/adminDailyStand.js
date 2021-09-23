import React, {useState, useEffect} from "react";
import {config} from "../../config/config"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

import {getDailyStand, getDailyStandDetails, saveDailyStand, saveDailyStandDetail, saveDailyStandDetailPict, deleteDailyStand, updateDailyStand, deleteDailyStandDetail, clearDailyStandDetails} from "../../api/dailyStand"

//Imports des composants de la librairie MaterialUI
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete'

const AdminDailyStand = (props) => {

    const headerTitle = "Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"}, {value: "Etal", link:null}]

    const [dailyStand, setDailyStand] = useState({id:"", description:"", creation_timestamp:""})
    const [dailyStandItemsToAdd, setDailyStandItemsToAdd] = useState([])
    const [errorForm, setErrorForm] = useState(false)
    const [dailyStandItemsDisplayed, setDailyStandItemsDisplayed] = useState([])


    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin:{
            margin: theme.spacing(1),
        },
        dailyStandDescription:{
            width:"90%",
            margin: theme.spacing(1)
        }
        }));
        
    const classes = useStyles();

    

    //Au chargement de la page
    useEffect(() => {
        refreshDatas()
    }, [])

    const refreshDatas = () => {
        getDailyStand()
        .then(dailyStandDB => {
            if(dailyStandDB){
                setDailyStand(dailyStandDB)
                
            }
            getDailyStandDetails()
                .then(dailyStandItemsDB => {
                    setDailyStandItemsDisplayed(dailyStandItemsDB)
                })
        })
    }

    //Fonction de suppression d'un élément de l'étal du jour
    const deleteDailyStandItem = (id) => {
        deleteDailyStandDetail(id)
        let newArray = dailyStandItemsDisplayed.filter(item => item.id !== id)
        setDailyStandItemsDisplayed(newArray)
    }

    //Ajout des champs permettant de compléter l'étal du jour
    const addElement = () => {
        setDailyStandItemsToAdd(dailyStandItemsToAdd => [...dailyStandItemsToAdd,
            {pict_url:"",
            description: "",
            filePreview: "",
            selectedFile: ""}])
    }    

    //Initialisation d'un nouveau étal
    const newDailyStand = () => {
        deleteDailyStand()
        clearDailyStandDetails()
        setDailyStand({id:"", description:"", creation_timestamp:""})
        setDailyStandItemsDisplayed([])
        setDailyStandItemsToAdd([])
    }

    //Fonction d'enregistrement de l'étal
    const handleSave = () => {

        //Vérification des données avant enregistrement
        let conformFiles = false
        for(let i = 0; i < dailyStandItemsToAdd.length; i++){
            if(dailyStandItemsToAdd[i].selectedFile){
                conformFiles = true
            }
        }

        if(!conformFiles && !dailyStand.description && dailyStandItemsDisplayed.length === 0){
            setErrorForm(true)
        } else {
            setErrorForm(false)
            let dailyStandDatas = {description: dailyStand.description}
            if(dailyStand.id === ""){
                saveDailyStand(dailyStandDatas)
                .then(responseDailyStand => {
                    setDailyStand({...dailyStand, "id": responseDailyStand.data.result.insertId})
                    if(conformFiles){
                        for(let i = 0; i < dailyStandItemsToAdd.length; i++){
                            if(dailyStandItemsToAdd[i].selectedFile){
                                saveDailyStandDetailPict(dailyStandItemsToAdd[i].selectedFile)
                                .then(responseDailyStandDetailPict => {
                                    let dailyStandDetailDatas = {
                                        description: dailyStandItemsToAdd[i].description,
                                        pict_url: responseDailyStandDetailPict.data.url || "",
                                        id_daily_stand: responseDailyStand.data.result.insertId
                                    }   
                                    saveDailyStandDetail(dailyStandDetailDatas)
                                    .then(response => {
                                        setDailyStandItemsToAdd([])
                                        refreshDatas()
                                    })
                                })
                            }
                        }
                    }
                    
                })
            }
            else {
                updateDailyStand(dailyStandDatas)
                .then(response => {
                    for(let i = 0; i < dailyStandItemsToAdd.length; i++){
                        if(dailyStandItemsToAdd[i].selectedFile){
                            saveDailyStandDetailPict(dailyStandItemsToAdd[i].selectedFile)
                            .then(responseDailyStandDetailPict => {
                                let dailyStandDetailDatas = {
                                    description: dailyStandItemsToAdd[i].description,
                                    pict_url: responseDailyStandDetailPict.data.url  || "",
                                    id_daily_stand: dailyStand.id
                                }
                                saveDailyStandDetail(dailyStandDetailDatas)
                                .then(response => {
                                    setDailyStandItemsToAdd([])
                                    refreshDatas()
                                })
                            })
                        }
                    }
                })
            }
        }
        
    }

    const changeFile = (file, index) => {
        let tempArray = [...dailyStandItemsToAdd]
        tempArray[index].filePreview = URL.createObjectURL(file)
        tempArray[index].selectedFile = file
        setDailyStandItemsToAdd(tempArray)
    }

    return(
        <section className="root">
                <Header />
                <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
                <section className="admin-container">
                    <AdminMenu />
 
                    <section className="admin-content">
                        <h4>Gestion de l'étal du jour</h4>

                        <section className="admin-dailystand-header">
                            <section className="admin-dailystand-interractions">
                                {errorForm && <p>Veuillez saisir une description de l'étal et/ou au moins une image d'illustration</p>}
                                {dailyStand.id !== "" && <Button variant="outlined" color="primary" onClick={(e) => {newDailyStand()}} className={classes.margin}>Nouvel Etal</Button>}
                                <Button variant="outlined" color="primary" onClick={(e) => {addElement()}} className={classes.margin}>Ajouter un élément</Button>
                                <Button variant="contained" color="primary" onClick={(e) => handleSave()} className={classes.margin}>Enregistrer</Button>
                            </section>
                            <FormControl className={classes.dailyStandDescription}>
                                <TextField label="Description de l'étal" multiline rows={8} variant="filled" 
                                onChange={(e) => {setDailyStand({...dailyStand, "description": e.target.value})}}
                                value={dailyStand.description} />
                            </FormControl>
                        </section>

                        

                        <section className="admin-dailystand-content">
                            
                            {dailyStandItemsToAdd.length > 0 && <section className="admin-dailystand-toadd">
                                {dailyStandItemsToAdd.map((dailyStandItemToAdd, index) => {
                                    return(<article key={index}>
                                        <section>
                                            <FormControl>
                                                <input 
                                                accept="images/*"
                                                style={{display: 'none'}}
                                                id={"file-select"+index}
                                                type="file"
                                                onChange={(e) => {changeFile(e.target.files[0], index)}}
                                                />
                                                <label htmlFor={"file-select"+index}>
                                                    <Button color="primary" component="span">Ajouter une photo</Button>
                                                </label>
                                            </FormControl>
                                            {dailyStandItemToAdd.selectedFile && 
                                                <section className="admin-dailystand-filepreview">
                                                    <p>{dailyStandItemToAdd.selectedFile.name}</p>
                                                    <img src={dailyStandItemToAdd.filePreview} alt={"Prévisualistation du fichier" + dailyStandItemToAdd.selectedFile.name} />
                                                </section>}
                                            
                                        </section>
                                        <section>
                                            <FormControl className={classes.dailyStandDescription}>
                                                <TextField label="Description" variant="filled" onChange={(e) => {dailyStandItemToAdd.description = e.target.value}} />
                                            </FormControl>
                                            <p>{dailyStandItemToAdd.description}</p>
                                        </section>

                                    </article> ) 
                                })
                                }
                            </section>}
                            
                            <section className="admin-dailystand-items">
                                {dailyStandItemsDisplayed && dailyStandItemsDisplayed.map((dailyStandItem) => {
                                    return (<article key={dailyStandItem.id}>
                                    <section>
                                        <img src={config.dailystand_detail_pict_url + dailyStandItem.pict_url} alt={"illustration"+dailyStandItem.id}></img>
                                    </section>
                                    
                                    <p>Description : <em>{dailyStandItem.description}</em></p>
                                    
                                    <Button onClick={() => {deleteDailyStandItem(dailyStandItem.id)}}><DeleteIcon /></Button>
                                </article>)
                                })}
                            </section>
                        </section>
                    </section>
                </section>
                <Footer />
        </section>
    )

}

export default AdminDailyStand