import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/css/productlist.module.css'
import headerStyles from '../assets/css/header.module.css'

function Productlist({url}) {

  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([])

  const navigate = useNavigate()

  function fetchProducts() {
    fetch(url)
    .then(res => res.json())
    .then(data => setProducts(data))
  }
  
  function handleSelected(sku) {
    if(!selected.includes(sku)) setSelected([...selected, sku])
    else setSelected(selected.filter(val => val !== sku))
  }

  //delete method unsupported in 000webhost server
  async function handleDelete() {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        skus: selected
      })
    })

    fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  

  return (
    <>
    <div className={headerStyles.header}>
      <h1>Product List</h1>

      <div className={headerStyles.buttons}>
        <button onClick={() => navigate('/add-product')}>ADD</button>
        <button onClick={handleDelete} id='delete-product-btn'>MASS DELETE</button>
      </div>
    </div>

    <div className={styles.grid}> 
      {
        products.map((product, index) => 
          <div className={styles.product} key={index}>
            <input type="checkbox" className='delete-checkbox'
            onChange={() => handleSelected(product.sku)} 
            />
            <p>{product.sku}</p>
            <p>{product.name}</p>
            <p>{product.price} $</p>
            <p>
              {Object.keys(JSON.parse(product.description))[0]}:
              {Object.values(JSON.parse(product.description))[0]}
            </p>
          </div>)
      }
    </div>
    
    </>
  )
}

export default Productlist