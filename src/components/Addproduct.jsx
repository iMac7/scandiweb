import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/css/addproduct.module.css'
import headerStyles from '../assets/css/header.module.css'

function Addproduct({url}) {
    const [type, setType] = useState('DVD')
    const [description, setDescription] = useState({})
    const [product, setProduct] = useState({sku: '', name: '', price: ''})
    const [error, setError] = useState('')

    const navigate = useNavigate()

    function handleProduct(field, value) {
        setProduct({...product, [field]: value})
    }

    function handleDescription(field, value) {
        if(field==='dimensions') {
            setDescription({dimensions: {...description.dimensions, ...value}})
        }
        else {
            setDescription({[field]: value})
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()        

        for (const key of Object.keys(product)) {
            if(product[key] === '') {
                return setError('Please, submit required data')
            }
        }

        let desc;
        
        if(description.Size && description.Size !=='') {
            desc = {Size: `${description.Size} MB`}
        }
        else if(description.Weight && description.Weight!=='') {
            desc = {Weight: `${description.Weight} KG`}
        }
        else if(description.dimensions) {
            if(
                description.dimensions.height && description.dimensions.height!=='' &&
                description.dimensions.width && description.dimensions.width!=='' &&
                description.dimensions.length && description.dimensions.length!==''
            ){
                desc = {Dimensions: `${description.dimensions.height}x${description.dimensions.width}x${description.dimensions.length}`}   
            }
            else {
                return setError('Please, submit required data')
            }
        }
        else {
            return setError('Please, submit required data')
        }

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({...product, description: JSON.stringify(desc)})
        })

        navigate('/')
    }

    function handleCancel(e) {
        e.preventDefault()
        navigate('/')
    }


    let input;

    switch (type) {
        case 'DVD':
            input = 
            <>
            <label htmlFor="">Size (MB)</label>
            <input id='size' type="text" placeholder='DVD'
            onChange={(e) => handleDescription('Size', e.target.value)}/>
            <p>Please, provide Size</p>
            </>
            break

        case 'Book':
            input = 
            <>
            <label htmlFor="">Weight (KG)</label>
            <input id='weight' type="text" placeholder='Book'
            onChange={(e) => handleDescription('Weight', e.target.value)}/>
            <p>Please, provide Weight</p>
            </>
            break

        case 'Furniture':
            input = 
            <>
            <div className={styles.furniture} onChange={
            (e) => handleDescription('dimensions', {[e.target.placeholder]: e.target.value})
            }>
                <label htmlFor="">Length (CM)</label>
                <input id='length' type="text" placeholder='length' />
    
                <label htmlFor="">Width (CM)</label>
                <input id='width' type="text" placeholder='width' />

                <label htmlFor="">Height (CM)</label>
                <input id='height' type="text" placeholder='height'
                />     
            </div>
            <p>Please, provide Dimensions</p>
            </>
            break
        
        default: input = null
            break
    }

  return (
    <>
    <div className={headerStyles.header}>
      <h1>Product Add</h1>

      <div className={headerStyles.buttons}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>

    <form id='product_form'>
        <fieldset>
            <label htmlFor="sku">SKU</label>
            <input type="text" name='sku' id='sku' value={product.sku} 
            onChange={(e) => handleProduct('sku', e.target.value)}
            />
        </fieldset>

        <fieldset>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' id='name' value={product.name}
            onChange={(e) => handleProduct('name', e.target.value)}
            />
        </fieldset>
 
        <fieldset>
            <label htmlFor="price">Price</label>
            <input type="text" name='price' id='price' value={product.price}
            onChange={(e) => handleProduct('price', e.target.value)}
            />
        </fieldset>

        <fieldset className={styles.type}>
            <label htmlFor="type">Type Switcher</label>
            <select name="type" id="productType" onChange={e => setType(e.target.value)}>
                <option id='DVD' value="DVD">DVD</option>
                <option id='Book' value="Book">Book</option>
                <option id='Furniture' value="Furniture">Furniture</option>
            </select>
            {input}
        </fieldset>

        <p className={styles.error}>{error}</p>

    </form>
    
    </>
  )
}

export default Addproduct