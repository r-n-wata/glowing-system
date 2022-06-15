import React, {useEffect, useState} from "react";
import './css/App.css'
import Card from "./components/Card";


export default function App(){

    const [pokemonData, setPokemonData] = useState([])
    const [count, setCount] = useState(0)
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    
    let arr = []
    useEffect(() =>{
        fetch('https://api.pokemontcg.io/v2/cards')
            .then(res => res.json())
            .then(data => {
                const reduceArr = data.data.map(el => el.src = el.images.small).slice(0, 6)
               

                function shuffleArray(array) {
                    array = array.concat(array)
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array
                 }

                

                
                let shuffledArray = shuffleArray(reduceArr)

                let cardObj = shuffledArray.map(el => el = {src: el, matched:false})
                //  let arr = pokemonData.concat(cardObj)
                setPokemonData(cardObj)
                console.log(cardObj)
                
               
        })
    }, [count])
    
  
    const handleClick = () => {
        setCount(prevCount => prevCount +1)
    }
    console.log(count)

   // handle choice

   const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        
   }

console.log(choiceOne)

   useEffect(() => {
    
    if(choiceOne && choiceTwo){
         setDisabled(true)

        if(choiceOne.src === choiceTwo.src){


           

                setPokemonData(prevCards=>{
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
   console.log(pokemonData)
    return (
        <div className="main--wrapper">
            <h2 className="turns">Turns: {turns}</h2>
            <div className="main">
           {/* <pre> {JSON.stringify(pokemonData, null, 2)}</pre> */}
            <h1 className="title">Matching Game!</h1>
           <button type='button' onClick={handleClick}>New Game</button>

            <div className="card-grid">

                  {pokemonData.map(card => (
                    
                       <Card 
                            card = {card}
                            handleChoice = {handleChoice}
                            flipped={card=== choiceOne || card=== choiceTwo || card.matched}
                            disabled={disabled}
                         />
                     ))}
            </div>
         
        
        </div>
        </div>
    
    )
}