const video = document.querySelector('video')
const playBtn = document.querySelector('.toggle')
const skipBtns = document.querySelectorAll('.skip')
const volumeSlider = document.querySelector('.volume')
const videoSpeed = document.querySelector('.speed')
const progressBox = document.querySelector('.progress')
const progress = document.querySelector('.progress-filled')
const fullScreen = document.querySelector('.fullScreen')
const player = document.querySelector('.player')



function playVideo() {
    if(video.paused) {
        video.play()
    }else {
        video.pause()
    }
}

video.onclick = () => playVideo()

playBtn.onclick = () => {
    playVideo()
}

function changeIcon() {
    const icon = this.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>'
    playBtn.innerHTML = icon
}
video.addEventListener('play', changeIcon)
video.addEventListener('pause', changeIcon)

function changeVolume() {
    video.volume = volumeSlider.value / 100
}
volumeSlider.addEventListener('change', changeVolume)
volumeSlider.addEventListener('mousemove', changeVolume)

function speedUp() {
    video.playbackRate = videoSpeed.value
}
videoSpeed.addEventListener('change', speedUp)
videoSpeed.addEventListener('mousemove', speedUp)


skipBtns.forEach(btn => btn.addEventListener('click', () => {
    video.currentTime += +btn.getAttribute('data-skip')
}))

function progressWidth() {
    progress.style.width = `${(video.currentTime / video.duration)*100}%`
}

video.addEventListener('timeupdate', progressWidth)

function drag(e) {
    const time = (e.offsetX / progressBox.offsetWidth)*video.duration
    video.currentTime = time
}
progressBox.addEventListener('click', drag)
let mouse = false
progress.addEventListener('mousedown',() => mouse = true)
progress.addEventListener('mousemove', (e) => mouse && drag(e))
progress.addEventListener('mouseup',() => mouse = false)

fullScreen.addEventListener('click', () => {
    player.classList.toggle('expand')
    changeExpand()
})
function changeExpand() {
    const icon = player.classList.contains('expand') ? '<i class="fa-solid fa-down-left-and-up-right-to-center"></i>' : '<i class="fa-solid fa-up-right-and-down-left-from-center"></i>'
    fullScreen.innerHTML = icon
}

window.addEventListener('keydown', (e) => e.keyCode === 32 && playVideo())