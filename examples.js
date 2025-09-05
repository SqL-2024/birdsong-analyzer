// examples.js
// 示例音频数据与渲染
const topScores = [2.85, 2.92, 3.01, 3.08, 3.15, 3.22, 3.29, 3.35, 3.41, 3.48];
const bottomScores = [4.85, 4.72, 4.68, 4.61, 4.58, 4.52, 4.45, 4.38, 4.32, 4.25];
const topExampleData = topScores.map((score, i) => ({
    name: `High Score Bird Call ${i + 1}`,
    score: score,
    url: `https://example.com/bird_${i + 1}.mp3`
}));
const bottomExampleData = bottomScores.map((score, i) => ({
    name: `Low Score Bird Call ${i + 1}`,
    score: score,
    url: `https://example.com/bird_low_${i + 1}.mp3`
}));
function renderExamples() {
    const topExamples = document.getElementById('topExamples');
    const bottomExamples = document.getElementById('bottomExamples');
    topExamples.innerHTML = '';
    bottomExamples.innerHTML = '';
    topExampleData.forEach(item => {
        const li = document.createElement('li');
        li.className = 'example-item';
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>Score: ${item.score.toFixed(3)}</small>
            </div>
            <button class="play-btn" onclick="playExample('${item.url}')">Play</button>
        `;
        topExamples.appendChild(li);
    });
    bottomExampleData.forEach(item => {
        const li = document.createElement('li');
        li.className = 'example-item';
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>Score: ${item.score.toFixed(3)}</small>
            </div>
            <button class="play-btn" onclick="playExample('${item.url}')">Play</button>
        `;
        bottomExamples.appendChild(li);
    });
}
function playExample(url) {
    alert('This is an example audio link. In actual deployment, replace with real audio file URLs');
}
