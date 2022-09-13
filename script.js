const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const time = document.querySelector('#time-left');
const score = document.querySelector('#score');
let start = document.querySelector('.start');
let result = 0;
let hitPosition;
let currentTime = 60;
let modal = document.querySelector('.modal');
let timerId = null;
let countDownTimer;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    });
    let randomPosition = squares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');
    hitPosition = randomPosition.id;
}
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition && currentTime!==0) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 300)
}

function countDown() {
    currentTime--;
    time.textContent = currentTime;
    if(currentTime==0){
        clearInterval(countDownTimer);
        modal.classList.add('showOn');
        modal.innerHTML = `GAME OVER! Your final score is ${result}:) <button class='restart'>Restart the game</button>`;
        clearInterval(timerId);
        document.querySelector('.restart').addEventListener('click', ()=>{
            start.disabled= false;
            location.reload();
        })
    }
}

start.addEventListener('click', (e)=> {
    countDownTimer = setInterval(countDown, 1000);
    moveMole();
    e.target.disabled = true;
})