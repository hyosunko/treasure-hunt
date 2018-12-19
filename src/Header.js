import React, { Component } from 'react';

class Header extends Component{
	render(){

		let clickRemain = this.props.currentCount
		let anounce ="Click Count Remain : " + this.props.currentCount
		let currentSpace = this.props.currentSpace
		let answerStatus = this.props.answerStatus
		console.log("clickRemain: ",clickRemain)
		console.log("anounce: ",anounce)
		console.log("currentSpace: ",currentSpace)
		if(this.props.currentId !== 999){
			if(answerStatus[this.props.currentId] === "💎"){
				anounce = "You won!!! Please reset the game to start again"
				var countStyle={color: 'turquoise'}
			} else if(this.props.currentCount === 0 || answerStatus[this.props.currentId]==="💣"){
				anounce = "You lost!!! Please reset the game to start gain"
				var countStyle={color: 'red'}
			}
			
		}

		return(
			<div>
				<h1>Treasure Hunt</h1>
				<h2 style={countStyle}>{anounce} </h2>
				<form onSubmit={this.props.initFunc}>
					<button className="button1" type="submit">Reset</button>
				</form>
				<p> </p>
			</div>
			)
	}
}

export default Header;