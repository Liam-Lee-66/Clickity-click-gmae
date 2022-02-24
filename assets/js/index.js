'use strict';

const buttonUno = document.getElementById('buttonUno');
const score = document.getElementById('score');
const bestScore = document.getElementById('bestScore');
const timer = document.getElementById('timer');

// audio
// Windows XP error sound is used
const startAudio = new Audio('assets/othr/sound.mp3');
const endAudio = new Audio('assets/othr/audio2.mp3');
endAudio.type = 'audio/mp3';
startAudio.type = 'audio/mp3';

// Start or no bool
let started = false;

// Timer
let clockTimer = 15;

// Score counter
let scoreCounter = 0;

function countDown() {
    if (started) {
        clockTimer--;
        timer.innerHTML = `Time: ${clockTimer}`;

        if (clockTimer >= 0 && clockTimer <=3) {
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
    scoreCounter = 0;
    buttonUno.innerHTML = 'Click here to start';

    clockTimer = 15;
    timer.innerHTML = `Time: - - : - -`;
}

buttonUno.onclick = function () {
    if (!started) {
        started = true;
        this.innerHTML = 'Start clicking!'
        startAudio.play();
    }
    else if (started) {
        scoreCounter++;
        this.innerHTML = `Score: ${scoreCounter}`;
    }
}

setInterval(countDown, 1000);