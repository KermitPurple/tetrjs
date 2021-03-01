const BOARD_SIZE = {x: 10, y: 20};
const cells = document.querySelectorAll('.cell');

/*
 * Return a cell in cells with the given coordinates
 * @param {integer} x - x coordinate of the cell that is returned
 * @param {integer} y - y coordinate of the cell that is returned
 */
function get_cell_at(x, y){
    return cells[y * BOARD_SIZE.x + x];
}
