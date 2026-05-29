const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpg"
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "songs/song3.mp3",
    cover: "images/cover3.jpg"
  }
];

let currentSong = 0;

const audio = new Audio();

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const currentTimeEl =
  document.getElementById("current-time");

const durationEl =
  document.getElementById("duration");

const volume =
  document.getElementById("volume");

const playlist =
  document.getElementById("playlist");

let isPlaying = false;

/* Load Song */

function loadSong(index) {

  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;

  audio.src = song.src;
}

loadSong(currentSong);

/* Play / Pause */

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
  isPlaying = false;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

/* Next Song */

function nextSong() {
  currentSong =
    (currentSong + 1) % songs.length;

  loadSong(currentSong);
  playSong();
}

/* Previous Song */

function prevSong() {
  currentSong =
    (currentSong - 1 + songs.length)
    % songs.length;

  loadSong(currentSong);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

/* Progress Bar */

audio.addEventListener("timeupdate", () => {

  const progressPercent =
    (audio.currentTime / audio.duration) * 100;

  progress.style.width =
    `${progressPercent}%`;

  currentTimeEl.textContent =
    formatTime(audio.currentTime);

  durationEl.textContent =
    formatTime(audio.duration);
});

function formatTime(time) {

  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);

  return `${mins}:${secs < 10 ? "0" : ""}
${secs}`;
}

/* Seek Song */

progressContainer.addEventListener(
  "click",
  (e) => {

    const width =
      progressContainer.clientWidth;

    const clickX = e.offsetX;

    audio.currentTime =
      (clickX / width) * audio.duration;
  }
);

/* Volume */

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* Playlist */

songs.forEach((song, index) => {

  const div = document.createElement("div");

  div.classList.add("song-item");

  div.textContent =
    `${song.title} - ${song.artist}`;

  div.addEventListener("click", () => {
    currentSong = index;
    loadSong(index);
    playSong();
  });

  playlist.appendChild(div);
});

/* Autoplay */

audio.addEventListener("ended", nextSong);