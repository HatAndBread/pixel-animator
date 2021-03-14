export default class Frame {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.dataArr = [];
    this.initialize();
  }
  initialize() {
    for (let i = 0; i < this.height; i++) {
      this.dataArr.push([]);
      for (let j = 0; j < this.width; j++) {
        this.dataArr[i].push('transparent');
      }
    }
  }
}
