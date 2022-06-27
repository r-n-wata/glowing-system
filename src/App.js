import React, {useState} from "react";
import './css/App.css'
import Simpsons from "./components/Simpsons";
import YuGiOh from "./components/YuGiOh";

export default function App(){

    const simpsonsImg = require('./img/simpsons-ttitle.jpg');
    
    const yugiohImg = require('./img/yugiohtitle.jfif'); 

    const [chooseSimpsons, setChooseSimpsons] = useState(false)

    const [chooseYugioh, setChooseYugioh] = useState(false)

    const showSimpsons = () =>{
        setChooseSimpsons(prevState => !prevState)

      
        
    }

    const showYugioh = () => {
        setChooseYugioh(prevState => !prevState)
    }

   
    return (

        <>
            <div className= {chooseSimpsons || chooseYugioh ? 'hidden' :"chooseGame-container"}>
                <h1 className="title-y main-title">Matching Game!</h1>

                <div className="simpsons-img"></div>
                <div className="yugioh-img"></div>
                <div className="chooseGame-container--imgs">


                    <div className="simpsons" onClick={showSimpsons}><img src={simpsonsImg} alt=''/></div>
                    <div className="yugioh" onClick={showYugioh}><img src={yugiohImg} alt=''/></div>
                </div>
            

            
                
            </div>

            {chooseSimpsons && <Simpsons />}
            {chooseYugioh && <YuGiOh />}
        </>
      
    )
}
