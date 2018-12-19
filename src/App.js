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
      clickCounter: 5,
      colWidthArray : [],
      cellDisplayContent: [],
      cellStatus: [],
      record:[0,0],
      clickedCellArray:[]
    }
  }

  componentDidMount(){
    let {boardWidth,boardHeight, clickCounter, cellStatus, cellDisplayContent,colWidthArray} = this.state;
    //initialize board data
    cellStatus = Array(boardWidth*boardHeight).fill(0);
    cellDisplayContent = Array(boardWidth*boardHeight).fill("❓");
    colWidthArray = Array(boardWidth).fill("150px");

    //intialize treasure, bomb position & game counter
    let treasurePostion = Math.floor(Math.random() * cellStatus.length)
    let noOfBomb=Math.ceil(cellStatus.length/10)
    clickCounter = Math.ceil(cellStatus.length/2)
    cellStatus[treasurePostion] = 1
    while(noOfBomb>0){
      let bombPosition =Math.floor(Math.random() * cellStatus.length)
      if(bombPosition !== treasurePostion ){
        cellStatus[bombPosition] = 2
        noOfBomb--
      }
    }

    console.log("noOfBomb: ",noOfBomb)
    console.log("colWidthArray: ", colWidthArray)
    console.log("cellStatus: ", cellStatus)

    this.setState({colWidthArray:colWidthArray})
    this.setState({cellStatus:cellStatus})
    this.setState({cellDisplayContent:cellDisplayContent})
    this.setState({clickCounter:clickCounter})
  }

  //cell clicked event hanlding function
  handleChange= e =>{
    let cellClickedId = e.target.id;
    let {clickCounter, cellStatus, cellDisplayContent, cellId, record} = this.state;

    //if clicked treasure=1, bomb=2 or game counter is one remain and cell status is not been clicked=9
    if((cellStatus[cellClickedId]=== 1 || clickCounter === 1 || cellStatus[cellClickedId]=== 2)&&cellStatus[cellClickedId]!==9){
        for(let i=0;i<cellStatus.length;i++){
          if(cellStatus[i]===1){
            cellDisplayContent[i]="💎"
          } else if(cellStatus[i]===2){
            cellDisplayContent[i]="💣"
          }
        }

        //increases win or lose records
        if(cellStatus[cellClickedId]===1){
            record[0]++
        } else{
            record[1]++
        }
        console.log("cellClickedId: ", cellClickedId);
        console.log("Cell Status cellClickedId: ", cellStatus[cellClickedId]);
        //resets cell status, click counter
        cellStatus.fill(9)
        cellId = cellClickedId
        clickCounter=0
    } else{
        //cell hasn't been clicked and is empty
        if(cellStatus[cellClickedId]!==9){
          if(cellStatus[cellClickedId]===0){
            cellDisplayContent[cellClickedId]="🌴"
          }
        clickCounter --
        cellId = cellClickedId
        cellStatus[cellClickedId] = 9
     }
    }

    //changes of cell color clicked
    var {clickedCellArray}=this.state;
    var x = document.getElementById(cellId);
    x.style.backgroundColor = 'aliceblue';
    clickedCellArray.push(x);
    //collects clicked cell objects to array
    this.setState({clickedCellArray:clickedCellArray})
    console.log("clickedCellArray: ",clickedCellArray);

    this.setState({currentState:this.state})
    this.setState({clickCounter:clickCounter})
    this.setState({cellId:cellId})
    this.setState({record:record})

    console.log("cellClickedId: ", cellClickedId)
    console.log("click counter: ", clickCounter)
    console.log("cellStatus: ", cellStatus)
    console.log("cellDisplayContent: ", cellDisplayContent)
    console.log("record: ", record)
    console.log("defaultState: ", this.defaultState)
  }

  // reset game data
  updateBoard=()=>{
    // let cellBackgroundColor ={
    //   backgroundColor: 'red'
    // }

    let {boardWidth, boardHeight, clickCounter, cellStatus, cellDisplayContent, record, clickedCellArray} = this.state;
    //initialize board data
    cellStatus = Array(boardWidth*boardHeight).fill(0);
    cellDisplayContent = Array(boardWidth*boardHeight).fill("❓");

    //intialize treasure, bomb position & game counter
    let treasurePostion = Math.floor(Math.random() * cellStatus.length)
    let noOfBomb=Math.ceil(cellStatus.length/10)
    clickCounter = Math.ceil(cellStatus.length/2)
    cellStatus[treasurePostion] = 1
    while(noOfBomb>0){
      let bombPosition =Math.floor(Math.random() * cellStatus.length)
      if(bombPosition !== treasurePostion ){
        cellStatus[bombPosition] = 2
        noOfBomb--
      }
    }

    // resets cell background all clicked cell objects
    for(let i=0;i<clickedCellArray.length;i++){
      clickedCellArray[i].style.backgroundColor = 'beige'
    }
    // empty clicked cell info
    clickedCellArray=[]

    console.log("clickedCellArray after: ",clickedCellArray)
    console.log("reset noOfBomb: ",noOfBomb)
    console.log("reset cellStatus: ", cellStatus)

    this.setState({cellStatus:cellStatus, cellDisplayContent:cellDisplayContent, clickCounter:clickCounter, boardWidth:boardWidth, boardHeight:boardHeight, record:record, clickedCellArray:clickedCellArray})
  }

  // componentDidUpdate(){
  //   updateBoard()
  // }
  render() {

    // create column grid data
    var colDataStr = this.state.colWidthArray.join(" ")

    // setup inline style data
    let columnStyle = {
      margin: '0',
      display: 'grid',
      gridTemplateColumns: colDataStr,
      justifyContent: 'center',
    }


    // create board data
    let boardCell = this.state.cellStatus.map((v,i)=>{
      return(
        <Square id={i} currentSpace={this.state.cellStatus[i]} cellDisplayContentStatus={this.state.cellDisplayContent[i]} handleChangeFunc={this.handleChange}  />
        )
    })
    return (
      <div className="App">
        {/*Title & counter remain data*/}
        <Header currentClickCounter={this.state.clickCounter} currentCellId={this.state.cellId} cellDisplayContentStatus={this.state.cellDisplayContent} initFunc={this.updateBoard} currentRecord={this.state.record}/>

        {/*board*/}
        <div style={columnStyle} className="board-list">
          {boardCell}
        </div>
      </div>
    );
  }
}

export default App;
