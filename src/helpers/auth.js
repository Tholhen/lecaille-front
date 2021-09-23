import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom"
import axios from "axios";
import {connect} from "react-redux"
import {connectUser} from "../actions/user/userAction"

import { config } from "../config/config";
import tokenConfig from "../config/tokenConfig";



export default function auth(ChildComponent, authNeeded = false, adminNeeded = false){
    const RequireAuth = (props) => {
        const [redirect, setRedirect] = useState(false)

        useEffect(() => {
            const token = localStorage.getItem(tokenConfig.token.name)
            
            if(!token && authNeeded){
                setRedirect(true)
            } else {
                if(!props.user.isLogged){
                    axios.get(config.api_url + "/user/checkToken", {headers: {"x-access-token" : token}})
                    .then(response => {
                        if(response.data.status !== 200) {
                            if(authNeeded){
                                setRedirect(true)
                            }
                        } else {
                            let user = response.data.user[0]
                            if(adminNeeded && user.role !== "Admin"){
                                setRedirect(true)
                            }
                            props.connectUser(user)
                        }
                    })
                }
            }
        }, [props])

        if(redirect){
            return <Redirect to="/" />
        }

        return (<ChildComponent {...props} />)
    }


    const mapStateToProps = (store) => {
        return {
            user: store.user
        }
    }

    const mapDispatchToProps = {
        connectUser
    }

    return connect(mapStateToProps,mapDispatchToProps)(RequireAuth)
}

