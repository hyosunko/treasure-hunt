import React, { Component } from 'react';
import './App.css';
import Square from './Square';
import Header from './Header'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      boardWidth: 3,
      boardHeight: 2,
      cellId: 999,
      gameCounter: 5,
      colWidth : [],
      cellDisplayContent: [],
      cellStatus: [],
      record:[0,0]
    }
  }

  componentDidMount(){
    let {boardWidth,boardHeight, gameCounter, cellStatus, cellDisplayContent, cellId,colWidth} = this.state;
    //initialize board data
    cellStatus = Array(boardWidth*boardHeight).fill(0);
    cellDisplayContent = Array(boardWidth*boardHeight).fill("❓");
    colWidth = Array(boardWidth).fill("150px");

    //intialize treasure, bomb position & game counter
    let treasurePostion = Math.floor(Math.random() * cellStatus.length)
    let noOfBomb=Math.ceil(cellStatus.length/10)
    gameCounter = Math.ceil(cellStatus.length/2)
    cellStatus[treasurePostion] = 1
    while(noOfBomb>0){
      let bombPosition =Math.floor(Math.random() * cellStatus.length)
      if(bombPosition !== treasurePostion ){
        cellStatus[bombPosition] = 2
        noOfBomb--
      }
    }

    console.log("noOfBomb: ",noOfBomb)
    console.log("colWidth: ", colWidth)
    console.log("cellStatus: ", cellStatus)

    this.setState({colWidth:colWidth})
    this.setState({cellStatus:cellStatus})
    this.setState({cellDisplayContent:cellDisplayContent})
    this.setState({gameCounter:gameCounter})
  }

  //cell clicked event hanlding function
  handleChange= e =>{
    let currentState = this.state
    let cellClickedId = e.target.id;
    let {gameCounter, cellStatus, cellDisplayContent, cellId, record} = this.state;

    //if clicked treasure=1, bomb=2 or game counter is one remain and cell status is not been clicked=9
    if((cellStatus[cellClickedId]=== 1 || gameCounter === 1 || cellStatus[cellClickedId]=== 2)&&cellStatus[cellClickedId]!==9){
        for(let i=0;i<cellStatus.length;i++){
          if(cellStatus[i]===1){
            cellDisplayContent[i]="💎"
          } else if(cellStatus[i]===2){
            cellDisplayContent[i]="💣"
          }
          cellStatus[i]=9
        }

        // if(cellStatus[counterId]===1){
        //     record[0]++
        // } else{
        //     record[1]++
        // }
        cellId = cellClickedId
        gameCounter=0
    }  else{
        //cell hasn't been clicked
        if(cellStatus[cellClickedId]!==9){
          if(cellStatus[cellClickedId]===0){
            cellDisplayContent[cellClickedId]="🌴"
          }
        gameCounter --
        cellId = cellClickedId
        cellStatus[cellClickedId] = 9
     }
    }

    //change of cell color clicked
    var x = document.getElementById(cellId);
    x.style.backgroundColor = 'aliceblue';

    this.setState({currentState:this.state})
    this.setState({gameCounter:gameCounter})
    this.setState({cellId:cellId})
    this.setState({record:record})
    console.log("cellClickedId: ", cellClickedId)
    console.log("game counter: ", gameCounter)
    console.log("cellStatus: ", cellStatus)
    console.log("cellDisplayContent: ", cellDisplayContent)
    console.log("record: ", record)
    console.log("defaultState: ", this.defaultState)
  }

  // reset game data
  reset=()=>{
    let initial = this.state;
    this.setState({initial:[]})

  }

  render() {

    // create column grid data
    var colStr = this.state.colWidth.join(" ")

    // setup inline style data
    let columnStyle = {
      margin: '0',
      display: 'grid',
      gridTemplateColumns: colStr,
      justifyContent: 'center',
    }

    // create board data
    let treasureBox = this.state.cellStatus.map((v,i)=>{
      return(
        <Square id={i} currentSpace={this.state.cellStatus[i]} cellDisplayContentStatus={this.state.cellDisplayContent[i]} handleChangeFunc={this.handleChange}  /> 
        )
    })
    return (
      <div className="App">
        {/*Title & counter remain data*/}
        <Header currentGameCounter={this.state.gameCounter} currentCellId={this.state.cellId} cellDisplayContentStatus={this.state.cellDisplayContent} initFunc={this.state.reset}/>
        
        {/*board*/}
        <div style={columnStyle} className="board-list">
          {treasureBox}
        </div>
      </div>
    );
  }
}

export default App;