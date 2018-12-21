import React, { Component } from 'react';


class Header extends Component{

	// reset board contents
	reset=(e)=>{
		// prevent page refresh
		e.preventDefault()
		// call board initialize function
		this.props.initFunc()
	}

	// resize board contents
	resize= e=>{
		e.preventDefault()
		// call board resize function
		this.props.resizeBoardFunc()
	}

	render(){

    
		let clickRemain = this.props.currentClickCounter
		let announce ="Remain Click Counts : " + clickRemain
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
	    let styleSheet = document.styleSheets[0];
	    let animationName = `bliner`;
	    let aniDuration= '7s';
	    let keyframes =
	    `@-webkit-keyframes ${animationName} {
	    		0%{color: crimson;}
				7%{color: transparent;}
				14%{color: lime;}
				21%{color: transparent;}
				28%{color: deeppink;}
				35%{color: transparent;}
				42%{color: steelblue;}
				49%{color: transparent;}
				56%{color: fuchsia;}
				63%{color: transparent;}
				70%{color: springgreen;}
				77%{color: transparent;}
				84%{color: goldenrod;}
				91%{color: transparent;}
				100%{color: crimson;}
	    }`;
		styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

		//select animation for click remains > 2 then black color		
		if(clickRemain>2){
			var announceStyle={color: 'black'};
		//click remain =2, blinking color anim.
		} else if(clickRemain>1){
			var announceStyle={
			    animationName: animationName,
			    animationTimingFunction: 'ease-in-out',
			    animationDuration: aniDuration,
			    animationIterationCount: 'infinite',
			};
		//click remain =1, faster blinking 
		} else {
			aniDuration= '3s'
			var announceStyle={
			    animationName: animationName,
			    animationTimingFunction: 'ease-in-out',
			    animationDuration: aniDuration,
			    animationIterationCount: 'infinite',
			};
		}

		//change colors by winning percentages
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

		//Submit button size setup
	    let inputSubmitStyle ={
	      width:'auto'
	    }

		return(
			<div>
				<h1>Treasure Hunt</h1>

		        {/*board resize form*/}
		        <div>
			    	<form onSubmit={this.resize}>
			        	<h3>Do you want to resize board?<br/> 
			            Width: <input type="number" id="width" min="2" max="10" required/>
			            Height: <input type="number" id="height" min="1" max="10" required/>
			            <input className="space" style={inputSubmitStyle} type="submit" value="Submit" />
			            </h3>
			        </form>
		        </div>

		        {/*click counter message & win or lose message*/}
				<h2 style={announceStyle}>{announce} </h2>

		        {/*no of games, win, and loses, and percentage*/}
				<h3 style={recordStyle}>No of Games: {totalNo}, Won :{winNo} Lost : {loseNo} <br/>
				 Winning Percent : {winningPercent}%</h3>
		        {/*game reset button*/}
				<form onSubmit={this.reset}>
					<button className="button1" type="submit">Reset</button>
				</form>
				<p> </p>
			</div>
			)
	}
}

export default Header;
