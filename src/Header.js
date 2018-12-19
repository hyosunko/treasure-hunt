import React, { Component } from 'react';

class Header extends Component{

	render(){

		let clickRemain = this.props.currentClickCounter
		let announce ="Click Count Remain : " + clickRemain
		let cellDisplayContentStatus = this.props.cellDisplayContentStatus

		console.log("clickRemain: ",clickRemain)
		// click message inline color css
		var announceStyle={color: 'black'};

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
				<form onSubmit={this.props.initFunc}>
					<button className="button1" type="submit">Reset</button>
				</form>
				<p> </p>
			</div>
			)
	}
}

export default Header;