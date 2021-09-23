import React, {useState} from 'react'
import {connect} from "react-redux"

import {saveShopOpinion, saveShopOpinionPict} from "../api/shopOpinions"


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles } from "@material-ui/styles";



const ShopOpinionPopUp = (props) => {

    //Définition des variables
    const [opinion, setOpinion] = useState("")
    const [opinionError, setOpinionError] = useState(false)
    const [opinionErrorMsg, setOpinionErrorMsg] = useState("")

    const [selectedFile, setSelectedFile] = useState("")
    const [filePreview, setFilePreview] = useState("")

    //Définition des styles MaterialUI
    const useStyles = makeStyles((theme) => ({
        margin:{
            marginTop: theme.spacing(2)
        }
        }));
        
    const classes = useStyles();

    const onSubmit = () =>{
        
       if(!opinion){
           setOpinionError(true)
           setOpinionErrorMsg("Veuillez saisir votre message")
       }
       else{
            setOpinionError(false)
            setOpinionErrorMsg("")
       }

       
       if(opinion){
            let datas = {
                id_user: props.user.infos.id,
                comment: opinion,
                pict_url:""
            }

            if(selectedFile){
                saveShopOpinionPict(selectedFile)
                .then(response => {
                    datas.pict_url = response.data.url
                    saveShopOpinion(datas)
                    props.closeShopOpinionPopUp()
                    props.openShopOpinionSnackbar()
                })
                
            } else {
                saveShopOpinion(datas)
                props.closeShopOpinionPopUp()
                props.openShopOpinionSnackbar()
            }
       }
    }

    return(
        <Dialog
            open={props.opened}
            onClose={(e) => {props.closeShopOpinionPopUp()}}
        >
            <DialogTitle>Votre avis compte pour nous !</DialogTitle>
            <DialogContent>
                <form className="shop-opinion-popup-form">
                    <FormControl error>
                    <TextField variant="filled" 
                                label="Avis"
                                required
                                multiline rows={10}
                                error={opinionError}
                                onChange={(e) => {setOpinion(e.target.value)}}/>
                        <FormHelperText>{opinionErrorMsg}</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
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
                            <Button color="primary" component="span">Ajouter une photo</Button>
                        </label>
                        <div className="shop-opinion-popup-preview">
                            <img src={filePreview} alt="Prévisualisation du fichier"/>
                            {selectedFile && selectedFile.name}
                        </div>
                    </FormControl>
                    
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={(e) => {props.closeShopOpinionPopUp()}} color="primary">
                Annuler
            </Button>
            <Button onClick={(e) => {onSubmit()}} color="primary" variant="contained">
                Envoyer
            </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ShopOpinionPopUp)