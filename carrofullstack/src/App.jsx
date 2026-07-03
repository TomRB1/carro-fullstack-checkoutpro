import "./App.css";
import { useFetch } from "./hooks/useFetch";
import useCart from "./hooks/useCart";
import { useBackend } from "./hooks/useBackend";



function App() {

  const { sendCart } = useBackend();
  const { data, loading } = useFetch();
  const { cart, add, remove, more, less, totalCart } = useCart();

  if (loading) {
    return <h1>Cargando productos...</h1>;
  }

  return (
    <>

      <header>
        <h1>Tienda Online</h1>
      </header>

      <main>

        <section className="products-container">

          {data.map(product => (

            <div className="card" key={product.id}>

              <img
                src={product.image}
                alt={product.title}
              />

              <h3>{product.title}</h3>

              <p className="category">
                {product.category}
              </p>

              <p className="price">
                ${product.price}
              </p>

              <button onClick={() => add(product)}>
                Agregar al carrito
              </button>

            </div>

          ))}

        </section>

        <aside className="cart">

          <h2>Carrito</h2>

          {
            cart.length === 0
              ? <p>El carrito está vacío.</p>
              : cart.map(product => (

                <div
                  className="cart-item"
                  key={product.id}
                >

                  <img
                    src={product.image}
                    alt={product.title}
                  />

                  <div>

                    <h4>{product.title}</h4>

                    <p>
                      ${product.unit_price}
                    </p>

                    <div className="quantity">

                      <button
                        onClick={() => less(product)}
                      >
                        -
                      </button>

                      <span>{product.quantity}</span>

                      <button
                        onClick={() => more(product)}
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    className="remove"
                    onClick={() => remove(product)}
                  >
                    ✖
                  </button>

                </div>

              ))
          }

          <h3>Total: ${totalCart}</h3>

          <button
            className="checkout"
            onClick={() => sendCart(cart)}
          >
            Finalizar compra
          </button>
          

        </aside>

      </main>

    </>
  );
}

export default App;