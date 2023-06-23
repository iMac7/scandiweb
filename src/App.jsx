import {Routes, Route} from 'react-router-dom';
import './App.css'
import Productlist from './components/Productlist'
import Addproduct from './components/Addproduct'

function App() {
  let url = 'https://malevolent-baud.000webhostapp.com'

  return (
    <Routes>
      <Route path='/' element={<Productlist url={url} />} />
      <Route path='/add-product' element={<Addproduct url={url} />} />
    </Routes>
  )
}

export default App
