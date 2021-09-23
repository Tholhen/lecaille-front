const localStorageBasketName = "lecaille-basket"

//Récupération du panier dans le local storage
export const getBasket = () => {
    if(JSON.parse(localStorage.getItem(localStorageBasketName))) 
    {
        return JSON.parse(localStorage.getItem(localStorageBasketName))
    }
    else {
        return []
    }
}
//Ajout d'un produit dans le panier
export const addToBasket = (product, quantity) =>  {
    if(parseFloat(quantity) > 0){    
        let newBasket  = []
        let basket = getBasket()
        
        if(basket){
            newBasket = basket
            let productExistsIndex = newBasket.findIndex(basketProduct => basketProduct.productId === product.id)
            if(productExistsIndex !== -1){
                newBasket[productExistsIndex].quantity += parseFloat(quantity)
            }
            else {
                newBasket.push({productId: product.id, quantity: parseFloat(quantity)})
            }
        }
        else {
            newBasket.push({productId: product.id, quantity: parseFloat(quantity)})
        }

        localStorage.setItem(localStorageBasketName, JSON.stringify(newBasket))
    }
}

//Suppression d'un produit du panier
export const deleteFromBasket = (id) => {
    let basket = getBasket()
    let newBasket = basket.filter(newProduct => newProduct.productId !== id)
    localStorage.setItem(localStorageBasketName, JSON.stringify(newBasket))
}

//Suppression du panier
export const clearBasket = () => {
    localStorage.removeItem(localStorageBasketName)
}

