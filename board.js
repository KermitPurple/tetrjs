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
const HOLD_SIZE = new Coord(4, 4);
const hold_cells = document.querySelectorAll('.hold-cell');

/*
 * Return a cell in cells with the given coordinates
 * @param {integer} x - x coordinate of the cell that is returned
 * @param {integer} y - y coordinate of the cell that is returned
 */
function get_cell_at(x, y){
    return cells[y * BOARD_SIZE.x + x];
}

function get_hold_cell_at(x, y){
    return hold_cells[y * HOLD_SIZE.x + x];
}

function clone(object){
    if(Array.isArray(object))//fixes bug with cloning arrays
        return JSON.parse(JSON.stringify(object));
    return Object.assign(Object.create(Object.getPrototypeOf(object)), JSON.parse(JSON.stringify(object)));
}
