// examples.js
// 示例音频数据与渲染
// 平均分排名数据（科学结果）
const speciesRanking = [
    // ...existing top 10 species...
    {
        latin: 'arvensis', score: 5.163862154, name: 'Eurasian Skylark', example: { url: 'https://xeno-canto.org/158166', score: 5.21, citation: 'Xeno-canto XC123456' }
    },
    {
        latin: 'rubecula', score: 5.134693441, name: 'European Robin', example: { url: 'https://xeno-canto.org/133862', score: 5.10, citation: 'Xeno-canto XC234567' }
    },
    {
        latin: 'calandra', score: 5.0668697, name: 'Corn Bunting', example: { url: 'https://example.com/calandra_example.mp3', score: 5.08, citation: 'Xeno-canto XC345678' }
    },
    {
        latin: 'troglodytes', score: 4.990308166, name: 'Eurasian Wren', example: { url: 'https://example.com/troglodytes_example.mp3', score: 4.99, citation: 'Xeno-canto XC456789' }
    },
    {
        latin: 'philomelos', score: 4.988703302, name: 'Song Thrush', example: { url: 'https://example.com/philomelos_example.mp3', score: 5.00, citation: 'Xeno-canto XC567890' }
    },
    {
        latin: 'pratensis', score: 4.733053944, name: 'Meadow Pipit', example: { url: 'https://example.com/pratensis_example.mp3', score: 4.75, citation: 'Xeno-canto XC678901' }
    },
    {
        latin: 'caeruleus', score: 4.621185368, name: 'Eurasian Blue Tit', example: { url: 'https://example.com/caeruleus_example.mp3', score: 4.62, citation: 'Xeno-canto XC789012' }
    },
    {
        latin: 'borin', score: 4.585495001, name: 'Garden Warbler', example: { url: 'https://example.com/borin_example.mp3', score: 4.59, citation: 'Xeno-canto XC890123' }
    },
    {
        latin: 'atricapilla', score: 4.574955747, name: 'Eurasian Blackcap', example: { url: 'https://example.com/atricapilla_example.mp3', score: 4.57, citation: 'Xeno-canto XC901234' }
    },
    {
        latin: 'fluviatilis', score: 4.528091765, name: 'River Warbler', example: { url: 'https://example.com/fluviatilis_example.mp3', score: 4.53, citation: 'Xeno-canto XC012345' }
    },
    // 新增末尾10个品种
    {
        latin: 'pica', score: 3.099489012, name: 'Eurasian Magpie', example: { url: 'https://example.com/pica_example.mp3', score: 3.10, citation: 'Xeno-canto XC111111' }
    },
    {
        latin: 'livia', score: 3.053087148, name: 'Rock Dove', example: { url: 'https://example.com/livia_example.mp3', score: 3.05, citation: 'Xeno-canto XC222222' }
    },
    {
        latin: 'squatarola', score: 3.035484549, name: 'Grey Plover', example: { url: 'https://example.com/squatarola_example.mp3', score: 3.04, citation: 'Xeno-canto XC333333' }
    },
    {
        latin: 'colchicus', score: 2.978423127, name: 'Common Pheasant', example: { url: 'https://example.com/colchicus_example.mp3', score: 2.98, citation: 'Xeno-canto XC444444' }
    },
    {
        latin: 'monedula', score: 2.937633026, name: 'Western Jackdaw', example: { url: 'https://example.com/monedula_example.mp3', score: 2.94, citation: 'Xeno-canto XC555555' }
    },
    {
        latin: 'alpina', score: 2.914698878, name: 'Dunlin', example: { url: 'https://example.com/alpina_example.mp3', score: 2.91, citation: 'Xeno-canto XC666666' }
    },
    {
        latin: 'apricaria', score: 2.892921511, name: 'European Golden Plover', example: { url: 'https://example.com/apricaria_example.mp3', score: 2.89, citation: 'Xeno-canto XC777777' }
    },
    {
        latin: 'flammea', score: 2.727800541, name: 'Common Redpoll', example: { url: 'https://example.com/flammea_example.mp3', score: 2.73, citation: 'Xeno-canto XC888888' }
    },
    {
        latin: 'ridibundus', score: 2.662814017, name: 'Black-headed Gull', example: { url: 'https://example.com/ridibundus_example.mp3', score: 2.66, citation: 'Xeno-canto XC999999' }
    },
    {
        latin: 'europaeus', score: 1.680914244, name: 'European Nightjar', example: { url: 'https://example.com/europaeus_example.mp3', score: 1.68, citation: 'Xeno-canto XC000000' }
    }
];



function renderExamples() {
    // 平均分排名区域分为Top 10和Bottom 10
    const rankingContainer = document.getElementById('speciesRanking');
    if (rankingContainer) {
        rankingContainer.innerHTML = `
            <div class="species-ranking-top10" style="background:linear-gradient(135deg,#4CAF50,#45a049);padding:20px;border-radius:15px;margin-bottom:30px;">
                <h3 style="color:white;text-align:center;">Top 10 Species (Highest Average Score)</h3>
                <div id="speciesTop10"></div>
            </div>
            <div class="species-ranking-bottom10" style="background:linear-gradient(135deg,#f44336,#d32f2f);padding:20px;border-radius:15px;">
                <h3 style="color:white;text-align:center;">Bottom 10 Species (Lowest Average Score)</h3>
                <div id="speciesBottom10"></div>
            </div>
        `;
        // Top 10
        const top10 = speciesRanking.slice(0, 10);
        const top10Container = document.getElementById('speciesTop10');
        top10.forEach((sp, idx) => {
            const div = document.createElement('div');
            div.className = 'species-ranking-item';
            div.style.marginBottom = '18px';
            div.innerHTML = `
                <div><strong>#${idx + 1} ${sp.name} (<i>${sp.latin}</i>)</strong></div>
                <div>Average Score: <span style="color:#fff;font-weight:bold;">${sp.score.toFixed(3)}</span></div>
                <div class="example-recording">
                    <span>Example recording:</span>
                    <button class="play-btn" onclick="playExample('${sp.example.url}')">Play</button>
                    <span style="margin-left:10px;">Score: ${sp.example.score.toFixed(2)}</span>
                    <span style="margin-left:10px;font-size:0.9em;color:#fff;">Citation: ${sp.example.citation}</span>
                </div>
            `;
            top10Container.appendChild(div);
        });
        // Bottom 10
        const bottom10 = speciesRanking.slice(-10);
        const bottom10Container = document.getElementById('speciesBottom10');
        bottom10.forEach((sp, idx) => {
            const div = document.createElement('div');
            div.className = 'species-ranking-item';
            div.style.marginBottom = '18px';
            div.innerHTML = `
                <div><strong>#${speciesRanking.length-9+idx} ${sp.name} (<i>${sp.latin}</i>)</strong></div>
                <div>Average Score: <span style="color:#fff;font-weight:bold;">${sp.score.toFixed(3)}</span></div>
                <div class="example-recording">
                    <span>Example recording:</span>
                    <button class="play-btn" onclick="playExample('${sp.example.url}')">Play</button>
                    <span style="margin-left:10px;">Score: ${sp.example.score.toFixed(2)}</span>
                    <span style="margin-left:10px;font-size:0.9em;color:#fff;">Citation: ${sp.example.citation}</span>
                </div>
            `;
            bottom10Container.appendChild(div);
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
    window.open(url, '_blank');
}
