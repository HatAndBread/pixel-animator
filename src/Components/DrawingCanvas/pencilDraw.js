export default function pencilDraw(currentProject, context, coords) {
  // const copy = JSON.parse(JSON.stringify(currentProject));
  for (let i = 0; i < context.pencilSize; i++) {
    const y = parseInt(coords.y) + i;
    for (let j = 0; j < context.pencilSize; j++) {
      const x = parseInt(coords.x) + j;
      if (
        currentProject.frames[context.currentFrameNumber].dataArr[y] &&
        currentProject.frames[context.currentFrameNumber].dataArr[y][x]
      ) {
        // copy.frames[context.currentFrameNumber].dataArr[y][x] = context.color;
      }
    }
  }
  //context.setCurrentProject(copy);
}
