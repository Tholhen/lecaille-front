import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {deleteUser} from "../../api/user"

const DeleteUser = (props) => {

    //Au chargement de la page
    useEffect(() => {
        deleteUser(props.match.params.id)
    }, [props.match.params.id])

    return(<div>
        {<Redirect to={"/admin/users"} />}
    </div>)
}

export default DeleteUser