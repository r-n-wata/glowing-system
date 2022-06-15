import React from "react";
import '../css/Card.css'

export default function Card({card, handleChoice, flipped, disabled}){
    const back = require('../img/front.jpg'); 


    const handleClick = () => {
        if(!disabled){
           handleChoice(card) 
        }
        
    }
    return (
        
            <div className="card" key=''>
                <div className={flipped ? 'flipped' : ''}>
                    <img src={card.src} className='front' alt='front of card'/>
                    <img 
                        src={back} 
                        className="back" 
                        onClick={handleClick}
                        alt='back of card'
                    />
                </div>
            </div>
        
    )
}