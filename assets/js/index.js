'use strict';

const buttonUno = document.getElementById('buttonUno');
const score = document.getElementById('score');
const bestScore = document.getElementById('bestScore');
const timer = document.getElementById('timer');

// audio
const startAudio = new Audio('assets/othr/sound.mp3');
const endAudio = new Audio('assets/othr/audio2.mp3');
const bgMusic = new Audio('assets/othr/bgmusic.mp3')
endAudio.type = 'audio/mp3';
startAudio.type = 'audio/mp3';
bgMusic.type = 'audio/mp3';

// Start or no bool
let started = false;
let wait = 0;

// Timer
let clockTimer = 15;
let timout = setTimeout(5000);

// Score counter
let scoreCounter = 0;

function countDown() {
    if (started) {
        clockTimer--;
        timer.innerHTML = `Time: ${clockTimer}`;

        if (clockTimer >= 0 && clockTimer <= 3) {
            endAudio.play();
        }

        if (clockTimer == 0) {
            checkingScore();
        }
    }
}

function checkingScore() {
    let benchmark = bestScore.innerHTML.replace(/[^0-9]/g, '');
    console.log(benchmark);

    if (benchmark <= scoreCounter) {
        bestScore.innerHTML = `Best Score: ${scoreCounter}`;
    }

    started = false;
    scoreCounter = -1;
    buttonUno.innerHTML = 'Click <strong>Here</strong> to start';

    clockTimer = 15;
    timer.innerHTML = `Time: - -`;

    wait = 3;
}

buttonUno.onclick = function () {
    if (wait == 0) {
        if (!started) {
            started = true;
            scoreCounter++;
            this.innerHTML = 'Start clicking!'
            startAudio.play();
        }
        else if (started) {
            scoreCounter++;
            this.innerHTML = `Score: ${scoreCounter}`;
        }
    }
}

function loop () {
    bgMusic.play();
    
    countDown();
    
    if (wait > 0) {
        wait--;
        buttonUno.innerHTML = `Wait for a moment`;
        console.log(wait);
    } 
    else if (wait == 0 && scoreCounter == -1){
        buttonUno.innerHTML = 'Click <strong>Here</strong> to start';
    }
}

setInterval(loop, 1000);