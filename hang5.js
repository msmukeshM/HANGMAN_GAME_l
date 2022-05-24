var programming_languages = [
  "PYTHON",
  "JAVASCRIPT",
  "MONGODB",
  "JSON",
  "JAVA",
  "HTML",
  "CSS",
  "C",
  "CSHARP",
  "GOLANG",
  "KOTLIN",
  "PHP",
  "SQL",
  "RUBY",
  "TYPESCRIPT",
  "PLSQL",
  "MATLAB",
  "BASIC",
  "COBOL",
  "ECMASCRIPT",
  "GO",
  "GOTRAN",
  "GROOVY",
  "SQL",
  "OAK",
  "UNITY",
  "XPL",
];
let flag = 0;
let timer = 40;
let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
const countdown = document.getElementById("timerarea");

/*generate a rondom word from the list of words
1)Math.floor() rounds a number DOWN to the nearest integer:
2)Math.random() returns a random number between 0 (included) and 1 (excluded) and multiply with array length*/
function randomWord() {
  answer =
    programming_languages[
      Math.floor(Math.random() * programming_languages.length)
    ];
}

/* function to generate keyboard buttons on screen
 1) the split method splits a string into anarray of substrings
 and returns the array
 2)map function The Array.map() method creates a new array from the results of calling a function for every element numbers.
 3)function(letter: string): string*/
/*passing the letter to handle guess fun*/
function generateButtons() {
  let buttonsHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map(
      (letter) =>
        `
      <button
        class="jsbutton"
        id='` +
        letter +
        `'
        onClick="handleGuess('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

/*if chosen letter does not exist put it in guessed array if it does do nothing that making the button disabled if pressed once
1)indexOf() returns the position of the first occurrence of a value in a string.*/
function handleGuess(chosenLetter) {
  /*index will be -1 if the letter not present in guessed array*/
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  /*the letter is the id fot that button, we dissable the button*/
  document.getElementById(chosenLetter).setAttribute("disabled", true);

  /*if the letter exits in the word (the answer string), call the guessword
  function to update the leters */
  if (answer.indexOf(chosenLetter) >= 0) {
    clickbtn.play();
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    /*if the does not exist*/
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

/*since we updated the guessed arrary after click we are checking if the letter exist in the guessed array that we have already guessed if yes >0(and put that letter in that place) ifnot -1(put _ in that place)*/
function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!!!";
    wisnd.play();
    document.getElementById("timerarea").innerHTML = "DONE";
    flag = 1;
  }
}

function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was: " + answer;
    document.getElementById("keyboard").innerHTML = "You Lost!!!";
    outsound.play();
    flag = 2;
  }
}

function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "./images/" + mistakes + ".jpg";
  hang.play();
}

function reset() {
  musres.play();
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").src = "./images/0.jpg";
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  timer = 40;
  flag = 0;
  startClock();
}

const outsound = new Audio();
outsound.src = "./sound/gameover.mp3";

const wisnd = new Audio();
wisnd.src = "./sound/gamewon.mp3";

const clickbtn = new Audio();
clickbtn.src = "./sound/gta.mp3";

const hang = new Audio();
hang.src = "./sound/hanging.mp3";

const musres = new Audio();
musres.src = "./sound/musres.wav";

function Startfn() {
  document.getElementById("buttonstart").style = "display:none";
  document.getElementById("start").style = "display:";
  randomWord();
  generateButtons();
  guessedWord();
  flag = 0;

  startClock();
}

function startClock() {
  countdown.innerHTML = "Time Remaining: " + timer;
  if (flag == 1) {
    countdown.innerHTML = "WELL DONE";
    return;
  }
  if (flag == 2) {
    countdown.innerHTML = "TRY AGAIN";
    return;
  }
  if (timer <= 0 && flag !== 1) {
    gameover();
  } else {
    --timer;
    runningTimer = setTimeout(startClock, 1000);
  }
}

function gameover() {
  //randomWord();
  //generateButtons();
  // guessedWord();
  //startClock();
  document.getElementById("wordSpotlight").innerHTML =
    "The answer was: " + answer;
  document.getElementById("keyboard").innerHTML = "You Lost!!!";
  outsound.play();
}
