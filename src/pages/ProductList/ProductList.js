import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import ProductCategory from "./components/ProductCategory";
import ProductColor from "./components/ProductColor";
import ProductSize from "./components/ProductSize";
import "./ProductList.scss";

const ProductList = () => {
  const [filterOption, setFilterOption] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [productFilteringData, setProductFilteringData] = useState({});
  const [category, setCategory] = useState("");
  const [productDataList, setProductDataList] = useState([]);
  const location = useLocation();
  // const [productDataList, setProductDataList] = useState([]);
  const navigate = useNavigate();

  let offset = 0;
  const onClickSortModal = () => {
    setIsSortOpen(!isSortOpen);
  };

  const SortModal = () => {
    const onClickSort = e => {
      console.log(
        e.target.textContent === "최저가 - 최고가" ? "최저가순" : "최고가순"
      );
    };
    return (
      <div className="modal" style={{ display: isSortOpen ? "block" : "none" }}>
        <ul>
          <li onClick={onClickSort}>최저가 - 최고가</li>
          <li onClick={onClickSort}>최고가 - 최저가</li>
        </ul>
      </div>
    );
  };

  const clickLike = e => {
    e.target.className =
      e.target.className === "fas fa-heart" ? "far fa-heart" : "fas fa-heart";
  };

  useEffect(() => {
    fetch("http://10.58.4.136:8000/products/categories")
      .then(res => res.json())
      .then(res => {
        setProductFilteringData(res.categories);
      });
  }, []);

  useEffect(() => {
    fetch(`http://10.58.4.136:8000/products/list${location.search}`)
      .then(res => res.json())
      .then(res => {
        setProductDataList(res.products);
      });
  }, [location.search]);

  const clickSort = e => {
    if (e.target.textContent.length === 0 && e.target.checked === true) {
      setCategory(e.target.parentNode.textContent);
    }
  };
  console.log(category);

  const pagenation = () => {
    const limit = 20;
    offset = offset + 5;

    const queryString = `?offset=${offset}&limit=${limit}`;

    navigate(`/list${queryString}`);
  };

  return (
    <div className="wrap">
      <p className="listTitle">크록스 여성 슈즈</p>
      <div className="listNav">
        <div className="listNavSmallLeft">
          <i className="fas fa-home leftSmallBtn" />
          <div className="leftSmallCategory">
            <a href="/">여성 X</a>
          </div>
        </div>
        <div className="listNavSmallRight">
          <a className="showAll" href="/">
            모두보기
          </a>
          <span>{productDataList.length}개의 상품</span>
        </div>
      </div>

      <div className="sectionWrap">
        <section className="leftSection">
          <div className="reccomendProduct">
            <p className="recommendProductTitle">추천상품</p>
            <ul>
              <li>신상품</li>
              <li>베스트셀러</li>
              <li>5만원 이하 여성 슈즈</li>
              <li>Classic Crocs</li>
              <li>모두 보기</li>
            </ul>
          </div>
          <div className="filteringProduct">
            <p className="filteringProductTitle">제품 필터링</p>
            <ul>
              <li className="style">
                스타일
                <i
                  className="fas fa-plus stylePlus"
                  onClick={() =>
                    setFilterOption(filterOption === "style" ? "" : "style")
                  }
                />
                <ul
                  className="styleUl"
                  style={{
                    display: filterOption === "style" ? "block" : "none",
                  }}
                >
                  {productFilteringData.categories?.map(ele => {
                    return (
                      <ProductCategory
                        onClick={clickSort}
                        category={ele.name}
                        categoryId={ele.id}
                        key={ele.id}
                      />
                    );
                  })}
                </ul>
              </li>
              <li className="size">
                사이즈
                <i
                  className="fas fa-plus sizePlus"
                  onClick={() =>
                    setFilterOption(filterOption === "size" ? "" : "size")
                  }
                />
                <ul
                  className="sizeUl"
                  style={{
                    display: filterOption === "size" ? "grid" : "none",
                  }}
                >
                  {productFilteringData.sizes?.map(ele => {
                    return <ProductSize productSize={ele.sizes} key={ele.id} />;
                  })}
                </ul>
              </li>
              <li className="color">
                색상
                <i
                  className="fas fa-plus colorPlus"
                  onClick={() =>
                    setFilterOption(filterOption === "color" ? "" : "color")
                  }
                />
                <ul
                  className="colorUl"
                  style={{
                    display: filterOption === "color" ? "grid" : "none",
                  }}
                >
                  {productFilteringData.colors?.map(ele => {
                    return (
                      <ProductColor productColor={ele.name} key={ele.id} />
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <img
              className="adImg"
              alt="광고이미지"
              src="https://www.street.co.kr/wp-content/uploads/2020/07/street.co_.kr_2020_07_casestudy-crocs-classic-clog_1-1.jpg"
            ></img>
          </div>
        </section>

        <section className="rightSection">
          <div className="dropdownMenu">
            <button className="sortBtn" onClick={onClickSortModal}>
              정렬 방법
              <i className="fas fa-angle-down arrowBtn" />
              <SortModal />
            </button>
          </div>
          <div>
            <ul className="productInfoList">
              {productDataList?.map(product => {
                return (
                  <ProductCard
                    key={product.product_id}
                    clickLike={clickLike}
                    product_id={product.product_id}
                    img_url={product.colors}
                    product_name={product.product_name}
                    product_price={product.price}
                    colors={product.colors}
                  />
                );
              })}
            </ul>
          </div>
          <div className="moreProduct">
            <div className="showMoreBtn">
              <button onClick={pagenation}>더보기</button>
            </div>
            <div className="showAllBtn">
              <a href="/">모두보기({productDataList.length})</a>
            </div>
          </div>
          <p className="categoryComment">
            스타일리시하면서도 편안한 크록스 여성 슈즈.(각각 카테고리에 맞는
            서술)
          </p>
        </section>
      </div>
    </div>
  );
};
export default ProductList;
