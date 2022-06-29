import React, {useEffect, useState} from "react";
import '../css/Simpsons.css'
import Card from "./Card";
import * as ReactBootstrap from 'react-bootstrap'



export default function Pokemon(){

    const [simpsonsData, setSimpsonsData] = useState([])
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [play, setPlay] =useState(false)
    const [loading , setLoading] = useState(false)
    

    
    
    useEffect(() =>{
        fetch('https://simpsons-api-app.herokuapp.com/api/')
            .then(res => res.json())
            .then(data => {
                
                const array = data.data
                let cardObj = array.map(el => el = {src: el.image, matched:false})
                setSimpsonsData(cardObj)
                setLoading(true)
                
               
        })
    }, [])
    
    
    const shuffleCards = () => {
        
        const shuffled = [...simpsonsData].sort(() => Math.random() - 0.5).slice(0, 6)
        let setID = [...shuffled, ...shuffled].map((card) => ({...card, id: Math.random()}))
        
        
        setCards(setID)
        setTurns(0)
    }
     
     
     
    console.log(cards)
    // console.log(shuffleCards)
    
                

   // handle choice

   const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        
   }


   useEffect(() => {
    
    if(choiceOne && choiceTwo){
         setDisabled(true)
 

        if(choiceOne.src === choiceTwo.src){


           

                setCards(prevCards=>{
                    return prevCards.map(card => {

                        if(card.src === choiceTwo.src){
                            return {...card, matched:true}
                        }else{
                            return card
                        }
                    })
                })
            
            console.log('matched!')
            resetTurn()
        }else{
            console.log('no!')
            setTimeout(()  => resetTurn(), 1000)
        }
    }
   }, [choiceOne, choiceTwo])

   const resetTurn = () => {

    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn +1)
    setDisabled(false)
   }

   const handlePlay= () => {
    setPlay(prevState => !prevState)
    shuffleCards()
   }
   function refreshPage() {
    window.location.reload(false);
  }
    return (
        <div className="main--wrapper">
            <div className={play ? 'hidden' : "play-container"}>

              <button type='button' className={play? 'hidden' : "play-btn" } onClick={handlePlay}>Play Game!</button>
             
            </div>
            
            <div className="game">


            <div className="options-section">

                <h2 className={!play ? 'hidden' : "turns"}>Score: {turns}</h2>
                <button type='button' className={!play ? 'hidden' : "new-game-btn" } onClick={shuffleCards}>Restart</button>
                {/* <button onClick={() => navigate(-1)}>Go back</button> */}
                <button className="back" onClick={refreshPage}>Back</button>
                </div>
               
                <div className="main">
                
                {!loading && <ReactBootstrap.Spinner animation="grow" className="grow"/>}
                    <div className="card-grid">

                        {cards.map(card => (
                            
                            <Card 
                                    key={card.id}
                                    card = {card}
                                    handleChoice = {handleChoice}
                                    flipped={card === choiceTwo || card=== choiceOne || card.matched}
                                    disabled={disabled}
                                />
                            ))}
                    </div>

            </div>
          
         
        
        </div>
        </div>
    
    )
}