const BOARD_SIZE = {x: 10, y: 20};
const cells = document.querySelectorAll('.cell');
function get_cell_at(x, y){
    return cells[y * BOARD_SIZE.x + x];
}
