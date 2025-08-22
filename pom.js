

document.addEventListener('DOMContentLoaded', () => {
    // setTimer buttons ( 25min = |1500|  30min= |1800|  35min =|2100|)
    
    document.getElementById("resetBtn").addEventListener("click", () => { timer.resetTimer(); });
    document.getElementById("startBtn").addEventListener("click", () => { timer.startTimer(); });
    const inputNumber = document.getElementById("customValue");
    // set timers to the appropriate button clicked
   document.querySelectorAll(".timerBtn").forEach(button =>{
        button.addEventListener("click",()=> {
            let seconds;
            if (button.id === "customTime"){
             // set seconds to the user input time
                seconds = parseInt(document.getElementById("customValue").value);
                if (isNaN(seconds) || seconds < 0 || seconds > 3600){
                    //alert("enter a valid number of seconds 1-3600");
                    inputNumber.value = "";
                    inputNumber.style.backgroundColor = "#ffb3b3";
                    inputNumber.placeholder = "Invalid number";
                    return;
                }else{
                    inputNumber.value = "";
                    inputNumber.style.backgroundColor = "#ffffff";
                    inputNumber.placeholder = "Custom number:";
                }
            }else{
                seconds = parseInt(button.value);
            }
            
            timer.setTimer(seconds);
        });
    });
     document.addEventListener("keydown", (event) => {
        if (event.key === " "){
            event.preventDefault();
            timer.startTimer();
        }
        if (event.key === "r"){
            event.preventDefault();
            timer.resetTimer();
        }
    });
   
});


const startButton = document.getElementById("startBtn");
let seconds = 0;
const totalElapsedTime = document.getElementById("totalTime");
const timer = {
    running : null,
    newTime : seconds,
    interId : null,
    totalElapsedTime : 0,
    
    incrementTotalTime() {
        this.totalElapsedTime++;
        document.getElementById("totalTime").textContent = this.totalElapsedTime;
    },
    runTime(){
        if (!this.running){ // return with nothing since 
            return;
        }
        if (this.newTime > 0){
            this.newTime = this.newTime - 1;
            document.getElementById("timerDisplay").textContent = this.newTime;
            this.incrementTotalTime();
        }else{
            alert("Time is up !");
            clearInterval(this.interId);
            this.resetTimer();
            this.running = false;
            return;
        }
    },
    
    startTimer(){
        if (!this.running){
            if (this.newTime == 0){ // 
                alert("cannot start. Set the timer");
                return;
            }
            //alert("This is working");
            this.running = true;
            // change the start button to a pause button
            document.getElementById("startBtn").textContent = "Pause";
            startButton.style.backgroundColor = "#ff3333";
            this.interId = setInterval(() => {this.runTime()}, 1000);
        }else { // this is currently displaying "Pause"
            //enter the logic to postpone the timer that is running
            this.pauseTimer();
            document.getElementById("startBtn").textContent = "Start";
            startButton.style.backgroundColor = "#4CAF50";
            this.running = false;
            }
        },
    pauseTimer(){
        clearInterval(this.interId);
        this.interId = null;
    },

    resetTimer(){
        
        this.newTime = 0;
        clearInterval(this.interId); // clear the interval to avoid loopovers
        this.interId = null;

        //reset button to Start (previously "Pause")
        if (this.running){
            document.getElementById("startBtn").textContent = "Start";
            startButton.style.backgroundColor = "#4CAF50";
        }

        document.getElementById("timerDisplay").textContent = "0000"; // set timer

        //timer in not running anymore ( set running to false )
        this.running = false;
    },
    setTimer(seconds){
        // declare the new time
        
        this.newTime = seconds;
        this.running = false;
        clearInterval(this.interId);
        this.interId = null;
        document.getElementById("startBtn").textContent = "Start";
        document.getElementById("timerDisplay").textContent = this.newTime;
    },
};



function calculatorPage () {
    window.location = "calc.html";
};


