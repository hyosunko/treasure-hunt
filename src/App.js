import React, { Component } from 'react';
import './App.css';
import Square from './Square';
import Header from './Header'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      boardSize: 3,
      clickId: 999,
      counter: 5,
      col : [],
      answer: [],
      spaces: [],
    }
    var defaultState=this.state;
  }

  componentDidMount(){
    let {boardSize, counter, spaces, answer, clickId,col} = this.state;
    spaces = Array(boardSize*boardSize).fill(0);
    answer = Array(boardSize*boardSize).fill("❓");
    col = Array(boardSize).fill("150px");
    let treasurePostion = Math.floor(Math.random() * spaces.length)
    let noOfBomb=Math.ceil(spaces.length/10)
    counter = Math.ceil(spaces.length/2)
    spaces[treasurePostion] = 1
    while(noOfBomb>0){
      let bombPosition =Math.floor(Math.random() * spaces.length)
      if(bombPosition !== treasurePostion ){
        spaces[bombPosition] = 2
        noOfBomb--
      }
    }

    console.log("noOfBomb: ",noOfBomb)
    console.log("col: ", col)

    this.setState({col:col})
    this.setState({spaces:spaces})
    this.setState({answer:answer})
    this.setState({counter:counter})
  }

  handleChange= e =>{
    let currentState = this.state
    let counterId = e.target.id;
    let {counter, spaces, answer, clickId} = this.state;

    if(spaces[counterId]=== 1 || counter === 1 || spaces[counterId]=== 2){
        for(let i=0;i<spaces.length;i++){
          if(spaces[i]===0){
            answer[i]="🌴"
          } else if(spaces[i]===1){
            answer[i]="💎"
          } else if(spaces[i]===2){
            answer[i]="💣"
          }
          spaces[i]=9
        }
        clickId = counterId
        counter=0
    }  else{
        if(spaces[counterId]!==9){
          if(spaces[counterId]===0){
            answer[counterId]="🌴"
          } else if(spaces[counterId]===1){
            answer[counterId]="💎"
          } else {
            answer[counterId]="💣"
        }
        counter --
        clickId = counterId
        spaces[counterId] = 9
     }
    }
    var x = document.getElementById(clickId);
    x.style.backgroundColor = 'aliceblue';
    this.setState({currentState:this.state})
    this.setState({counter:counter})
    this.setState({clickId:clickId})
    console.log("counterId: ", counterId)
    console.log("counter: ", counter)
    console.log("spaces: ", spaces)
    console.log("answer: ", answer)
  }

  reset=()=>{
    let initial = this.state;
        this.setState({initial:this.defaultState})
  }

  render() {

    var colStr = this.state.col.join(" ")

    let columnStyle = {
      margin: '0',
      display: 'grid',
      gridTemplateColumns: colStr,
      justifyContent: 'center',
    }

    let treasureBox = this.state.spaces.map((v,i)=>{
      return(
        <Square id={i} currentSpace={this.state.spaces[i]} answerStatus={this.state.answer[i]} handleChangeFunc={this.handleChange}  /> 
        )
    })
    return (
      <div className="App">

      <Header currentCount={this.state.counter} currentSpace={this.state.spaces} currentId={this.state.clickId} answerStatus={this.state.answer} initFunc={this.state.reset}/>
      <div style={columnStyle} className="board-list">
        {treasureBox}
      </div>


      </div>
    );
  }
}

export default App;