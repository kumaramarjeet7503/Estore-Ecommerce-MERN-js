import React, { Fragment, useState } from 'react'
import './search.css'
import { useNavigate } from 'react-router-dom';


const Search = () => {

    const [keyword, setKeyword] = useState("") ;
    const history = useNavigate();
    const searchSelect = (e)=>{
        e.preventDefault() ;
        if(keyword.trim()){
            history(`/products/${keyword}`) ;
        }else{
            history('/products');
        }
    }

  return (
    <Fragment>
        <form className='searchbox' onSubmit={searchSelect}>
            <input type='text' placeholder="Enter the product you're looking for!" onChange={(e)=> setKeyword(e.target.value)}  ></input>
            <button  type='submit' value="submit"  >Search</button>
        </form>
    </Fragment>
  )
}

export default Search