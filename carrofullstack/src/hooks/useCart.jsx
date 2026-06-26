import { useEffect, useMemo, useState } from "react";

export default function useCart(){

    //esto para guardar el carrito de forma local y que quede en caso de cierre de la web
    const [cart, setCart] = useState(() => {
        const cartSaved = localStorage.getItem("cartItem");
        return cartSaved ? JSON.parse(cartSaved) : []
    })

    //convierte de objeto a texto
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])

    //agregar
    const add = (product) => {}
    //eliminar
    const remove = (product) => {}
    //añadir mas
    const more = (product) => {}
    //restar
    const less = (product) => {}

    //Esto guarda el precio del carro para que no se borre al renderizar todo de nuevo
    const totalCart = useMemo(() =>{

    })

}