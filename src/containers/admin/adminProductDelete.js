import React, {useEffect} from "react";
import {Redirect} from "react-router-dom"

import {deleteProduct} from "../../api/products"

const AdminProductDelete = (props) => {

    //Au chargement de la page
    useEffect(() => {
        deleteProduct(props.match.params.id)
    }, [props.match.params.id])
    
    return(
        <Redirect to="/admin/products" />
    )
}

export default AdminProductDelete;