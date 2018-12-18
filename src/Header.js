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
		if(this.props.currentId === 999){
			anounce = anounce
		} else {
			if(answerStatus[this.props.currentId] === "treasure" || answerStatus[this.props.currentId]==="bomb"){
				anounce = "You won!!! Please reset the game to start again"
			} else if(this.props.currentCount === 0){
				anounce = "You lost!!! Please reset the game to start gain"
			}
			
		}

		return(
			<div>
				<h1>Treasure Hunt</h1>
				<h3>{anounce} </h3>
				<form onSubmit={this.props.initFunc}>
					<button type="submit">Reset</button>
				</form>
				<p> </p>
			</div>
			)
	}
}

export default Header;