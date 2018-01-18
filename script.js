var buttonState = "play";
var timerState = "work";
const buttonHolder = document.getElementById("buttonHolder");
var storedMinutes = 25;
var storedRest = 5;

//initiate timer to 25:00
document.getElementById('timer').innerHTML =
  storedMinutes+ ":0" + 0;

document.getElementById('storedTimes').innerHTML = "Current Work Time is: " + storedMinutes + "minutes" + "||Current Rest Time is: " + storedRest + "minutes";



//add buttons to screen
var keyNames = ["timeUp", "timeDown" ,"play", "restUp", "restDown"];
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
	var buttonNames = ["timeUp", "timeDown", "restUp","restDown"];
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
				 document.getElementById('storedTimes').innerHTML = "Current Work Time is: " + storedMinutes + "minutes" + "||Current Rest Time is: " + storedRest + "minutes";

			}
			if(this.id=="timeDown"){
			     storedMinutes = m-1;
			     if(storedMinutes<1){
			     	alert("you can't work for less than one minute!")
			     	storedMinutes = 1;
			     }
				 document.getElementById('storedTimes').innerHTML = "Current Work Time is: " + storedMinutes + "minutes" + "||Current Rest Time is: " + storedRest + "minutes";
			}
			if(this.id=="restUp"){
				 storedRest = storedRest+1;
				 document.getElementById('storedTimes').innerHTML = "Current Work Time is: " + storedMinutes + "minutes" + "||Current Rest Time is: " + storedRest + "minutes";

			}
			if(this.id=="restDown"){
			     storedRest = storedRest-1;
			     if(storedRest<1){
			     	alert("you need to rest for at least a minute!")
			     	storedRest = 1;
			     }
				 document.getElementById('storedTimes').innerHTML = "Current Work Time is: " + storedMinutes + "minutes" + "||Current Rest Time is: " + storedRest + "minutes";
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
	if(buttonState== "play"){ //timer is paused
		return;
	}
	else{
	var timer = document.getElementById("timer");
	var presentTime = timer.innerHTML;
	var timeArray = presentTime.split(/[:]+/);
	var m = parseInt(timeArray[0]);
	var s = checkSecond(parseInt(timeArray[1])-1); 
	if(m ==0 && s==0 && timerState =="work"){ //work clock just ended
		m = storedRest;
		s = checkSecond(0);
		timerState= "play"; 
	}
	if(m ==0 && s==0 && timerState =="play"){ //play clock just ended
		m = storedMinutes;
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





 


