class Coord{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    clone(){
        return clone(this);
    }
}
const BOARD_SIZE = new Coord(10, 20);
const cells = document.querySelectorAll('.cell');

/*
 * Return a cell in cells with the given coordinates
 * @param {integer} x - x coordinate of the cell that is returned
 * @param {integer} y - y coordinate of the cell that is returned
 */
function get_cell_at(x, y){
    return cells[y * BOARD_SIZE.x + x];
}

function clone(object){
    return Object.assign(Object.create(Object.getPrototypeOf(object)), JSON.parse(JSON.stringify(object)));
}
