import React, { useEffect, useState } from "react";

const Search = ({sendValue}) => {
  const [Search, setSearch] = useState("");
  const handelChange = (e)=>{
    setSearch(e.target.value)
  }
  useEffect(()=>{
    sendValue(Search)
  },[Search])

  return (
    <div style={{textAlign:"center"}}>
      <input style={{padding:"5px",margin:"10px"}} type="search" placeholder="search your items..." onChange={handelChange} />
    </div>
  );
};

export default Search;
