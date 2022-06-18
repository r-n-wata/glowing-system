import React, {useEffect, useState} from "react";
import './css/App.css'
import Pokemon from "./components/Pokemon";
import YuGiOh from "./components/YuGiOh";

export default function App(){

    const pokemonImg = require('./img/pokemon.jfif');
    
    const yugiohImg = require('./img/yugioh.jfif'); 

    const [choosePokemon, setChoosePokemon] = useState(false)

    const [chooseYugioh, setChooseYugioh] = useState(false)

    const showPokemon = () =>{
        setChoosePokemon(prevState => !prevState)

      
        
    }

    const showYugioh = () => {
        setChooseYugioh(prevState => !prevState)
    }

   
    return (

        <>
            <div className= {choosePokemon || chooseYugioh ? 'hidden' :"chooseGame-container"}>
                <h1>Choose a theme!</h1>
                <div className="chooseGame-container--imgs">

                    {/* <img src={pokemonImg}/>

                    <img src={yugiohImg}/>  */}

                    <div className="pokemon" onClick={showPokemon}></div>
                    <div className="yugioh" onClick={showYugioh}></div>
                </div>
            

            
                
            </div>

            {choosePokemon && <Pokemon />}
            {chooseYugioh && <YuGiOh />}
        </>
      
    )
}
