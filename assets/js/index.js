'use strict';

const buttonUno = document.getElementById('buttonUno');
const score = document.getElementById('score');
const bestScore = document.getElementById('bestScore');
const bestScore2 = document.getElementById('bestScore2');
const bestScore3 = document.getElementById('bestScore3');
const bestScore4 = document.getElementById('bestScore4');
const bestScore5 = document.getElementById('bestScore5');
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

// Best scores
let bestscores = [];

// localStorage.clear();

if (localStorage.BS) {
    bestscores = localStorage.BS.split(',');
    console.log(`Saved scores: ${bestscores}`);
    logBestScore(bestscores);
}

function countDown() {
    if (started) {
        clockTimer--;
        timer.innerHTML = `Time: ${clockTimer}`;

        if (clockTimer >= 0 && clockTimer <= 3) {
            endAudio.play();
        }

        else if (clockTimer <= 0) {
            checkingScore();
        }
    }
}


function logBestScore(bestscores) {
    document.getElementById('scoreboard').innerHTML = '';

    const scoreTitle = document.createElement('p')
    scoreTitle.innerHTML = `Top 5 Best Scores`;
    document.getElementById('scoreboard').appendChild(scoreTitle);

    for (let i = 0; i < 5; i++) {
        if (bestscores[i]) {
            const score = document.createElement('p')
            score.innerHTML = `${[i + 1]}. ${bestscores[i]}`;
            document.getElementById('scoreboard').appendChild(score);
            localStorage.setItem('BS', bestscores);
        }
    }

    console.log(`local storage rn: ${localStorage.BS}`);
}

function checkingScore() {
    // let benchmark = bestScore.innerHTML.replace(/[^0-9]/g, '');
    // console.log(benchmark);

    bestscores.push(scoreCounter);
    bestscores.sort((a, b) => { return b - a });

    logBestScore(bestscores);

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











function loop() {
    bgMusic.play();

    countDown();

    if (wait > 0) {
        wait--;
        buttonUno.innerHTML = `Wait for a moment`;
        // console.log(wait);
    }
    else if (wait == 0 && scoreCounter == -1) {
        buttonUno.innerHTML = 'Click <strong>Here</strong> to start';
    }
}

setInterval(loop, 1000);