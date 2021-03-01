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
    [
        [CellType.None, CellType.I, CellType.None, CellType.None],
        [CellType.None, CellType.I, CellType.None, CellType.None],
        [CellType.None, CellType.I, CellType.None, CellType.None],
        [CellType.None, CellType.I, CellType.None, CellType.None],
    ],
    [
        [CellType.O, CellType.O],
        [CellType.O, CellType.O],
    ],
    [
        [CellType.None, CellType.L, CellType.None],
        [CellType.None, CellType.L, CellType.None],
        [CellType.None, CellType.L, CellType.L],
    ],
    [
        [CellType.None, CellType.J, CellType.None],
        [CellType.None, CellType.J, CellType.None],
        [CellType.J, CellType.J, CellType.None],
    ],
    [
        [CellType.S, CellType.None, CellType.None],
        [CellType.S, CellType.S, CellType.None],
        [CellType.None, CellType.S, CellType.None],
    ],
    [
        [CellType.None, CellType.None, CellType.Z],
        [CellType.None, CellType.Z, CellType.Z],
        [CellType.None, CellType.Z, CellType.None],
    ],
    [
        [CellType.None, CellType.None, CellType.Z],
        [CellType.None, CellType.Z, CellType.Z],
        [CellType.None, CellType.Z, CellType.None],
    ],
];
