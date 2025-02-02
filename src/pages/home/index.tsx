import Header from "../../components/header";
import useHomeViewModal from "./useViewModal";
import "./style.scss";
import { LoaderEmptyState } from "../../components/loaderEmptyScreen";
import SingleProduct from "../../components/singleProduct";
const Home = () => {
  const { products, loading, filterProducts } = useHomeViewModal();

  return (
    <div>
      <Header onInputChange={(e) => filterProducts(e.target.value)} />
      {products.length < 1 || loading ? (
        <LoaderEmptyState
          loading={loading}
          length={Number(products.length)}
          text="No product found"
        />
      ) : (
        <div className="cardContainer">
          {products.map((product, index) => {
            return (
              <div key={index}>
                <SingleProduct product={product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
