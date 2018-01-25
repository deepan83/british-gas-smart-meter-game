class VAudio {
  list = {};
  constructor() {

  }
  add(file, name) {
    this.list[name] = new Audio(file);
  }
  play(name, loop = false) {
    this.list[name].play();
    if (loop) {
      this.list[name].addEventListener('ended', () => {
        this.play(name);
      });
    }
  }
  stop(name) {
    this.list[name].pause();
    this.list[name].currentTime = 0;
  }
  initiateAudio() {
    Object.keys(this.list).forEach(key => {
      this.play(key);
      this.stop(key);
    });
  }
}
export default VAudio
