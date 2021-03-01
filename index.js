const cells = document.querySelectorAll('.cell');
let grid = []
for(let i = 0; i < 20; i++){
    grid.push([]);
    for(let j = 0; j < 10; j++)
        grid[i][j] = cells[i * 10 + j];
}
