
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreateReceipt from './pages/CreateReceipt'
import CreateInvoice from './pages/CreateInvoice'
import ShowReceipt from './pages/ShowReceipt'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/createreceipt" element={<CreateReceipt />} /> 
        <Route path="/createinvoice" element={<CreateInvoice />} /> 
        <Route path="/showreceipt" element={<ShowReceipt />} /> 
      </Routes>
    </>
  )
}

export default App
