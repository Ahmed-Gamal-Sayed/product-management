import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateProduct, addProduct } from "../Redux/productSlice";
import { getMode } from "../Redux/modeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CreateProduct() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const index = useSelector((state) => state.index.index);
    const mode = useSelector((state) => state.mode.mode);
    const allProduct = useSelector((state) => state.product.product);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        taxes: "",
        ads: "",
        discount: "",
        total: 0,
    });

    // Populate form data in edit mode
    useEffect(() => {
        if (mode && allProduct && allProduct[index]) {
            setFormData(allProduct[index]);
        }
    }, [mode, allProduct, index]);

    // Calculate total price dynamically
    useEffect(() => {
        const price = parseFloat(formData.price || 0);
        const taxes = parseFloat(formData.taxes || 0);
        const ads = parseFloat(formData.ads || 0);
        const discount = parseFloat(formData.discount || 0);
        const result = price + taxes + ads - discount;
        setFormData((prev) => ({ ...prev, total: result > 0 ? result : 0 }));
    }, [formData.price, formData.taxes, formData.ads, formData.discount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["price", "taxes", "ads", "discount"].includes(name)
            ? value.replace(/[^0-9.]/g, "") // Allow only numbers and dots
            : value;
        setFormData({ ...formData, [name]: parsedValue });
    };

    const btnCreateProduct = () => {
        if (formData.title && formData.price && formData.category) {
            if (mode) {
                // Update existing product
                dispatch(updateProduct({ index, updatedProduct: formData }));
                dispatch(getMode(false)); // Reset mode to false
            } else {
                // Create new product
                dispatch(addProduct(formData));
            }

            // Reset the form after adding/updating
            setFormData({
                title: "",
                category: "",
                price: "",
                taxes: "",
                ads: "",
                discount: "",
                total: 0,
            });
            nav("/"); // Redirect to the home page
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
                value={formData.price}
                onChange={handleChange}
            />
            <input
                type="text"
                name="taxes"
                placeholder="Taxes"
                value={formData.taxes}
                onChange={handleChange}
            />
            <input
                type="text"
                name="ads"
                placeholder="Ads"
                value={formData.ads}
                onChange={handleChange}
            />
            <input
                type="text"
                name="discount"
                placeholder="Discount"
                value={formData.discount}
                onChange={handleChange}
            />

            <div className="total">Product Total Price: {formData.total}</div>
            <button onClick={btnCreateProduct}>{mode ? "Update Product" : "Create Product"}</button>
        </div>
    );
}
