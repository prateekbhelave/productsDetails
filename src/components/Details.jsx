import { Link, useParams } from "react-router-dom";
import axios from "../Utils/axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Details = () => {
  const [products, setProducts] = useState(null)
  const {id} = useParams();

  const getSingleProduct = async () => {
    try {
      const {data} = await axios.get(`products/${id}`)
      setProducts(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getSingleProduct()
  },[])


  return products ? (
    <div className="w-[90%] m-auto p-[10%]  h-full flex gap-10">
      
      <img className="w-[40%] object-contain" src={products.image} alt="" />
      <div className=" p-5 flex flex-col justify-center text-xl gap-2">
        <h1 className="text-3xl">{products.title}</h1>
        <h2 className="text-orange-400 ">
          <span className="font-semibold text-black">Price</span> :{" "}
          {products.price}
        </h2>
        <h2 className="text-zinc-600">
          <span className="font-semibold text-black">Category</span> :{" "}
          {products.category}
        </h2>
        <p className="text-zinc-600">
          <span className="font-semibold text-black">Description</span> :{" "}
          {products.description}
        </p>
        <div className="flex gap-5 mt-5">
          <Link className="py-3 px-5 border border-blue-200 text-blue-400 rounded hover:text-white hover:bg-blue-400">
            Edit{" "}
          </Link>
          <Link className="py-3 px-5 border border-red-200 text-red-400 rounded hover:text-white hover:bg-red-400">
            Delete{" "}
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
  
};

export default Details;
