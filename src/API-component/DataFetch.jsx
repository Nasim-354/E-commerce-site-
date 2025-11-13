import React, { useEffect, useState } from "react";
import "./Style.css";
import Search from "./Search";

const DataFetch = () => {
  const [allCarts, setAllCarts] = useState([]); 
  const [moveCarts, setMoveCarts] = useState([]); 

  useEffect(() => {
    const dFetch = async () => {
      try {
        const response = await fetch("https://dummyjson.com/carts");
        const data = await response.json();
        setMoveCarts(data.carts);
        setAllCarts(data.carts);
      } catch (error) {
        console.error("data error", error);
      }
    };
    dFetch();
  }, []);

  const receiveValue = (search) => {
    const searchingValue = search.toLowerCase();
    
    if (!searchingValue) {
      setMoveCarts(allCarts);
      return;
    }

    const fetchingValue = allCarts.filter((items) =>
      items.products.some((product) =>
        product.title.toLowerCase().startsWith(searchingValue)
      )
    );

    setMoveCarts(fetchingValue);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
        This is our moves
      </h1>

      <Search sendValue={receiveValue} />

      {moveCarts.map((data) => {
        const { products } = data;
        return (
          <div className="parentDiv" key={data.id}>
            {products.map(
              ({
                id,
                title,
                price,
                quantity,
                total,
                discountPercentage,
                discountedTotal,
                thumbnail,
              }) => (
                <section key={id} className="childDiv">
                  <img src={thumbnail} alt={title} />
                  <h2>Title: {title}</h2>
                  <h4>Quantity: {quantity}</h4>
                  <p>Price: {price} TK</p>
                  <div className="discount">
                    <p>-{discountPercentage}%</p>
                  </div>
                  <p>Total: {total} Tk</p>
                  <p>Discounted Total: {discountedTotal} Tk</p>
                  <div className="btn">
                    <button type="button">Buy Now</button>
                  </div>
                </section>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataFetch;
