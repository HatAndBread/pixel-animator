export default function floodFill(getTrueCoords, coords, magnification, context, squares, color) {
  const seed = getTrueCoords(coords);
  let seedX = seed.x / magnification;
  let seedY = seed.y / magnification;
  const grid = new Array(context.height);
  if (seedX < 0) {
    seedX = 0;
  }
  if (seedY < 0) {
    seedY = 0;
  }
  if (seedY > grid.length) {
    seedY = grid.length;
  }
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(context.width);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = { coords: { x: j * magnification, y: i * magnification }, color: null };
    }
  }
  squares.forEach((square) => {
    if (grid[square.coords.y / magnification]) {
      grid[square.coords.y / magnification][square.coords.x / magnification] = square;
    }
  });
  try {
    grid[seedY][seedX].checked = true;
  } catch {
    return;
  }
  const seedColor = grid[seedY][seedX].color;
  grid[seedY][seedX].color = color;
  const queue = [grid[seedY][seedX]];
  while (queue.length) {
    const firstX = queue[0].coords.x / magnification;
    const firstY = queue[0].coords.y / magnification;
    const north = grid[firstY - 1] ? grid[firstY - 1][firstX] : null;
    const south = grid[firstY + 1] ? grid[firstY + 1][firstX] : null;
    const east = grid[firstY][firstX + 1] ? grid[firstY][firstX + 1] : null;
    const west = grid[firstY][firstX - 1] ? grid[firstY][firstX - 1] : null;
    if (north?.color === seedColor && !north.checked) {
      north.color = color;
      north.checked = true;
      queue.push(north);
    }
    if (south?.color === seedColor && !south.checked) {
      south.color = color;
      south.checked = true;
      queue.push(south);
    }
    if (east?.color === seedColor && !east.checked) {
      east.color = color;
      east.checked = true;
      queue.push(east);
    }
    if (west?.color === seedColor && !west.checked) {
      west.color = color;
      west.checked = true;
      queue.push(west);
    }
    queue.splice(0, 1);
  }
  const newSquares = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]?.color) {
        newSquares.push({ coords: grid[i][j].coords, color: grid[i][j].color });
      }
    }
  }
  return newSquares;
}
