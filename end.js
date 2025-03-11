const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const scoreMessage = document.getElementById("scoreMessage");

const mostRecentScore = localStorage.getItem('mostRecentScore');
const message = localStorage.getItem("scoreMessage");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore; // ✅ Show final score
scoreMessage.innerText = message; // ✅ Show feedback message

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const newScore = {
        score: mostRecentScore,
        name: username.value,
    };

    // ✅ Check if the username already exists
    const existingScoreIndex = highScores.findIndex(score => score.name === newScore.name);

    if (existingScoreIndex !== -1) {
        // ✅ Update the score if the new one is higher
        if (newScore.score > highScores[existingScoreIndex].score) {
            highScores[existingScoreIndex].score = newScore.score;
        }
    } else {
        // ✅ If username doesn't exist, add it
        highScores.push(newScore);
    }

    // ✅ Sort scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // ✅ Save to localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // ✅ Redirect to highscores page
    window.location.assign('./highscores.html');
};


