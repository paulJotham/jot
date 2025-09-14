document.addEventListener("DOMContentLoaded", () => {
    const statusText = document.getElementById("statusText");
    const aiThinking = document.getElementById("aiThinking");
    const selectedMatches = document.getElementById("selectedMatches");

    fetch("data/sampleMatches.json")
        .then(res => res.json())
        .then(matches => {
            statusText.innerHTML = "🤖 Entity Pro is analyzing matches...";

            setTimeout(() => {
                aiThinking.innerHTML = "<h3>AI Analysis Log</h3>";
                matches.forEach(match => {
                    const div = document.createElement("div");
                    div.classList.add("match-item");

                    let confidenceClass = "confidence-low";
                    if (match.confidence >= 85) confidenceClass = "confidence-high";
                    else if (match.confidence >= 70) confidenceClass = "confidence-medium";

                    div.innerHTML = `
                        <span>${match.match} (${match.league})</span>
                        <span class="${confidenceClass}">Prediction: ${match.betType} (${match.confidence}%) | Odds: ${match.odds}</span>
                    `;

                    selectedMatches.appendChild(div);
                });

                statusText.innerHTML = "✅ Analysis complete. Predictions ready!";
            }, 2000);
        })
        .catch(err => {
            statusText.innerHTML = "❌ Failed to load matches.";
            console.error(err);
        });
});