// TODO: change get rotate to just rotate and use a decorator for piece protection
// TODO: do this for placed protection as well
// TODO: store board data in a matrix instead of just dom
class Piece{
    constructor(matrix){
        this.matrix = matrix;
        this.pos = new Coord(Math.floor(BOARD_SIZE.x / 2 - matrix[0].length / 2), -1);
        this.placed = false;
    }
    clone(){
        return clone(this);
    }
    /*
     * +--+--+--+     +--+--+--+
     * |00|01|02|     |20|10|00|
     * +--+--+--+     +--+--+--+
     * |10|11|12| --> |21|11|01|
     * +--+--+--+     +--+--+--+
     * |20|21|22|     |22|12|02|
     * +--+--+--+     +--+--+--+
     */
    get_rotate_right(matrix = undefined){
        matrix = matrix ?? this.matrix;
        let result = clone(matrix);
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++){
                result[i][j] = matrix[matrix.length - 1 - j][i];
            }
        }
        return result;
    }
    /*
     * +--+--+--+     +--+--+--+
     * |00|01|02|     |02|12|22|
     * +--+--+--+     +--+--+--+
     * |10|11|12| --> |01|11|21|
     * +--+--+--+     +--+--+--+
     * |20|21|22|     |00|10|20|
     * +--+--+--+     +--+--+--+
     */
    get_rotate_left(matrix = undefined){
        matrix = matrix ?? this.matrix;
        let result = clone(matrix);
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++){
                result[i][j] = matrix[j][matrix[j].length - 1 - i];
            }
        }
        return result;
    }
    rotate_right(){
        if(this.placed) return;
        let prev_matrix = this.matrix;
        this.matrix = this.get_rotate_right();
        if(this.cells_empty())
            return true;
        this.matrix = prev_matrix;
        return false;
    }
    rotate_left(){
        if(this.placed) return;
        let prev_matrix = this.matrix;
        this.matrix = this.get_rotate_left();
        if(this.cells_empty())
            return true;
        this.matrix = prev_matrix;
        return false;
    }
    draw(erase = false, shadow = false){
        for(let i = 0; i < this.matrix.length; i++)
            for(let j = 0; j < this.matrix[i].length; j++)
                if(this.matrix[i][j] != CellType.None){
                    let cell = get_cell_at(j + this.pos.x, i + this.pos.y);
                    clear_cell(cell);
                    if(shadow)
                        cell.classList.add('shadow');
                    if(!erase)
                        cell.classList.add(this.matrix[i][j]);
                }
    }
    erase(){
        this.draw(true);
    }
    lock(){
        this.placed = true;
        for(let i = 0; i < this.matrix[0].length; i++)
            for(let j = 0; j < this.matrix.length; j++){
                if(this.matrix[i][j] != CellType.None)
                    board[this.pos.y + i][this.pos.x + j] = this.matrix[i][j];
            }
    }
    cells_empty(){
        for(let i = 0; i < this.matrix.length; i++)
            for(let j = 0; j < this.matrix[i].length; j++)
                if(this.matrix[i][j] != CellType.None &&
                    (j + this.pos.x < 0 ||
                    i + this.pos.y < 0 ||
                    j + this.pos.x >= BOARD_SIZE.x ||
                    i + this.pos.y >= BOARD_SIZE.y ||
                    board[this.pos.y + i][this.pos.x + j] != CellType.None))
                    return false;
        return true;
    }
    move_rel(x, y){
        if(this.placed) return;
        this.pos.x += x;
        this.pos.y += y;
        if(this.cells_empty())
            return true;
        this.pos.x -= x;
        this.pos.y -= y;
        return false;
    }
    hard_drop(shadow = false){
        if(this.placed) return;
        while(this.move_rel(0, 1));
        if(!shadow)
            this.lock();
    }
    draw_shadow(){
        let shadow = this.clone();
        shadow.hard_drop(true);
        shadow.draw(false, true);
    }
    erase_shadow(){
        let shadow = this.clone();
        shadow.hard_drop(true);
        shadow.draw(true);
    }
}

const CellType = {
    None: '',
    I: 'I',
    O: 'O',
    L: 'L',
    J: 'J',
    S: 'S',
    Z: 'Z',
    T: 'T',
};

const board = [];
for(let i = 0; i < BOARD_SIZE.y; i++){
    let temp = []
    for(let j = 0; j < BOARD_SIZE.x; j++){
        temp.push(CellType.None);
    }
    board.push(temp);
}

const PIECES = [
    new Piece([
        [CellType.None, CellType.None, CellType.None, CellType.None],
        [CellType.I, CellType.I, CellType.I, CellType.I],
        [CellType.None, CellType.None, CellType.None, CellType.None],
        [CellType.None, CellType.None, CellType.None, CellType.None],
    ]),
    new Piece([
        [CellType.O, CellType.O],
        [CellType.O, CellType.O],
    ]),
    new Piece([
        [CellType.None, CellType.L, CellType.None],
        [CellType.None, CellType.L, CellType.None],
        [CellType.None, CellType.L, CellType.L],
    ]),
    new Piece([
        [CellType.None, CellType.J, CellType.None],
        [CellType.None, CellType.J, CellType.None],
        [CellType.J, CellType.J, CellType.None],
    ]),
    new Piece([
        [CellType.S, CellType.None, CellType.None],
        [CellType.S, CellType.S, CellType.None],
        [CellType.None, CellType.S, CellType.None],
    ]),
    new Piece([
        [CellType.None, CellType.None, CellType.Z],
        [CellType.None, CellType.Z, CellType.Z],
        [CellType.None, CellType.Z, CellType.None],
    ]),
    new Piece([
        [CellType.None, CellType.None, CellType.None],
        [CellType.T, CellType.T, CellType.T],
        [CellType.None, CellType.T, CellType.None],
    ]),
];

class GrabBag{
    constructor(){
        this.pieces = [...PIECES];
    }
    get_random_piece(){
        if(this.pieces.length <= 0)
            this.pieces = [...PIECES];
        return this.pieces.splice(Math.floor(Math.random() * this.pieces.length), 1)[0].clone();
    }
}

function get_random_piece(){
    return PIECES[Math.floor(Math.random() * PIECES.length)].clone();
}

function clear_cell(cell){
    for(let key in CellType)
        if(key != 'None')
            cell.classList.remove(CellType[key]);
    cell.classList.remove('shadow');
}

function clear_cell_at(x, y){
    clear_cell(get_cell_at(x, y));
}

function cell_empty(cell){
    if(cell.classList.contains('shadow'))
        return true;
    for(const key in CellType)
        if(cell.classList.contains(CellType[key]))
            return false;
    return true;
}

function cell_empty_at(x, y){
    return cell_empty(get_cell_at(x, y));
}

function draw_board(){
    for(let i = 0; i < BOARD_SIZE.y; i++){
        for(let j = 0; j < BOARD_SIZE.x; j++){
            let cell = get_cell_at(j, i);
            clear_cell(cell);
            if(board[i][j] != CellType.None)
                cell.classList.add(board[i][j]);
        }
    }
}

function clear_lines(){
    for(let i = 0; i < BOARD_SIZE.y; i++){
        if(!board[i].includes(CellType.None)){
            board.splice(i, 1);
            let new_row = [];
            for(let j = 0; j < BOARD_SIZE.x; j++)
                new_row.push(CellType.None);
            board.unshift(new_row);
        }
    }
}
