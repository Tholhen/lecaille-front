import React, {useState, useEffect} from "react";
import {connect} from "react-redux"
import {loadAllUsers} from "../../actions/users/usersAction"
import {getAllUsers} from "../../api/user"
import {Link} from "react-router-dom"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"
import AdminMenu from "../../components/adminMenu"

//Import des images
import editIcon from "../../assets/icons/edit-blue.svg"
import deleteIcon from "../../assets/icons/delete-blue.svg"

const AdminUsers = (props) => {
    const headerTitle = "Administration"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},{value: "Administration", link:"/admin"},{value: "Utilisateurs", link:null}]
    
    const range = 5
    const [startPoint, setStartPoint] = useState(0)
    const [selectedPage, setSelectedPage] = useState(1)
    
    //Au chargement de la page
    useEffect(() => {
        getAllUsers()
        .then(response => {
            
            props.loadAllUsers(response.data.users)
        })

    }, [props])

    // Affichage des utilisateurs
    const showUsers = () => {
        // Récupération des utilisateurs
        let users = props.users.users
        // Définition de la liste des items affichés
        let items = []
        // Paramètres de la boucle d'affichage
        let loopMin;
        let loopMax;

        // Définition des paramètres pour la boucle d'affichage
        if(users.length - startPoint < range){
          loopMin = startPoint
          loopMax = users.length  
        }
        else {
            loopMin = startPoint
            loopMax = startPoint + range
        }

        // Génération des items pour l'affichage
        for(let i = loopMin; i < loopMax; i++){
            items.push(
                <article className="users-list-item" key={i}>
                    <section className="user-item-name">
                        {users[i].first_name} {users[i].last_name} 
                    </section>
                    <section className="user-item-mail">
                        {users[i].email}
                    </section>
                    <section className="user-item-city">
                        {users[i].zip} {users[i].city} 
                    </section>
                    <section className="edit-delete-user-container">
                        <Link to={"/admin/users/edit/"+users[i].id}><img src={editIcon} alt="Edit icon" className="edit-delete-user"/></Link>
                        <Link to={"/admin/users/delete/"+users[i].id}><img src={deleteIcon} alt="Delete icon" className="edit-delete-user"/></Link>
                    </section>
                </article>
            )
        }

        return(
            <section className="users-list">
                {items}
            </section>
                
        )
    }

    // Au changement de page
    const changePage = (pageNumber) => {
        setSelectedPage(pageNumber)
        if(pageNumber > 1){
            setStartPoint(((pageNumber-1)*range))
        }
        else {
            setStartPoint(0) 
        }
    }
    
    // Affichage de la liste des pages
    const showPagesList = () => {
        let pagesList = []
        let users = props.users.users
        let numberOfPages = users.length / range
        

        for(let i = 1; i < numberOfPages+1; i ++) {
            if(i === selectedPage) {
                pagesList.push(
                    <article className="user-page-number-selected" onClick={(e) => {changePage(i)}} key={i}>
                        <p>{i}</p>
                    </article>
                )
            }
            else {
                pagesList.push(
                    <article className="user-page-number" onClick={(e) => {changePage(i)}} key={i}>
                        <p>{i}</p>
                    </article>
                )
            }
        }

        return( <section className="admin-user-page-selection">
            {pagesList}
        </section>) 
    }

    return(
        <section className="root">
                <Header />
                <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>
                <section className="admin-container">
                    <AdminMenu />
 
                    <section className="admin-content">
                        <h4>Gestion des utilisateurs</h4>
                        <section className="users-list-container">
                            {showUsers()}
                        </section>
                        <section className="admin-user-page-selection-container">
                            {showPagesList()}
                        </section>
                    </section>
                </section>
                <Footer />
        </section>
    )
}

const mapStateToProps = (store) => {
    return {
        user : store.user,
        users: store.users
    }
}   

const mapDispatchToProps = {
    loadAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)