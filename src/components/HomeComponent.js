import React, {PureComponent} from 'react'
import { Button } from 'react-bootstrap'
import * as request from 'superagent'
import {Redirect} from 'react-router-dom'
const baseUrl = 'http://localhost:4000' 

export default class HomeComponent extends PureComponent {
  state = {
    gameId: null
  }

  createGame = () => {
    request
        .post(`${baseUrl}/games`)
        .then(response => {
            this.setState({ gameId: response.body})
        })
        .catch(err => alert(err))


  }
  

  render() {

    return (

        <div className="homeContainer">
            <h1>Welcome To Battleship!</h1>
            <p>Prepare yourself...</p>
            <Button  bsSize="large" onClick={this.createGame}>New Game</Button>
            {this.state.gameId !== null && <Redirect to={`/games/${this.state.gameId}`}/>}
            
        </div>
    
      

    )
  
  
  }
}
