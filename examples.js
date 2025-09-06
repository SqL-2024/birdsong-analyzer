// examples.js
// 示例音频数据与渲染
// 平均分排名数据（科学结果）
const speciesRanking = [
    {
        latin: 'arvensis',
        score: 5.163862154,
        name: 'Eurasian Skylark',
        example: {
            url: 'https://xeno-canto.org/158166',
            score: 5.21,
            citation: 'Xeno-canto XC123456'
        }
    },
    {
        latin: 'rubecula',
        score: 5.134693441,
        name: 'European Robin',
        example: {
            url: 'https://xeno-canto.org/133862',
            score: 5.10,
            citation: 'Xeno-canto XC234567'
        }
    },
    {
        latin: 'calandra',
        score: 5.0668697,
        name: 'Corn Bunting',
        example: {
            url: 'https://example.com/calandra_example.mp3',
            score: 5.08,
            citation: 'Xeno-canto XC345678'
        }
    },
    {
        latin: 'troglodytes',
        score: 4.990308166,
        name: 'Eurasian Wren',
        example: {
            url: 'https://example.com/troglodytes_example.mp3',
            score: 4.99,
            citation: 'Xeno-canto XC456789'
        }
    },
    {
        latin: 'philomelos',
        score: 4.988703302,
        name: 'Song Thrush',
        example: {
            url: 'https://example.com/philomelos_example.mp3',
            score: 5.00,
            citation: 'Xeno-canto XC567890'
        }
    },
    {
        latin: 'pratensis',
        score: 4.733053944,
        name: 'Meadow Pipit',
        example: {
            url: 'https://example.com/pratensis_example.mp3',
            score: 4.75,
            citation: 'Xeno-canto XC678901'
        }
    },
    {
        latin: 'caeruleus',
        score: 4.621185368,
        name: 'Eurasian Blue Tit',
        example: {
            url: 'https://example.com/caeruleus_example.mp3',
            score: 4.62,
            citation: 'Xeno-canto XC789012'
        }
    },
    {
        latin: 'borin',
        score: 4.585495001,
        name: 'Garden Warbler',
        example: {
            url: 'https://example.com/borin_example.mp3',
            score: 4.59,
            citation: 'Xeno-canto XC890123'
        }
    },
    {
        latin: 'atricapilla',
        score: 4.574955747,
        name: 'Eurasian Blackcap',
        example: {
            url: 'https://example.com/atricapilla_example.mp3',
            score: 4.57,
            citation: 'Xeno-canto XC901234'
        }
    },
    {
        latin: 'fluviatilis',
        score: 4.528091765,
        name: 'River Warbler',
        example: {
            url: 'https://example.com/fluviatilis_example.mp3',
            score: 4.53,
            citation: 'Xeno-canto XC012345'
        }
    }
];

// 旧的高分/低分示例（可保留）
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
    // 平均分排名区域
    const rankingContainer = document.getElementById('speciesRanking');
    if (rankingContainer) {
        rankingContainer.innerHTML = '';
        speciesRanking.forEach((sp, idx) => {
            const div = document.createElement('div');
            div.className = 'species-ranking-item';
            div.innerHTML = `
                <div><strong>#${idx + 1} ${sp.name} (<i>${sp.latin}</i>)</strong></div>
                <div>Average Score: <span style="color:#d32f2f;font-weight:bold;">${sp.score.toFixed(3)}</span></div>
                <div class="example-recording">
                    <span>Example recording:</span>
                    <button class="play-btn" onclick="playExample('${sp.example.url}')">Play</button>
                    <span style="margin-left:10px;">Score: ${sp.example.score.toFixed(2)}</span>
                    <span style="margin-left:10px;font-size:0.9em;color:#666;">Citation: ${sp.example.citation}</span>
                </div>
            `;
            rankingContainer.appendChild(div);
        });
    }

    // 旧的高分/低分示例区域
    const topExamples = document.getElementById('topExamples');
    const bottomExamples = document.getElementById('bottomExamples');
    if (topExamples) {
        topExamples.innerHTML = '';
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
    }
    if (bottomExamples) {
        bottomExamples.innerHTML = '';
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
}
function playExample(url) {
    alert('This is an example audio link. In actual deployment, replace with real audio file URLs');
}
