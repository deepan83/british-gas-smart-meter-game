class VAudio {
  list = {};
  constructor() {

  }
  add(file, name) {
    this.list[name] = new Audio(file);
  }
  play(name) {
    this.list[name].play();
  }
  stop(name) {
    this.list[name].pause();
    this.list[name].currentTime = 0;
  }
  initiateAudio() {
    Object.keys(this.list).forEach(key => {
      this.list[key].play();
      this.list[key].pause();
    });
  }
}
export default VAudio
