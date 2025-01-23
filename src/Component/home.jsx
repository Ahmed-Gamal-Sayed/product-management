import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteProduct, deleteAllProduct } from "../Redux/productSlice";
import { getIndex } from "../Redux/indexSlice";
import { getMode } from "../Redux/modeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const { product } = useSelector((state) => state.product);

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const displayData = filteredData.length > 0 ? filteredData : product;

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const searchByField = (field) => {
        if (!search.trim()) return;
        const results = product.filter(
            (item) => item[field].toLowerCase() === search.toLowerCase()
        );
        setFilteredData(results);
        clearSearch();
    };

    const clearSearch = () => {
        setSearch("");
        setFilteredData([]);
    };

    const handleUpdate = (index) => {
        dispatch(getIndex(index));
        dispatch(getMode(true));
        nav("/c");
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleDeleteAll = () => {
        dispatch(deleteAllProduct());
        setFilteredData([]);
    };

    return (
        <>
            <div className="search">
                {product.length > 0 && (
                    <>
                        <input
                            type="search"
                            placeholder="Search by Category or Product..."
                            value={search}
                            onChange={handleChange}
                        />
                        <button onClick={() => searchByField("category")}>
                            Search By Category
                        </button>
                        <button onClick={() => searchByField("title")}>
                            Search By Title
                        </button>
                    </>
                )}

                <button onClick={() => nav("/c")}>Create Product</button>
                {product.length > 0 && (
                    <button onClick={handleDeleteAll}>
                        Delete All ({product.length})
                    </button>
                )}
            </div>

            <div className="table-wrapper">
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
                        {displayData.length > 0 ? (
                            displayData
                                .filter((item) => item !== null && item !== undefined) // Ensure valid entries
                                .map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.taxes}</td>
                                        <td>{item.ads}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.total}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <div className="action">
                                                <button onClick={() => handleUpdate(index)}>
                                                    <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button onClick={() => handleDelete(index)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="8">No products found.</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </>
    );
}
