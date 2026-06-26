import './App.css'
import { useFetch } from './hooks/useFetch'

function App() {

  const { data, loading } = useFetch()

  if (loading) return <h1>Cargando...</h1>

  return (
    <>
      <h1>Tienda Online</h1>

      <div className="products-container">

        {data.map(product => (

          <div className="card" key={product.id}>

            <img
              src={product.image}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p>{product.category}</p>

            <p className='price'>
              ${product.price}
            </p>

            <button>
              Agregar al carrito
            </button>

          </div>

        ))}

      </div>
    </>
  )
}

export default App