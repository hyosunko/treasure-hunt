import React, { Component } from 'react';

class Header extends Component{
	// reset board contents
	reset=(e)=>{
		// prevent page refresh
		e.preventDefault()
		// call board initialize function
		this.props.initFunc()
	}
	render(){

		let clickRemain = this.props.currentClickCounter
		let announce ="Click Count Remain : " + clickRemain
		let cellDisplayContentStatus = this.props.cellDisplayContentStatus

		//calculate winning percentage
		let winningPercent = 0
		let winNo=this.props.currentRecord[0]
		let loseNo=this.props.currentRecord[1]
		let totalNo= winNo+loseNo;
		winningPercent = (winNo/totalNo*100).toFixed(0)
		// in case of no win/lose record, set winning percent to 0
		if(isNaN(winningPercent)){winningPercent=0}

		console.log("clickRemain: ",clickRemain)
		// click message inline color css
		var announceStyle={color: 'black'};
		var recordStyle={color: 'midnightblue'};
		if(winningPercent>50){
			recordStyle={color: 'limegreen'};
		} else if(winningPercent<50&&(winNo!==0||loseNo!==0)){
			recordStyle={color: 'coral'};
		}

		//game message set up
		if(this.props.currentCellId !== 999){
			if(cellDisplayContentStatus[this.props.currentCellId] === "💎"){
				announce = "You won!!! Please reset the game to start again";
				// game winning message inline color css
				announceStyle={color: 'mediumspringgreen'};
			} else if(this.props.currentClickCounter === 0 || cellDisplayContentStatus[this.props.currentCellId]==="💣"){
				announce = "You lost!!! Please reset the game to start gain";
				// game losing message inline color css
				announceStyle={color: 'red'};
			}
		}


		return(

			<div>
				<h1>Treasure Hunt</h1>
				<h2 style={announceStyle}>{announce} </h2>
				<h3 style={recordStyle}>No of Games: {totalNo}, Won :{winNo} Lost : {loseNo} Winning Percent : {winningPercent}%</h3>
				<form onSubmit={this.reset}>
					<button className="button1" type="submit">Reset</button>
				</form>
				<p> </p>
			</div>
			)
	}
}

export default Header;
