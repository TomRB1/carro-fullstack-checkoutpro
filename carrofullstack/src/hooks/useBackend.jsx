import axios from "axios"

export function useBackend() {
    const sendCart = async (cart) => {

        try {
            const response = await axios.post(
                "http://localhost:8000/carrito",
                {
                    items: cart
                }
            )

            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return { sendCart }
}