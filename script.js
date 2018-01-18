var buttonState = "play";
var timerState = "work";
const buttonHolder = document.getElementById("buttonHolder");
var keyNames = ["timeUp","play", "timeDown"];
var storedMinutes = 25;

//initiate timer to 25:00
document.getElementById('timer').innerHTML =
  storedMinutes+ ":0" + 0;

document.getElementById('workTime').innerHTML = "Current Work Time is: " + storedMinutes;



//add buttons to screen
for (var i = 0; i<keyNames.length; i++){
		const button = document.createElement('img');
		button.classList.add('button');
		button.setAttribute('id',keyNames[i]);
		if(keyNames[i] == "play"){
			button.setAttribute('src', "./buttons/"+keyNames[i]+".svg")
		}
		else{
		button.setAttribute('src', "./buttons/"+keyNames[i]+".png")
		}
		buttonHolder.appendChild(button);
	}

//gives the play/pause button functionality when clicked
function playButtonClicked(){
	var button = document.getElementById("play");
	button.addEventListener('mousedown', function(e){
			if(buttonState == "play"){
				button.setAttribute('src',"./buttons/pause.svg");
				buttonState = "pause";
				runTimer();
			}
			else if (buttonState == "pause"){
				button.setAttribute('src',"./buttons/play.svg");
				buttonState="play";

				
			}
			});
		}
playButtonClicked();


//give arrow buttons functionality
function arrowsClicked(){
	var buttonNames = ["timeUp", "timeDown"];
	var timer = document.getElementById("timer");
	var newM;
	for(var i =0; i<buttonNames.length; i++){
		var button = document.getElementById(buttonNames[i]);
		button.addEventListener('mousedown', function(e){
			var presentTime = timer.innerHTML;
			var timeArray = presentTime.split(/[:]+/);
			var m = parseInt(timeArray[0]);
			if(this.id=="timeUp"){
				 storedMinutes = m+1;
				document.getElementById('workTime').innerHTML = "Current Work Time is: " + storedMinutes;

			}
			if(this.id=="timeDown"){
			     storedMinutes = m-1;
			     document.getElementById('workTime').innerHTML = "Current Work Time is: " + storedMinutes;

			     
			}
			if(buttonState =="play"){
			timer.innerHTML = storedMinutes +":0" + 0;
			}
			else{
			alert("pause before changing time");
			}
			});
		}
	}
arrowsClicked();

function runTimer(){
	if(buttonState== "play"){
		return;
	}
	else{
	var timer = document.getElementById("timer");
	var presentTime = timer.innerHTML;
	var timeArray = presentTime.split(/[:]+/);
	var m = parseInt(timeArray[0]);
	var s = checkSecond(parseInt(timeArray[1])-1); 
	if(m ==0 && s==0 && timerState =="work"){
		m = 5;
		s = checkSecond(0);
		timerState= "play";
	}
	if(m ==0 && s==0 && timerState =="play"){
		m = 2;
		s = checkSecond(0);
		timerstate="work";
	}
	if(s ==59){
		m=m-1;
	}
	document.getElementById('timer').innerHTML =
    	m + ":" + s;
    	setTimeout(runTimer,1000);
    }
}

//keeps seconds correct (Reset to 59 if below 0, add leading 0 to numbers less than 10.)
function checkSecond(currentS){
	if(currentS >=0 && currentS <10){
		currentS = "0" +currentS;
	}
	if(currentS<0){
		currentS=59;
	}
	return currentS;
}





 


