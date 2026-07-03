import { useEffect, useMemo, useState } from "react";

export default function useCart(){

    //esto para guardar el carrito de forma local y que quede en caso de cierre de la web
    const [cart, setCart] = useState(() => {
        const cartSaved = localStorage.getItem("cartItem");
        return cartSaved ? JSON.parse(cartSaved) : []
    })

    //convierte de objeto a texto
    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cart))
    }, [cart])

    //agregar
    const add = (product) => {
        setCart(prevCart => {
            const matchProduct = prevCart.find(
                element => element.id === product.id
            )
            if(matchProduct){
                return prevCart.map(element =>
                    element.id === product.id ? {...element, quantity: element.quantity + 1} : element
                )
            }
            return [ ...prevCart, {
                    ...product, unit_price: product.price, quantity: 1
                }
            ]
        })
    }   


    //eliminar
    const remove = (product) => {
        setCart(prevCart => prevCart.filter( element => element.id !== product.id))
    }

    //añadir mas
    const more = (product) => {
        setCart(prevCart => prevCart.map( element => element.id === product.id ? {...element,
            quantity: element.quantity + 1 
        } : element))
    }

    //restar
    const less = (product) => {
        setCart(prevCart => prevCart.map(element => element.id === product.id ? { ...product,
             quantity: product.quantity - 1 >= 0 ? product.quantity - 1 : 0 } : element))
    
    }


    //Esto guarda el precio del carro para que no se borre al renderizar todo de nuevo
    const totalCart = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total + (item.unit_price * item.quantity),
            0
        )
    }, [cart])

    return {add, remove, more, less, totalCart, cart}
}