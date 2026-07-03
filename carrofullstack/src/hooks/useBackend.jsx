import axios from "axios";

export function useBackend() {
  const sendCart = async (cart) => {
    const parseCart = cart.map(product => ({
      id: product.id,
      title: product.title,
      unit_price: product.price ?? product.unit_price,
      quantity: product.quantity ?? 1
    }));

    try {
      const res = await axios.post("http://localhost:8000/carrito", {
        items: parseCart
      });

      window.location.href = res.data.sandbox_init_point;

    } catch (error) {
      console.error("Error en backend:", error);
    }
  };

  return { sendCart };
}