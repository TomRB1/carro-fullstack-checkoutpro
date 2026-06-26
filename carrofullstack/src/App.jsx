import './App.css'
import { useFetch } from './hooks/useFetch'

function App() {

  const { data, loading } = useFetch()

  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <>
      <h1>Tienda</h1>

      <div>
        {data.map(product => (
          <div key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              width="100"
            />

            <h3>{product.title}</h3>

            <p>${product.price}</p>

            <button>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App