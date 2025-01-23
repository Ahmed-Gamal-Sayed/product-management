import { Routes, Route } from "react-router-dom";
import Home from './Component/home'
import CreateProduct from './Component/createProduct'



export default function App() {
  return (
    <>
      <div className="container">

        <div className="header">
          <p>product management system - (CRUDS)</p>
        </div>

        <div className="content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/c" element={<CreateProduct />} />
          </Routes>

        </div>
      </div>
    </>
  )
}
