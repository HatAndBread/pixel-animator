import Frame from './Frame';

export default class Project {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.frames = [];
    this.addFrame();
  }
  addFrame() {
    this.frames.push(new Frame({ width: this.width, height: this.height }));
  }
}
