
/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play and pause video
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update button text
function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Skip video forward or backward
function skip() {
    video.currentTime += Number(this.dataset.skip);
}

// Change volume and playback speed
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Seek video by clicking progress bar
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});

ranges.forEach(range => {
    range.addEventListener('input', handleRangeUpdate);
});

progress.addEventListener('click', scrub);

// Handle video loading errors
video.addEventListener('error', () => {
    progressBar.style.background = 'red';
    console.error('Error: Video could not be loaded.');
});
