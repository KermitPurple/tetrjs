class Piece{
    constructor(matrix){
        this.matrix = matrix;
        this.pos = new Coord(Math.floor(BOARD_SIZE.x / 2 - matrix[0].length / 2), 0);
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
    draw(erase = false){
        for(let i = 0; i < this.matrix.length; i++)
            for(let j = 0; j < this.matrix[i].length; j++)
                if(this.matrix[i][j] != CellType.None){
                    let cell = get_cell_at(j + this.pos.x, i + this.pos.y);
                    clear_cell(cell);
                    if(!erase)
                        cell.classList.add(this.matrix[i][j]);
                }
    }
    erase(){
        this.draw(true);
    }
    lock(){
        this.placed = true;
    }
    cells_empty(){
        for(let i = 0; i < this.matrix.length; i++)
            for(let j = 0; j < this.matrix[i].length; j++)
                if(this.matrix[i][j] != CellType.None && !cell_empty_at(j + this.pos.x, i + this.pos.y))
                    return false;
        return true;
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

const PIECES = [
    new Piece([
        [CellType.None, CellType.I, CellType.None, CellType.None],
        [CellType.None, CellType.I, CellType.None, CellType.None],
        [CellType.None, CellType.I, CellType.None, CellType.None],
        [CellType.None, CellType.I, CellType.None, CellType.None],
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
        [CellType.None, CellType.None, CellType.Z],
        [CellType.None, CellType.Z, CellType.Z],
        [CellType.None, CellType.Z, CellType.None],
    ]),
];

function get_random_piece(){
    return PIECES[Math.floor(Math.random() * PIECES.length)].clone();
}

function clear_cell(cell){
    for(let key in CellType)
        if(key != 'None')
            cell.classList.remove(CellType[key]);
}

function clear_cell_at(x, y){
    clear_cell(get_cell_at(x, y));
}

function cell_empty(cell){
    for(const key in CellType)
        if(cell.classList.contains(CellType[key]))
            return false;
    return true;
}

function cell_empty_at(x, y){
    return cell_empty(get_cell_at(x, y));
}
