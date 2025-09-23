// examples.js
// 示例音频数据与渲染
// 平均分排名数据（科学结果）
const speciesRanking = [
    // ...existing top 10 species...
    {
        latin: 'arvensis', score: 1.483, name: 'Eurasian Skylark', example: { url: 'https://xeno-canto.org/158166', score: 1.633, source: 'Mike Nelson, XC133862. Accessible at www.xeno-canto.org/133862.' }
    },
    {
        latin: 'rubecula', score:1.471, name: 'European Robin', example: { url: 'https://xeno-canto.org/133862', score: 1.675, source: 'david m, XC158166. Accessible at www.xeno-canto.org/158166.' }
    },
    {
        latin: 'calandra', score: 1.447, name: 'Corn Bunting', example: { url: 'https://xeno-canto.org/123167', score: 1.599, source: 'david m, XC123167. Accessible at www.xeno-canto.org/123167.' }
    },
    {
        latin: 'philomelos', score:1.429, name: 'Song Thrush', example: { url: 'https://xeno-canto.org/96608', score: 1.573, source: 'Fraser Simpson, XC96608. Accessible at www.xeno-canto.org/96608.' }

    },
    {
        latin: 'troglodytes', score: 1.425, name: 'Eurasian Wren', example: { url: 'https://xeno-canto.org/133872', score: 1.485, source: 'Mike Nelson, XC133872. Accessible at www.xeno-canto.org/133872.' }
    },
    {
        latin: 'pratensis', score: 1.340, name: 'Meadow Pipit', example: { url: 'https://xeno-canto.org/138979', score: 1.431, source: 'Fernand DEROUSSEN, XC138979. Accessible at www.xeno-canto.org/138979.' }
    },
    {
        latin: 'caeruleus', score: 1.304, name: 'Eurasian Blue Tit', example: { url: 'https://xeno-canto.org/44203', score: 1.425, source: 'Stuart Fisher, XC44203. Accessible at www.xeno-canto.org/44203.' }
    },
    {
        latin: 'borin', score: 1.291, name: 'Garden Warbler', example: { url: 'https://xeno-canto.org/146260', score: 1.391, source: 'david m, XC146260. Accessible at www.xeno-canto.org/146260.' }
    },
    {
        latin: 'atricapilla', score:1.286, name: 'Eurasian Blackcap', example: { url: 'https://xeno-canto.org/94967', score: 1.501, source: 'Richard Dunn, XC94967. Accessible at www.xeno-canto.org/94967.' }
    },
    {
        latin: 'fluviatilis', score: 1.279, name: 'River Warbler', example: { url: 'https://xeno-canto.org/140557', score: 1.511, source: 'Fernand DEROUSSEN, XC140557. Accessible at www.xeno-canto.org/140557.' }
    },
    // 新增末尾10个品种
    {
        latin: 'gallinago', score: 0.844, name: 'Eurasian Magpie', example: { url: 'https://xeno-canto.org/27080', score: 0.794, source: 'Patrik Åberg, XC27080. Accessible at www.xeno-canto.org/27080.' }
    },
    {
        latin: 'squatarola', score: 0.832, name: 'Grey Plover', example: { url: 'https://xeno-canto.org/150291', score: 0.704, source: 'Volker Arnold, XC150291. Accessible at www.xeno-canto.org/150291.' }

    },
    {
        latin: 'livia', score: 0.824, name: 'Rock Dove', example: { url: 'https://xeno-canto.org/116226', score: 0.794, source: 'Jarek Matusiak, XC116226. Accessible at www.xeno-canto.org/116226.' }
    },
    {
        latin: 'colchicus', score: 0.809, name: 'Common Pheasant', example: { url: 'https://xeno-canto.org/121326', score: 0.574, source: 'Jarek Matusiak, XC121326. Accessible at www.xeno-canto.org/121326.' }
    },
    {
        latin: 'apricaria', score: 0.797, name: 'European Golden Plover', example: { url: 'https://xeno-canto.org/42343', score: 0.558, source: 'Patrik Åberg, XC42343. Accessible at www.xeno-canto.org/42343.' }
    },
    {
        latin: 'monedula', score: 0.795, name: 'Western Jackdaw', example: { url: 'https://xeno-canto.org/91185', score: 0.379, source: 'Lars Lachmann, XC91185. Accessible at www.xeno-canto.org/91185.' }
    },
    {
        latin: 'alpina', score: 0.794, name: 'Dunlin', example: { url: 'https://xeno-canto.org/118363', score: 0.567, source: 'Marco Dragonetti, XC118363. Accessible at www.xeno-canto.org/118363.' }
    },
    {
        latin: 'flammea', score: 0.746, name: 'Common Redpoll', example: { url: 'https://xeno-canto.org/35068', score: 0.447, source: 'Sander Bot, XC35068. Accessible at www.xeno-canto.org/35068.' }
    },
    {
        latin: 'ridibundus', score: 0.713, name: 'Black-headed Gull', example: { url: 'https://xeno-canto.org/129577', score: 0.65, source: 'Alexandre Renaudier, XC129577. Accessible at www.xeno-canto.org/129577.' }
    },
    {
        latin: 'europaeus', score: 0.463, name: 'European Nightjar', example: { url: 'https://xeno-canto.org/156388', score: 0.32, source: 'Jack Berteau, XC156388. Accessible at www.xeno-canto.org/156388.' }
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
