import { Routes, Route, useNavigate } from "react-router-dom";
import { storeContext } from "./Context/storeContext";
import { useState, useContext, useEffect } from "react";



export default function App() {
  const { store, addProduct, updateProduct, deleteProduct, deleteAllProduct } = useContext(storeContext);
  const [mode, setMode] = useState(false);
  const [index, setIndex] = useState(0);
  const nav = useNavigate();



  const CreateProduct = () => {

    const [formData, setFormData] = useState({
      title: '',
      category: '',
      price: '',
      taxes: '',
      ads: '',
      discount: '',
      total: 0,
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      const price = parseFloat(formData.price || 0);
      const taxes = parseFloat(formData.taxes || 0);
      const ads = parseFloat(formData.ads || 0);
      const discount = parseFloat(formData.discount || 0);
      const result = price + taxes + ads - discount;
      setFormData((prev) => ({ ...prev, total: result > 0 ? result : 0 }));
    }, [formData.price, formData.taxes, formData.ads, formData.discount]);

    useEffect(() => {
      if (mode && store[index]) {
        setFormData(store[index]);
      }
    }, [mode, index, store]);

    const btnCreateProduct = () => {

      if (formData.title && formData.price && formData.category) {

        if (mode) {
          // Update existing product
          updateProduct(index, formData)
          setMode(false);
        } else {
          // Create new product
          addProduct(formData);
        }

        setFormData({
          title: '',
          category: '',
          price: '',
          taxes: '',
          ads: '',
          discount: '',
          total: 0,
        });
        nav('/');
      } else {
        alert("Please fill in all required fields (Title, Price, Category).");
      }
    };


    return (
      <div className="inputs">
        <p>{mode ? "Update Product" : "Create Product"}</p>
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          required
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          required
          step="0.01"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="taxes"
          placeholder="Taxes"
          step="0.01"
          value={formData.taxes}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ads"
          placeholder="Ads"
          step="0.01"
          value={formData.ads}
          onChange={handleChange}
        />
        <input
          type="text"
          name="discount"
          placeholder="Discount"
          step="0.01"
          value={formData.discount}
          onChange={handleChange}
        />

        <div className="total">Product Total Price: {formData.total}</div>
        <button onClick={btnCreateProduct}>{mode ? "Update Product" : "Create Product"}</button>
      </div>
    );
  }


  const Home = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const displayData = filteredData.length > 0 ? filteredData : store;

    const handleChange = (e) => {
      setSearch(e.target.value);
    };

    const SearchByCategory = () => {
      if (!search.trim()) return;
      const results = store.filter((item) =>
        item.category.toLowerCase() === search.toLowerCase()
      );
      setFilteredData(results);
      clearSearch()
    };

    const SearchByTitle = () => {
      if (!search.trim()) return;
      const results = store.filter((item) =>
        item.title.toLowerCase() === search.toLowerCase()
      );
      setFilteredData(results);
      clearSearch()
    };

    const clearSearch = () => {
      setSearch('');
      setFilteredData([]);
    };

    const updateData = (i) => {
      setIndex(i);
      setMode(true);
      nav('/c');
    }


    return (
      <>
        <div className="search">
          {store && store.length > 0 && (
            <>
              <input
                type="search"
                name="search"
                placeholder="Search by Category or Product..."
                required
                value={search}
                onChange={handleChange}
              />
              <button onClick={() => SearchByCategory()}>Search By Category</button>
              <button onClick={() => SearchByTitle()}>Search By Title</button>
            </>
          )}

          <button onClick={() => nav('/c')}>Create Product</button>
          {store && store.length > 0 && (
            <button onClick={() => deleteAllProduct()}>Delete All ({store.length})</button>
          )}
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>price</th>
                <th>taxes</th>
                <th>ads</th>
                <th>discount</th>
                <th>total</th>
                <th>category</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((product, index) => (
                <tr key={index}>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.taxes}</td>
                  <td>{product.ads}</td>
                  <td>{product.discount}</td>
                  <td>{product.total}</td>
                  <td>{product.category}</td>
                  <td>
                    <div className="action">
                      <button onClick={() => updateData(index)}><i className="fa-sharp fa-solid fa-pen-to-square"></i></button>
                      <button onClick={() => deleteProduct(index)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }


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
