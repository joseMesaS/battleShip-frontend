import React, {PureComponent} from 'react'
import './GameComponent.css'
import InfoComponent from './InfoComponent'
import * as request from 'superagent'
const baseUrl = 'http://localhost:4000' 


export default class GameComponent extends PureComponent {
    state = {
        playerBoard: null,
        pcBoard: null,
        loaded: false,
        playerScore: 0,
        botScore: 0,
        playerFeedback: '',
        botFeedback: '',
        gameStatus: 'started'

    }

    componentDidMount = () => {
        request
            .get(`${baseUrl}/games/${this.props.match.params.id}`)
            .then(response => {
                
                this.setState({
                    playerBoard: response.body.playerField,
                    pcBoard: response.body.botField,
                    loaded: true
                })
            })
            .catch(err => alert(err))
    
    }


    handleClick = (e) => {
         
        if(this.state.gameStatus === 'started') {
            request
                .post(`${baseUrl}/games/${this.props.match.params.id}`)
                .send({'coord': e.target.id.split(',').map(element => Number(element))})
                .then(response => {
                    let winner = 'started'
                    if (response.body.playerScore === 17 ) {
                        winner = 'User Win!'
                    }else if(response.body.botScore === 17) {
                        winner = 'The machine Win!'
                    }
                    this.setState({
                        playerBoard: response.body.playerField,
                        pcBoard: response.body.botField,
                        playerScore: response.body.playerScore,
                        botScore: response.body.botScore,
                        playerFeedback: response.body.playerHit,
                        botFeedback: response.body.botHit,
                        gameStatus: winner

                    })
                    console.log(typeof response.body.playerScore )
                    
                })
                .catch(err => alert(err))}

    }

  renderPcBoard = () => {
    let board = []
    for (let i = 0; i < 12; i++) {
        let row = []
        for (let j = 0; j < 12; j++) {
            row.push( <div id={`${i},${j}`} ref={`pc${i},${j}`} 
                        className={ (this.state.pcBoard[i][j]==='hit' && 'pink') || (this.state.pcBoard[i][j]==='miss' && 'blue') || 'square' }  
                        key={`pc${i},${j}`} onClick={this.handleClick}></div>)
        }
        board.push(
            <div className="row" key={i}>{row}</div>
        )
    }
    return board
  }

  renderPlayerBoard = () => {
    let board = []
    for (let i = 0; i < 12; i++) {
        let row = []
        for (let j = 0; j < 12; j++) {
            row.push( <div id={`${i},${j}`} className={ (this.state.playerBoard[i][j]==='hit' && 'pink') || (this.state.playerBoard[i][j]==='miss' && 'blue') || 'pl' } key={`pl${i},${j}`} >
                {this.state.playerBoard[i][j] !== null && 
                 this.state.playerBoard[i][j] !== 'hit' && 
                 this.state.playerBoard[i][j] !== 'miss' && <img className="boat" src='https://whaletrips.org/wp-content/uploads/2017/01/icon-boat.png'/>}</div>)
        }
        board.push(
            <div className="row" key={i}>{row}</div>
        )
    }
    return board
  }

  render() {

    return (
        <div className="containr">
            <div className="playground">
                <div id="player" className="boardFrame" >{this.state.loaded && this.renderPlayerBoard()}</div>
                <div id="computer" className="boardFrame" >{this.state.loaded && this.renderPcBoard()}</div>
            </div>
            <div className="infoContainer">
                <InfoComponent playerScore={this.state.playerScore} 
                   computerScore={this.state.botScore} 
                   playerFeedback={this.state.playerFeedback} 
                   botFeedback={this.state.botFeedback}
                   gameStatus={this.state.gameStatus}>
                </InfoComponent>
            </div>
            
        </div>
    )
  
  
  }
}
