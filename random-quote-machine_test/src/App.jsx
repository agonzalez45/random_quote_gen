import './App.css';
import Button from './components/Button';
import React, { useEffect, useState } from "react";
import QuoteDiv from "./components/Quote";
import Block from "./components/Block";
import LikeButton from './components/LikeButton';
import axios from 'axios';


function App() {
  //state variables
  //used to show and hide liked quotes block
  const [show, setShow] = useState(false);
  //stores all quotes from get
  const [quotesList, setQuotesList] = useState([]);
  //sets quote for the main block
  const [quote, setQuote] = useState({});

  const [likedQuotes, setLikedQuotes] = useState([]);
  //set <li> for the tables. used for liked quotes
  const [listItems, setListItems] = useState([]);
  //gets the list of like quotes and offers
  const [newList, setNewList] = useState({quote:[], author:[]});

  //adds quote and author to mongodb
  const addLike = async () => {
    const resp = await axios.post('http://localhost:5000/posting', {quote: quote.quote, author: quote.author});
    //setLikedQuotes(newList)
    
  }

  //clears like list 
  function clearLikedQuotes(){
    const resp =  axios.get('http://localhost:5000/delete');
    console.log("likes cleared!")
  }
  //gets liked quotes
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get('http://localhost:5000/personnel');
        
        setLikedQuotes(resp.data)
        const allQuotes = [];
        const allAuthors = [];

        resp.data.forEach(({ quote, author }) => {
          allQuotes.push(quote);
          allAuthors.push(author);
        });
        console.log(allQuotes)
        console.log(allAuthors)
        setNewList({allQuotes, allAuthors})

        //creates map out of quotes and authors
        //makes list
        setListItems(allQuotes.map((value, index) => {
          const linkContent = allAuthors[index];
          return (
            <li>{value} - {linkContent}</li>
          );
        }))

        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

  let quoteList;
  
  //runs on start
  useEffect(async () => {
    if (quotesList.length === 0) {
      const quotesResult = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
      quoteList = await (quotesResult.json());
      
      setQuotesList(quoteList.quotes)
    }
    else{
      setRandomQuote(quotesList)
      sendGetRequest()

    }

    //updates the state
  },[quotesList])

  //picks a random quote from the quote list
  const setRandomQuote = list => {
    const randNum = randIndex(list.length);
    while(list[randNum].quote === quote.quote){
      randNum = randIndex(list.length);
    }
    //console.log(list[randNum].quote)
    setQuote(list[randNum])
  }
  
  //chooses a random index for the random quote
  const randIndex =  (quotesLen) => {
    if(!quotesLen) {
      return;
    }
    return Math.floor(Math.random()*quotesLen);
  }

  function nextQuoteClickHandler(){
    setRandomQuote(quotesList)
    
  }
  function clickLike(){
    addLike()
  }
  
  return (
    <div className="App" id="quote-box" >
      <QuoteDiv 
        value={quote}
        onQuoteChange={() => setRandomQuote(quotesList)}
      />

      <Button buttonDisplayName="Next Quote" clickHandler={nextQuoteClickHandler} className="button"/>
      <LikeButton clickHandler={clickLike} className="button"/>
      

      <button onClick={() => setShow(prev => !prev)} className="button">Show liked quotes</button>
      <button onClick={clearLikedQuotes} className="button">Clear Quotes</button>

      {show && <Block value={listItems}></Block>}
      
      
    </div>
  );
}

export default App;
