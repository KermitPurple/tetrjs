class Piece{
    constructor(matrix){
        this.matrix = matrix;
        this.pos = new Coord(BOARD_SIZE.x / 2, 0);
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
    draw(){
        for(let i = 0; i < this.matrix.length; i++)
            for(let j = 0; j < this.matrix[i].length; j++)
                get_cell_at(j + this.pos.x, i + this.pos.y).classList.add(CellType.I);
    };
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
