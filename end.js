const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreButton');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const max_high_scores = 5;

finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', ()=>{
    saveScoreButton.disabled = !username.value;
});

saveHighScore= (e)=>{
    e.preventDefault();
    
    const score = {
        //score: Math.floor(Math.random() * 100),
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a, b)=> b.score - a.score);
    highScores.splice(5);


    localStorage.setItem('highScored', JSON.stringify(highScores));
    window.location.assign('/');
};



