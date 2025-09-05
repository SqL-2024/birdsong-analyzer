// audio-analyzer.js
// 音频特征提取与分数计算
class AudioAnalyzer {
    constructor() {
        this.audioContext = null;
        this.currentAudio = null;
        this.birdScorePercentiles = {
            10: 3.071648,
            25: 3.325747,
            50: 3.781828,
            75: 4.095244,
            90: 4.556210
        };
    }
    async loadAudioFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    if (!this.audioContext) {
                        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    }
                    const audioBuffer = await this.audioContext.decodeAudioData(e.target.result);
                    resolve(audioBuffer);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
    async extractFeatures(audioBuffer) {
        const audioData = audioBuffer.getChannelData(0);
        const sampleRate = audioBuffer.sampleRate;
        return {
            mfcc_8_std: this.calculateMFCCStd(audioData, sampleRate, 8),
            spectral_centroid_std: this.calculateSpectralCentroidStd(audioData, sampleRate),
            chroma_A_std: this.calculateChromaStd(audioData, sampleRate, 'A'),
            pulse_clarity: this.calculatePulseClarity(audioData, sampleRate)
        };
    }
    calculateMFCCStd(audioData, sampleRate, coeffIndex) {
        const frameSize = 1024, hopSize = 512, mfccValues = [];
        for (let i = 0; i < audioData.length - frameSize; i += hopSize) {
            const frame = audioData.slice(i, i + frameSize);
            const mfcc = this.simpleMFCC(frame, coeffIndex);
            mfccValues.push(mfcc);
        }
        return this.std(mfccValues);
    }
    simpleMFCC(frame, coeffIndex) {
        const fft = this.simpleFFT(frame);
        const logSpectrum = fft.map(x => Math.log(Math.abs(x) + 1e-10));
        return logSpectrum[coeffIndex % logSpectrum.length] || 0;
    }
    calculateSpectralCentroidStd(audioData, sampleRate) {
        const frameSize = 1024, hopSize = 512, centroids = [];
        for (let i = 0; i < audioData.length - frameSize; i += hopSize) {
            const frame = audioData.slice(i, i + frameSize);
            const centroid = this.spectralCentroid(frame, sampleRate);
            centroids.push(centroid);
        }
        return this.std(centroids);
    }
    spectralCentroid(frame, sampleRate) {
        const fft = this.simpleFFT(frame);
        const magnitude = fft.map(x => Math.abs(x));
        let weightedSum = 0, magnitudeSum = 0;
        for (let i = 0; i < magnitude.length; i++) {
            const freq = i * sampleRate / (2 * magnitude.length);
            weightedSum += freq * magnitude[i];
            magnitudeSum += magnitude[i];
        }
        return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
    }
    calculateChromaStd(audioData, sampleRate, note) {
        const frameSize = 1024, hopSize = 512, chromaValues = [];
        const noteFreqs = {'A': 440, 'B': 493.88, 'C': 261.63};
        const targetFreq = noteFreqs[note] || 440;
        for (let i = 0; i < audioData.length - frameSize; i += hopSize) {
            const frame = audioData.slice(i, i + frameSize);
            const chroma = this.chromeFeature(frame, sampleRate, targetFreq);
            chromaValues.push(chroma);
        }
        return this.std(chromaValues);
    }
    chromeFeature(frame, sampleRate, targetFreq) {
        const fft = this.simpleFFT(frame);
        const magnitude = fft.map(x => Math.abs(x));
        const binFreq = sampleRate / (2 * magnitude.length);
        const targetBin = Math.round(targetFreq / binFreq);
        const windowSize = 5;
        let energy = 0;
        for (let i = Math.max(0, targetBin - windowSize); i < Math.min(magnitude.length, targetBin + windowSize); i++) {
            energy += magnitude[i];
        }
        return energy;
    }
    calculatePulseClarity(audioData, sampleRate) {
        const frameSize = 2048, hopSize = 512, energies = [];
        for (let i = 0; i < audioData.length - frameSize; i += hopSize) {
            const frame = audioData.slice(i, i + frameSize);
            const energy = frame.reduce((sum, x) => sum + x * x, 0);
            energies.push(energy);
        }
        const autocorr = this.autocorrelation(energies);
        const peaks = this.findPeaks(autocorr);
        return peaks.length > 0 ? Math.min(peaks[0] / autocorr.length, 1.0) : 0.5;
    }
    simpleFFT(frame) {
        const N = frame.length, result = [];
        for (let k = 0; k < N / 2; k++) {
            let real = 0, imag = 0;
            for (let n = 0; n < N; n++) {
                const angle = -2 * Math.PI * k * n / N;
                real += frame[n] * Math.cos(angle);
                imag += frame[n] * Math.sin(angle);
            }
            result.push({real, imag});
        }
        return result.map(c => Math.sqrt(c.real * c.real + c.imag * c.imag));
    }
    autocorrelation(data) {
        const N = data.length, result = [];
        for (let lag = 0; lag < N / 2; lag++) {
            let correlation = 0;
            for (let i = 0; i < N - lag; i++) {
                correlation += data[i] * data[i + lag];
            }
            result.push(correlation / (N - lag));
        }
        return result;
    }
    findPeaks(data) {
        const peaks = [];
        for (let i = 1; i < data.length - 1; i++) {
            if (data[i] > data[i-1] && data[i] > data[i+1]) {
                peaks.push(data[i]);
            }
        }
        return peaks.sort((a, b) => b - a);
    }
    std(values) {
        if (values.length === 0) return 0;
        const mean = values.reduce((sum, x) => sum + x, 0) / values.length;
        const variance = values.reduce((sum, x) => sum + (x - mean) ** 2, 0) / values.length;
        return Math.sqrt(variance);
    }
    calculateScore(features) {
        return 2.03 * features.mfcc_8_std +
               1.59 * features.spectral_centroid_std +
               1.61 * features.chroma_A_std +
               1.48 * features.pulse_clarity;
    }
    getPercentile(score) {
        if (score < this.birdScorePercentiles[10]) {
            return { description: "🎉 Congratulations! Your score is lower than 90% of bird calls, very unique features!" };
        } else if (score < this.birdScorePercentiles[25]) {
            return { description: "👏 Great! Your score is lower than 75% of bird calls, excellent performance!" };
        } else if (score < this.birdScorePercentiles[50]) {
            return { description: "😊 Nice! Your score is lower than 50% of bird calls, above average level!" };
        } else if (score < this.birdScorePercentiles[75]) {
            return { description: "😐 Your score is in the 25%-50% range of bird call data, room for improvement!" };
        } else if (score < this.birdScorePercentiles[90]) {
            return { description: "🤔 Your score is in the 10%-25% range of bird call data, try other audio files!" };
        } else {
            return { description: "😅 Your score is higher than 90% of bird calls, may need to adjust audio quality!" };
        }
    }
}
