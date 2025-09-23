// main.js
// 页面初始化与事件绑定
window.addEventListener('DOMContentLoaded', () => {
    const analyzer = new AudioAnalyzer();
    renderExamples();
    // 上传相关事件
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        fileInput.click();
    });
    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea) { // 只在直接点击上传区域时触发
            fileInput.click();
        }
    });
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0], analyzer);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            processFile(e.target.files[0], analyzer);
        }
    });
});
function processFile(file, analyzer) {
    if (!file.type.startsWith('audio/')) {
        showError('Please select an audio file');
        return;
    }
    showProgress(0);
    analyzer.loadAudioFile(file)
        .then(audioBuffer => {
            showProgress(30);
            return analyzer.extractFeatures(audioBuffer);
        })
        .then(features => {
            showProgress(70);
            const score = analyzer.calculateScore(features);
            showProgress(100);
            displayResults(features, score, analyzer);
        })
        .catch(() => {
            showError('Audio processing failed, please try another file');
        })
        .finally(() => {
            hideProgress();
        });
}
function showProgress(percent) {
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    progressBar.style.display = 'block';
    progressFill.style.width = percent + '%';
}
function hideProgress() {
    document.getElementById('progressBar').style.display = 'none';
}
function displayResults(features, score, analyzer) {
    const resultsSection = document.getElementById('resultsSection');
    const scoreValue = document.getElementById('scoreValue');
    const featuresDisplay = document.getElementById('featuresDisplay');
    scoreValue.textContent = score.toFixed(3);
    featuresDisplay.innerHTML = `
        <div class="feature-card">
            <div class="feature-label">MFCC-8 Standard Deviation</div>
            <div class="feature-value">${features.mfcc_8_std.toFixed(4)}</div>
        </div>
        <div class="feature-card">
            <div class="feature-label">Spectral Centroid Std</div>
            <div class="feature-value">${features.spectral_centroid_std.toFixed(4)}</div>
        </div>
        <div class="feature-card">
            <div class="feature-label">Chroma A Standard Deviation</div>
            <div class="feature-value">${features.chroma_A_std.toFixed(4)}</div>
        </div>
        <div class="feature-card">
            <div class="feature-label">Pulse Clarity</div>
            <div class="feature-value">${features.pulse_clarity.toFixed(4)}</div>
        </div>
    `;
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}
function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = `❌ ${message}`;
    container.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}
