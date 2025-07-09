const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

const songs = [
  { title: "music\song1.mp3", artist: "Artist A", file: "music/song1.mp3" },
  { title: "music\song1.mp3", artist: "Artist B", file: "music/song2.mp3" },
  { title: "Song Three", artist: "Artist C", file: "music/song3.mp3" }
];

let currentIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  title.textContent = song.title;
  artist.textContent = song.artist;
  updatePlaylistUI();
}

// Play/Pause toggle
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
  } else {
    audio.play();
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

// Next song
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

// Previous song
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

// Update progress
audio.addEventListener('timeupdate', () => {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
});

// Seek on progress bar
progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

// Volume control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Auto play next song
audio.addEventListener('ended', () => {
  nextSong();
});

// Playlist display
function updatePlaylistUI() {
  playlistEl.innerHTML = '';
  songs.forEach((song, idx) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    if (idx === currentIndex) li.classList.add('active');
    li.onclick = () => {
      currentIndex = idx;
      loadSong(currentIndex);
      audio.play();
      isPlaying = true;
      playBtn.textContent = '⏸';
    };
    playlistEl.appendChild(li);
  });
}

// Initial load
loadSong(currentIndex);