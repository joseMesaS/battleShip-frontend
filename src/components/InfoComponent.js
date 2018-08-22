import React from 'react'

export default function InfoComponent(props) {

    return (

        <div className="gameInfo">
            {props.gameStatus === 'started' && <h1>Battleship!</h1>}
            {props.gameStatus !== 'started' && <h1>{props.gameStatus}</h1>}
            <br/><br/>
            {props.playerFeedback === true && <p>You Got him!</p>}
            {props.playerFeedback === false && <p>You Miss it!</p>}
            <h2>Player Score: {props.playerScore}</h2>
            <h2>Computer Score: {props.computerScore}</h2>
            {props.botFeedback === true && <p>He got you!</p>}
            {props.botFeedback === false && <p>He miss it!</p>}
            <br/><br/>
            <br/><br/>
            <ul>
                <li className="infoLi"><div className='infoPurp'></div> Neutral</li>
                <li className="infoLi"><div className='infoPink'></div> Hit!</li>
                <li className="infoLi"><div className='infoBlue'></div> Miss!</li>
            </ul>
            

        </div>
    )  
}