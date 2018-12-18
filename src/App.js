import React, { Component } from 'react';
import './App.css';
import Square from './Square';
import Header from './Header'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      clickId:999,
      counter: 5,
      answer: ["?","?","?","?","?","?","?","?","?"],
      spaces: [0,0,0,0,0,0,0,0,0],
    }
    var defaultState=this.state;
  }

  componentDidMount(){
    let {counter, spaces, answer, clickId} = this.state;
    let treasurePostion = Math.floor(Math.random() * spaces.length)
    let noOfBomb=Math.ceil(spaces.length/10)
    spaces[treasurePostion] = 1
    while(noOfBomb>0){
      let bombPosition =Math.floor(Math.random() * spaces.length)
      if(bombPosition !== treasurePostion ){
        spaces[bombPosition] = 2
        noOfBomb--
      }
    }
    console.log("noOfBomb: ",noOfBomb)

    this.setState({spaces:spaces})
    // plantTreasure
  }

  handleChange= e =>{
    let counterId = e.target.id;
    let {counter, spaces, answer, clickId} = this.state;

    if(spaces[counterId]=== 1 || counter === 1 || spaces[counterId]=== 2){
        for(let i=0;i<spaces.length;i++){
          if(spaces[i]===0){
            answer[i]="tree"
          } else if(spaces[i]===1){
            answer[i]="treasure"
          } else if(spaces[i]===2){
            answer[i]="bomb"
          }
          spaces[i]=9
        }
        clickId = counterId
        counter--
    }  else{
        if(spaces[counterId]!==9){
          if(spaces[counterId]===0){
            answer[counterId]="tree"
          } else if(spaces[counterId]===1){
            answer[counterId]="treasure"
          } else {
            answer[counterId]="bomb"
        }
        counter--
        clickId = counterId
        spaces[counterId] = 9
     }
    }
    this.setState({clickId:clickId})
    this.setState({spaces:spaces})
    this.setState({counter:counter})
    this.setState({answer:answer})
    console.log("counterId: ", counterId)
    console.log("counter: ", counter)
    console.log("spaces: ", spaces)
    console.log("answer: ", answer)
  }

  reset=()=>{
    let {counter, spaces, answer, clickId} = this.state;
        this.state = this.defaultState

        this.setState({clickId:clickId})
        this.setState({counter:counter})
        this.setState({answer:answer})
        this.setState(spaces:spaces)
  }

  render() {
    let treasureBox = this.state.spaces.map((v,i)=>{
      return(
        <Square id={i} currentSpace={this.state.spaces[i]} answerStatus={this.state.answer[i]} handleChangeFunc={this.handleChange}  /> 
        )
    })
    return (
      <div className="App">

      <Header currentCount={this.state.counter} currentSpace={this.state.spaces} currentId={this.state.clickId} answerStatus={this.state.answer} initFunc={this.state.reset} />
      <div className="board-list">
        {treasureBox}
      </div>


      </div>
    );
  }
}

export default App;