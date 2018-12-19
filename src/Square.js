import React, { Component } from 'react';

class Square extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="square-container" id={this.props.id} onClick={this.props.handleChangeFunc} >{this.props.answerStatus}
			</div>
			)
	}
}

export default Square;