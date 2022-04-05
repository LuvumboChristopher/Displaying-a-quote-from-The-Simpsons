import React , {useState, useEffect} from "react";
import axios from 'axios'
import "./style.css";

export default function App() {

  const [isLoading, setisLoading]= useState(true)
  const [person, setPerson] = useState({})
  const [clicked, setClicked]= useState(false)

  const handleClick = ()=> {
    setClicked(!clicked)
  }

  const getQuote = async()=> {
    await axios
      .get('https://simpsons-quotes-api.herokuapp.com/quotes?count=1')
      .then((response) => response.data)
      .then((data) => {
        console.log(data[0])
        setPerson(data[0]);
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
      {isLoading ? <p>Loading...</p> : <div>
      <img src={person.image} alt={person.character}/>
      <h1>{person.character}</h1>
      <p>{person.quote}</p> </div>}
      {!isLoading && <button onClick={handleClick}>Another one</button>}
    </>
  );
}
