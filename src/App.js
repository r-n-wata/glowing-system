import React, {useEffect, useState} from "react";
import './css/App.css'
import Pokemon from "./components/Pokemon";
import YuGiOh from "./components/YuGiOh";

export default function App(){

    const pokemonImg = require('./img/pokemon title.jfif');
    
    const yugiohImg = require('./img/yugiohtitle.jfif'); 

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
                <h1 className="title-y main-title">Matching Game!</h1>
                {/* <h1 className="app-title">Choose a theme!</h1> */}

                <div className="pokemon-img"></div>
                <div className="yugioh-img"></div>
                <div className="chooseGame-container--imgs">

                    {/* <img src={pokemonImg}/>

                    <img src={yugiohImg}/>  */}

                    <div className="pokemon" onClick={showPokemon}><img src={pokemonImg}/></div>
                    <div className="yugioh" onClick={showYugioh}><img src={yugiohImg}/></div>
                </div>
            

            
                
            </div>

            {choosePokemon && <Pokemon />}
            {chooseYugioh && <YuGiOh />}
        </>
      
    )
}
