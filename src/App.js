import React , {useState, useEffect} from "react";
import axios from 'axios'
import "./style.css";
import Quote from './components/Quote'

export default function App() {

  const [isLoading, setisLoading]= useState(true)
  const [quote, setQuote] = useState([])
  const [clicked, setClicked]= useState(false)

  const handleClick = ()=> {
    setClicked(!clicked)
  }

  const getQuote = ()=> {
    axios
      .get('https://simpsons-quotes-api.herokuapp.com/quotes?count=1')
      .then((response) => response.data)
      .then((data) => {
        setQuote(data[0].quote);
        setisLoading(false)
      });
  }

  useEffect(()=>{
    getQuote()
  }, [])  

  useEffect(()=>{
    getQuote()
  }, [clicked])  

  return (
    <>
      {isLoading ? <p>Loading...</p>: <Quote quote={quote}/>}
      {!isLoading && <button onClick={handleClick}>Another one</button>}
    </>
  );
}
