import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchData } from '../actions';
import { ColorRing, RotatingLines } from 'react-loader-spinner';

const Search = () => {
  const [word, setWord] = useState('');
  const dispatch = useDispatch();
  const { SEARCH } = useSelector((state) => state.Reducer);

  const handleClick = () => {
    dispatch(SearchData(word));
  };

  return (
    <div>
      <h1 className="main_heading" style={{margin:'5% 0% 0% 40%',color:'red'}}>Search Here</h1>

      {/* search component */}
      <div className="input-group mb-3 w-50 m-auto">
        <input
          type="text"
          className="form-control w-50 m-auto"
          placeholder="Search here...."
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
        <button className="btn btn-danger" onClick={handleClick}>
          Search
        </button>
      </div>

      {/* output display */}
      
        <div className="container mt-5">
          <ul>
            {SEARCH.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
       
    </div>
  );
};

export default Search;