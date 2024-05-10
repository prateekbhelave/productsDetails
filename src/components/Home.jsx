import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import Loading from "./Loading";
import axios from "../Utils/axios";
const Home = () => {
  const { products } = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category == "undefined") setFilteredProducts(products);
    if (category != "undefined") getProductsCategory();
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      
      <div className="w-[85%] bg-zinc-200 p-10 pt-[5%] flex gap-5 flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="card p-3 bg-white border shadow rounded-lg w-[18%] h-[40vh] flex flex-col justify-center items-center "
            >
              <div
                className="w-full h-[70%] mb-4 bg-contain bg-no-repeat bg-center hover:scale-110"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-300">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
