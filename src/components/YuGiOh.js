import React, {useEffect, useState} from "react";
import '../css/YuGiOh.css'
import Card from "./Card"
import Spinner from "./Spinner";


export default function YuGiOh(){

    const [yugiohData, setYugiohData] = useState([])
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [play, setPlay] =useState(false)
    const [loading , setLoading] = useState(false)

    
    
    useEffect(() =>{
        setLoading(true)
        fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
            .then(res => res.json())
            .then(data => {
                
                const array = data.data
                let cardObj = array.map(el => el = {src: el.card_images[0].image_url_small, matched:false})
                setYugiohData(cardObj)
                // setCards([cardObj.slice(0, 6)] )
               
               
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        });
    }, [])
    
    console.log(yugiohData)
   
    const shuffleCards = () => {

        const shuffled = [...yugiohData].sort(() => Math.random() - 0.5).slice(0, 6)
        let setID = [...shuffled, ...shuffled].map((card) => ({...card, id: Math.random()}))
        
        setCards(setID)
        setTurns(0)
    }

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
            
            resetTurn()
        }else{
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
        <div className="main--wrapper-y">
            <div className={play ? 'hidden' : "play-container-y"}>

              <button type='button' className={play? 'hidden' : "play-btn-y" } onClick={handlePlay}>Play Game!</button>  
            </div>
            
            <div className="game-y">
                <div className="options-section">

                    <h2 className={!play ? 'hidden' : "turns"}>Score: {turns}</h2>
                <button type='button' className={!play ? 'hidden' : "new-game-btn" } onClick={shuffleCards}>Restart</button>
                <button className="back" onClick={refreshPage}>Back</button>
                </div>
                
                <div className="main-y">
                    
                    {loading && <Spinner/>}

                    <div className="card-grid-y">
                    
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