import React from "react";


export default function Spinner ({ loading }) {
    const loadingIcon = require('../img/loading.gif')


    return (
        <>
             <div className="loading-container"><img src={loadingIcon} alt='' className="loading"/></div>
          
        
        </>
    )
}