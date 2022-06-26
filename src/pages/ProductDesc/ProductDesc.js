import React from "react";
import "./ProductDesc.scss";
import { useState, useEffect } from "react";
import RecommendProducts from "./components/RecommendProducts/RecommendProducts";
import NewProducts from "./components/NewProducts/NewProducts";
import CartAll from "./components/CartAll/CartAll";

const ProductDesc = () => {
  const [productDatas, setProductData] = useState([]);

  const [sizeModal, setSizeModal] = useState(false);

  const handleSizeModal = () => {
    setSizeModal(true);
  };
  useEffect(() => {
    fetch("/datas/productData.json", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        setProductData(data);
      });
  }, []);

  return (
    <div className="productDescPage">
      {sizeModal === true && <SizeTableModal setSizeModal={setSizeModal} />}
      <CartAll productDatas={productDatas} handleSizeModal={handleSizeModal} />
      <footer className="bottomContainer">
        <RecommendProducts recommendProductDatas={productDatas} />
        <NewProducts newProductDatas={productDatas} />
      </footer>
    </div>
  );
};

const SizeTableModal = ({ setSizeModal }) => {
  return (
    <>
      <div className="blackModal" />
      <div className="whiteModal">
        <button
          onClick={() => {
            setSizeModal.setSizeModal(false);
          }}
        >
          X
        </button>
        <img src="./images/sizeTable_01.png" alt="nonono!" />
      </div>
    </>
  );
};

export default ProductDesc;
