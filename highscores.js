const highScoresBody = document.getElementById("highScoresBody");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// ✅ Display All High Scores in a Table
highScoresBody.innerHTML = highScores
  .map((score, index) => {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${score.name}</td>
        <td>${score.score}</td>
      </tr>`;
  })
  .join("");
