import '../styles/home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <span className="title">Receipt Generator</span>
      <div className="home-container">
        <Link to="/createreceipt">
          <div className="create-receipt">
            <span>Receipt</span>
          </div>
        </Link>
        <Link to="/createinvoice">
          <div className="create-invoice">
            <span>Invoice</span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Home