let phrases = [
"FRIENDS",
"SILICON-VALLEY",
"BREAKING-BAD",
"THE-OFFICE",
"GAME-OF-THRONES",
"THE-BIG-BANG-THEORY",
"STAR-WARS",
"LORD-OF-THE-RINGS",
"THE-GODFATHER",
"IRON-MAN",
"BATMAN",
"HARRY-POTTER",
"TAYLOR-SWIFT",
"JOHN-LENNON",
"FREDDIE-MERCURY",
"LADY-GAGA",
"EMINEM",
"ED-SHEERAN"
];

let phrase_hint = [
"Stars six main characters",
"Bay Area",
"The greatest cooking show ever",
"A documentary about paper",
"Anti-climatic",
"187IQ",
"4th May",
"You shall pass this question",
"The greatest film ever?",
"3000",
"When a billionaire cosplays",
"Boy spends 7 years third-wheeling",
"Breakup song",
"Jesus?",
"Closest to the sun",
"A grammy + an Oscar",
"Wtf did he say?",
"BODMAS rule"
];

let phrase_category = [
"TV Show",
"Movie Franchise",
"Singer"
];

let answer = "";
let maxwrong = 6;
let mistakes = 0;
let guessed = ['-'];
let wordStatus = null;
let category = "";
let hint = "";


function randomWord() {
	let randomIndex = Math.floor(Math.random() * phrases.length);
	answer = phrases[randomIndex];
	category = phrase_category[Math.floor(Number(randomIndex)/6)];
	hint = phrase_hint[randomIndex];
	console.log(category);
	document.getElementById("category").innerHTML = "Category: " + category;
}


function generateButtons() {
  let buttonsList1 = 'ABCDEFGHIJKLM'.split('').map(letter =>
  	`
  	<button
  		class="btn btn-lg btn-primary m-2"
  		id='` + letter + `'
  		onClick="handleGuess('` + letter + `')"
  	>
  	`+ letter +`</button>`
  	).join(' ');
  let buttonsList2 = 'NOPQRSTUVWXYZ'.split('').map(letter =>
  	`
  	<button
  		class="btn btn-lg btn-primary m-2"
  		id='` + letter + `'
  		onClick="handleGuess('` + letter + `')"
  	>
  	`+ letter +`</button>`
  	).join(' ');

 	document.getElementById('keyboard').innerHTML = buttonsList1 + '<br>' + buttonsList2;
}


function handleGuess(selectedLetter)	{
	guessed.indexOf(selectedLetter) == -1 ? guessed.push(selectedLetter) : null;
	document.getElementById(selectedLetter).setAttribute('disabled', true);

	if(answer.indexOf(selectedLetter) >= 0) {
		guessedWord();
		checkWin();
	}
	else {
		mistakes++;
		updateMistakes();
		checkLoss();
	}
}

function checkWin() {
	if(wordStatus.split(' ').join('') == answer.split('-').join('')) {
		document.getElementById('keyboard').innerHTML = wordStatus + " is correct! You Won!!!";
		document.getElementById('hangmanpic').src = "./imgs/0.png"
	}
}

function checkLoss() {
	if(mistakes == maxwrong) {
		document.getElementById('wordSpotlight').innerHTML = "The answer was: " + answer.split('-').join('  '); 
		document.getElementById('keyboard').innerHTML = "You Lost :(";

	}
}

function updateMistakes() {
	document.getElementById('mistakes').innerHTML = mistakes;
	document.getElementById('hangmanpic').src = "./imgs/" + mistakes + ".png"
}


function guessedWord()	{
	wordStatus = answer.split('').map(letter => (letter == '-' ? '  ' : (guessed.indexOf(letter) >= 0 ? letter+' ' : "_ "))).join('');
	document.getElementById("wordSpotlight").innerHTML ='<pre>' + wordStatus + '</pre>';

}

function reset() {
	mistakes = 0;
	guessed = ['-'];
	wordStatus = null;
	category = null;
	hint = null;
	document.getElementById('hangmanpic').src = "./imgs/0.png";
	document.getElementById("category").innerHTML = "";
	randomWord();
	guessedWord();
	updateMistakes();
	generateButtons();
}

function getHint()	{
	document.getElementById("myPopup").innerHTML = hint;
	document.getElementById("myPopup").classList.toggle("show");
}


document.getElementById('maxWrong').innerHTML = maxwrong;


randomWord();
generateButtons();
guessedWord();