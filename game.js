const question = document.getElementById('question');
// document.getElementsByClassName('choice-text') is a HTML collection so we put it in Array
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=20&difficulty=medium")
.then(res=>{
    // it return the body
    return res.json();
}).then(loadedQuestions => {
   questions= loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() *3) + 1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
        
        answerChoices.forEach((choice,index) => {
            formattedQuestion["choice" +(index+1)]=choice;
        });

        return  formattedQuestion;
    });
    startGame();
}).catch(err=> {
    console.err(err);
});

// contants
const correct_bonus = 10;
const max_questions = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions= [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');

}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= max_questions){

        localStorage.setItem('mostRecentScore',score);
        //go to the end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = "Question "+questionCounter + "/" + max_questions;

    //update the progress bar
    progressBarFull.style.width = `${(questionCounter/max_questions) *100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers= true;
    
};

choices.forEach(choice=>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer =selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect';

        if (classToApply == 'correct') {
            incrementScore(correct_bonus);
        }
        //we add the class on the parent element of the selected choise
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;

}
