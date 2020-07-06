const highScores = JSON.parse(localStorage.getItem('highScored')) || [];
const highScoresList = document.getElementById('list')

highScoresList.innerHTML = highScores.map(score => {
    // it returns an array
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");

//document.getElementById('highScoresList').innerHTML = 'ciaoooo';