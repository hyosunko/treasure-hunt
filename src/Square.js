import React, { Component } from 'react';

class Square extends Component{

	render(){

    var colDataStr = this.props.data.colWidthArray[0]
	var squareFontSizeStr = this.props.data.squareFontSize
	var squareFontSize = Math.ceil((colDataStr.substring(0,colDataStr.length-2)/100)*2)
	var squareFontSize = squareFontSize+'em'
	console.log("this.props: ", this.props)
	console.log("font size: ", squareFontSize)

    console.log("colDataStr in Square", colDataStr)

    // setup inline style data
    let squareStyle = {

    	display: 'grid',
  		height: colDataStr,
  		width: colDataStr,
	    border: '1px solid black',
		alignItems: 'center',
		fontSize: squareFontSize,
	    justifyContent: 'center',
    }


		return (
			<div style={squareStyle} className="square-container" id={this.props.id} onClick={this.props.handleChangeFunc} >{this.props.cellDisplayContentStatus}
			</div>
			)
	}
}

export default Square;