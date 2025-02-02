import Header from "../../components/header";
import "./style.scss";
import useAddProductViewModal from "./useViewModal";
const AddProduct = () => {
  const { handleInputChange, data, addProduct } = useAddProductViewModal();
  return (
    <div>
      <Header />
      <div className="center">
        <div className="addProdCont">
          <p className="topLabel">Name*</p>
          <input
            className="inputField"
            name="name"
            placeholder="Enter product name"
            onChange={handleInputChange}
            value={data.name}
          />
          <p className="topLabel">Image URL*</p>
          <input
            className="inputField"
            name="image"
            placeholder="Enter product image URL"
            onChange={handleInputChange}
            value={data.image}
          />
          <p className="topLabel">Description*</p>
          <textarea
            className="inputField"
            name="description"
            placeholder="Enter product description"
            onChange={handleInputChange}
            value={data.description}
            rows={5}
          />
          <div className="center gap">
            <div className="fullWidth">
              <p className="topLabel">Price*</p>
              <input
                className="inputField"
                name="price"
                placeholder="Enter product price"
                onChange={handleInputChange}
                type="number"
                value={data.price}
              />
            </div>
            <div className="fullWidth">
              <p className="topLabel">Discount (%)*</p>
              <input
                className="inputField"
                name="discount"
                placeholder="Enter product discount"
                onChange={handleInputChange}
                type="number"
                value={data.discount}
              />
            </div>
          </div>
          <p className="topLabel">Category*</p>
          <input
            className="inputField"
            name="category"
            placeholder="Enter product category"
            onChange={handleInputChange}
            value={data.category}
          />

          <p className="topLabel">Ingredients*</p>
          <input
            className="inputField"
            name="ingredients"
            placeholder="Enter product ingredients"
            onChange={handleInputChange}
            value={data.ingredients}
          />
          <button className="successButton" onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
