import React, { Component } from 'react';

class Square extends Component{

	render(){
		return (
			<div className="square-container" id={this.props.id} onClick={this.props.handleChangeFunc} >{this.props.cellDisplayContentStatus}
			</div>
			)
	}
}

export default Square;