import React, { useState } from "react";
import { connect } from "react-redux";
import "./main.css";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

function SearchResult(state) {
  const [search,setSearch] = useState();
  const [result,setResult] = useState({});
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  }
 const changeSearch = (e) => {
   setSearch(e.target.value);
  };
 const findTranslate = () =>{
    const form = search;
    const allArr = state.words;
    const term = allArr.find(item => String(item.form) === form);
    console.log(term);
    if(term === undefined){
      setStatus('Not found');
      setSearch('');
    } else if(term !== undefined){
      setResult(term);
      setSearch('');
      setStatus('');
      console.log(result);
    }
  }
    return (
      <div>
        <form onSubmit={handleSubmit} className="find">
        <TextField
          id="filled-basic"
          label="Write form for searching..."
          variant="filled"
          className="search"
          color="secondary"
          onChange={changeSearch}
          value={search}
        />
        </form>
        <Button variant="contained" onClick={findTranslate} className="search_but" color="secondary">Search</Button>
        <div className='result'>
              <div>
              <span><h3>Form:</h3>  <h4>{result.form}{status}</h4></span>
              <span><h3>Meaning:</h3>  <h4>{result.mean}</h4></span>
              <span><h3>Word:</h3>  <h4>{result.word}</h4></span>
              <span><h3>Translate:</h3>  <h4>{result.translate}</h4></span>
              <span><h3>Example:</h3>  <h4>{result.example}</h4></span>
              </div>
        </div>
      </div>
    );
  }
function mapStateToProps(state) {
  return {
    words: state.todo,
  };
}

export default connect(mapStateToProps)(SearchResult);
