document.addEventListener('keydown', event=>{
    piece.erase()
    switch(event.key.toLowerCase()){
        case 'w':
            piece.move_rel(0, -1);
            break;
        case 'a':
            piece.move_rel(-1, 0);
            break;
        case 's':
            piece.move_rel(0, 1);
            break;
        case 'd':
            piece.move_rel(1, 0);
            break;
        case 'q':
            piece.matrix = piece.get_rotate_left();
            break;
        case 'e':
            piece.matrix = piece.get_rotate_right();
            break
        case 'l':
            piece.lock();
            piece.draw();
            piece = get_random_piece();
            break;
        default:
            break;
    }
    piece.draw();
});

let piece = get_random_piece();

const _INTERVAL = setInterval(()=>{
    if(piece.placed)
        piece = get_random_piece();
    piece.erase()
    if(!piece.move_rel(0, 1))
        piece.lock();
    piece.draw();
}, 250);
