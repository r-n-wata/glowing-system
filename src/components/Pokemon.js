import React, {useEffect, useState} from "react";
import '../css/Pokemon.css'
import Card from "./Card";


export default function App(){

    const [pokemonData, setPokemonData] = useState([])
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [play, setPlay] =useState(false)
    
    useEffect(() =>{
        fetch('https://api.pokemontcg.io/v2/cards')
            .then(res => res.json())
            .then(data => {
                
                const array = data.data
                let cardObj = array.map(el => el = {src: el.images.small, matched:false})
                setPokemonData(cardObj)
                
               
        })
    }, [])
    
   
    const shuffleCards = () => {

        const shuffled = [...pokemonData].sort(() => Math.random() - 0.5).slice(0, 6)
        let setID = [...shuffled, ...shuffled].map((card) => ({...card, id: Math.random()}))
        
        setCards(setID)
        setTurns(0)
    }
     
    console.log(cards)
    
    
                

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
    return (
        <div className="main--wrapper">
            <div className={play ? 'hdden' : "play-container"}>

              <button type='button' className={play? 'hidden' : "play-btn" } onClick={handlePlay}>Play Game!</button>  
            </div>
            
            <div className="game">
                <h2 className={!play ? 'hidden' : "turns"}>Turns: {turns}</h2>
                <div className="main">
                    <h1 className={!play ? 'hidden' : "title"}>Matching Game!</h1>
                    <button type='button' className={!play ? 'hidden' : "new-game-btn" } onClick={shuffleCards}>New Game</button>

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