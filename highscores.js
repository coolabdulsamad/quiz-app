const highScoresBody = document.getElementById("highScoresBody");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// ✅ Display All High Scores with Delete Button
const displayScores = () => {
    highScoresBody.innerHTML = highScores
        .map((score, index) => {
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${score.name}</td>
                    <td>${score.score}</td>
                    <td><button class="delete-btn" onclick="deleteScore(${index})">Delete</button></td>
                </tr>`;
        })
        .join("");
};

// ✅ Delete Score Function
const deleteScore = (index) => {
    if (confirm("Are you sure you want to delete this score?")) {
        highScores.splice(index, 1); // Remove the score
        localStorage.setItem("highScores", JSON.stringify(highScores)); // Update localStorage
        displayScores(); // Refresh the table
    }
};

// ✅ Initial Display
displayScores();
