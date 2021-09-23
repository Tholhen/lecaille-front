    import React, {useState, useEffect} from "react"
    import {getOneUser, updateUser, updatePassword, updateUserRole, getAllRoles} from "../../api/user"
    import {config} from "../../config/config"

    //Imports des composants de l'UI externes
    import Header from "../headers/header"
    import HeaderPages from "../headers/headerPages"
    import Footer from "../footer"
    import AdminMenu from "../../components/adminMenu"

    //Imports depuis la librairie MaterialUI
    import { Button } from '@material-ui/core';
    import TextField from '@material-ui/core/TextField';
    import FormHelperText from '@material-ui/core/FormHelperText';
    import FormControl from '@material-ui/core/FormControl';
    import InputLabel from '@material-ui/core/InputLabel';
    import NativeSelect from '@material-ui/core/NativeSelect';
    import {makeStyles } from "@material-ui/styles";
    import AccountCircleIcon from '@material-ui/icons/AccountCircle';
    import MailIcon from '@material-ui/icons/Mail'

    const AdminUserEdit = (props) => {
        
        const headerTitle = "Administration"
        const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value:"Administration", link:"/admin"},{value: "Utilisateurs", link:"/admin/users"},{value: "Edition", link:null}]

        const [firstName, setFirstName] = useState("")
        const [firstNameError, setFirstNameError] = useState(false)
        const [firstNameErrorText, setFirstNameErrorText] = useState("")
        

        const [lastName, setLastName] = useState("")
        const [lastNameError, setLastNameError] = useState(false)
        const [lastNameErrorText, setLastNameErrorText] = useState("")

        const [email, setEmail] = useState("")
        const [emailError, setEmailError] = useState(false)
        const [emailErrorText, setEmailErrorText] = useState("")

        const [password, setPassword] = useState("")
        const [passwordUpdated, setPasswordUpdated] = useState(false)

        const [phone, setPhone] = useState("")
        const [phoneError, setPhoneError] = useState(false)
        const [phoneErrorText, setPhoneErrorText] = useState("")

        const [address, setAddress] = useState("")
        const [zip, setZip] = useState("")
        const [city, setCity] = useState("")


        const [displayedSelect, setDisplayedSelect] = useState("")
        const [idSelectedRole, setIdSelectedRole] = useState("")
        const [newRole, setNewRole] = useState(0)
        
        //Définition du style MaterialUI
        const useStyles = makeStyles((theme) => ({
            margin: {
                margin: theme.spacing(1),
                width: "90%"
            },
        }));

        const classes = useStyles();

        //Au chargement de la page
        useEffect(() => {
            getOneUser(props.match.params.id)
            .then((user) => {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
                setPhone(user.phone)
                setAddress(user.address)
                setZip(user.zip)
                setCity(user.city)
                setNewRole(user.id_role)
                setIdSelectedRole(user.id_role)

                getAllRoles()
                .then(rolesDB => {
                    setDisplayedSelect(
                        <FormControl>
                            <InputLabel shrink={true}>Rôle</InputLabel>
                            <NativeSelect
                            name="role"
                            className=""
                            textfieldprops={{
                                label: "Label",
                                InputLabelProps: {shrink:true}
                            }}
                            onChange={(e) => {
                                setNewRole(e.target.value)
                            }}
                            defaultValue={user.id_role}>
                                {rolesDB.data.result.map((role) => {
                                        return(<option value={role.id} key={role.id}>{role.label}</option>)
                                })}
                            </NativeSelect>
                        </FormControl>
                    )
                })
            })
        }, [props.match.params.id])

        //Vérification avant soumission du formulaire
        const globalVerify = () => {

            if(!firstName){
                setFirstNameError(true)
                setFirstNameErrorText("Prénom non renseigné")
            }
            else {
                setFirstNameError(false)
                setFirstNameErrorText("")
            }

            if(!lastName){
                setLastNameError(true)
                setLastNameErrorText("Nom non renseigné")
            }
            else {
                setLastNameError(false)
                setLastNameErrorText("")
            }
            if(!email){
                setEmailError(true)
                setEmailErrorText("Adresse email non renseignée")
            }
            else {
                if(!email.match(config.emailRegEx)){
                    setEmailError(true)
                    setEmailErrorText("Adresse email non valide")
                }
                else {
                    setEmailError(false)
                    setEmailErrorText("")
                }
            }
            if(password !== ""){
                setPasswordUpdated(true)
            }
            else{
                setPasswordUpdated(false)
            }
            if(!phone){
                setPhoneError(true)
                setPhoneErrorText("N° de téléphone non renseigné")
            }
            else{
                if(!phone.match(config.phoneRegEx)){
                    setPhoneError(true)
                    setPhoneErrorText("N° de téléphone incorrect")
                }
                else {
                    setPhoneError(false)
                    setPhoneErrorText("")
                }
            }

            //Si tous les champs sont bons, on enregistre l'utilisateur
            if(firstName && lastName && email && phone && phone.match(config.phoneRegEx) && email.match(config.emailRegEx)){
                
                let datas = {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    address: address,
                    zip: zip,
                    city: city
                }    

                updateUser(datas, props.match.params.id)
                .then(responseUpdateUser => {
                    if(responseUpdateUser.data.status === 200){
                        console.log("Succès de la mise à jour utilisateur")
                        if(passwordUpdated){
                            let datasPassword = {
                                password: password
                            }
                            updatePassword(datasPassword, props.match.params.id)
                            .then(responsePassword => { 
                                if(responsePassword.data.status === 200){
                                    console.log("Succès de la mise à jour du mot de passe")
                                }
                                else {
                                    console.log("Erreur lors de la mise à jour du mot de passe")
                                }
                            })
                        }
                        if(parseInt(newRole) !== idSelectedRole){
                            let datas = {
                                id_role: newRole
                            }
                            updateUserRole(datas, props.match.params.id)
                            .then(responseRole => {
                                if(responseRole.status === 200){
                                    console.log("Succès de la mise à jour du rôle")
                                } else {
                                    console.log("Erreur lors de la mise à jour du rôle")
                                }
                            })
                        }

                        
                    }
                    else {
                        console.log("Erreur lors de la mise à jour de l'utilisateur")
                    }
                })
                
            }
            
        }

        const onSubmit = () => {
            globalVerify()
        }

        return(
            <section className="root">
                    <Header />
                    <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
                    <section className="admin-container">
                        <AdminMenu />

                        <section className="admin-content">
                            <h4>Edition d'un utilisateur</h4>
                            <section className="user-edit-container">
                                <form className="admin-user-edit">
                                    <section className="user-edit-informations">
                                        <section className="user-edit-header">
                                            <p><AccountCircleIcon /></p>
                                            <p className="admin-content-section-title">Informations personnelles</p>
                                        </section>
                                        <section className="user-edit-informations-content">
                                            <FormControl error className={classes.margin}>
                                                <TextField label="Nom" color="primary" required onChange={(e) => {setLastName(e.target.value)}} error={lastNameError} value={lastName || ""} variant="filled"/>
                                                <FormHelperText>{lastNameErrorText}</FormHelperText>
                                            </FormControl>

                                            <FormControl error className={classes.margin}>
                                                <TextField label="Prénom" color="primary"  required onChange={(e) => {setFirstName(e.target.value)}} error={firstNameError} value={firstName || ""} variant="filled"/>
                                                <FormHelperText>{firstNameErrorText}</FormHelperText>
                                            </FormControl>

                                            <FormControl error className={classes.margin}>
                                                <TextField label="Mot de passe" color="primary" onChange={(e) => {setPassword(e.target.value)
                                                e.target.value ? setPasswordUpdated(true) : setPasswordUpdated(false)}} type="password" defaultValue="" variant="filled"/>
                                            </FormControl>

                                            {displayedSelect}
                                        </section>
                                    </section>
                                    <section className="user-edit-contact">
                                        <section className="user-edit-header">
                                            <p><MailIcon /></p>
                                            <p className="admin-content-section-title">Contact</p>
                                        </section>
                                        <section className="user-edit-contact-content">
                                            
                                                <FormControl error className={classes.margin} >
                                                    <TextField label="Email" color="primary" required onChange={(e) => {setEmail(e.target.value)}} error={emailError} type="email" value={email || ""} variant="filled"/>
                                                    <FormHelperText>{emailErrorText}</FormHelperText>
                                                </FormControl>

                                                <FormControl error className={classes.margin}>
                                                    <TextField label="Téléphone" color="primary" required  error={phoneError} type="tel" value={phone || ""
                                                    } onChange={(e) => {setPhone(e.target.value)}} variant="filled"/>
                                                    <FormHelperText>{phoneErrorText}</FormHelperText>
                                                </FormControl>

                                                <FormControl error className={classes.margin}>
                                                    <TextField label="Adresse" color="primary" onChange={(e) => {setAddress(e.target.value)}} value={address || ""} variant="filled"/>
                                                </FormControl>

                                                <FormControl error className={classes.margin}>
                                                    <TextField label="Code Postal" color="primary" onChange={(e) => {setZip(e.target.value)}} value={zip || ""} variant="filled"/>
                                                </FormControl>

                                                <FormControl error className={classes.margin}>
                                                    <TextField label="Ville" color="primary" onChange={(e) => {setCity(e.target.value)}} value={city || ""} variant="filled"/>
                                                </FormControl>

                                                
                                        </section>
                                        <Button className="admin-user-edit-button" color="primary" variant="contained" onClick={(e)=>{onSubmit()}}>
                                                    Envoyer
                                                </Button>
                                    </section>                          
                                </form>
                            </section>

                        </section>
                    </section>
                    <Footer />
            </section>
        )
    }

    export default AdminUserEdit