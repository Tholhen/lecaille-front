import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import { logoutUser } from "../../actions/user/userAction"
import {Redirect} from "react-router-dom"
import tokenConfig from "../../config/tokenConfig"

const Logout = (props) => {

    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        props.logoutUser()
        localStorage.removeItem(tokenConfig.token.name)
        setRedirect(true)
    }, [props])

    return(
        <div>
            {redirect && <Redirect to="/" />}
        </div>
    )
}



const mapDispatchToProps = {
    logoutUser
}

const mapStateToProps = (store) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)