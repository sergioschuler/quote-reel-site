{
  const page = document.getElementById('qr-proposal');
  const video = page.querySelector('video');
  const playback = page.querySelector('.qr-video-control');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function syncPlayback() {
    playback.textContent = video.paused ? 'Play demo' : 'Pause demo';
  }
  function playDemo() {
    video.play().catch(syncPlayback);
  }
  video.addEventListener('play', syncPlayback);
  video.addEventListener('pause', syncPlayback);
  playback.addEventListener('click', () => video.paused ? playDemo() : video.pause());
  motion.addEventListener('change', () => { if (motion.matches) video.pause(); });
  if (!motion.matches) playDemo();
}
