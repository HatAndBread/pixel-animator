export default function eraserDraw(currentProject, context, coords, e) {
  const rows = Array.from(e.target.parentElement.parentElement.childNodes);
  for (let i = 0; i < context.pencilSize; i++) {
    const y = parseInt(coords.y) + i;
    for (let j = 0; j < context.pencilSize; j++) {
      const x = parseInt(coords.x) + j;
      if (
        currentProject.frames[context.currentFrameNumber].dataArr[y] &&
        currentProject.frames[context.currentFrameNumber].dataArr[y][x]
      ) {
        currentProject.frames[context.currentFrameNumber].dataArr[y][x] = 'transparent';
        const elementsInRow = Array.from(rows[y].childNodes);
        elementsInRow[x].style.backgroundColor = elementsInRow[x].dataset.originalBgColor;
      }
    }
  }
}
