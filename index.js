document.addEventListener('keydown', event=>{
    piece.erase()
    piece.erase_shadow();
    switch(event.key.toLowerCase()){
        case 'w':
            piece.hard_drop();
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
            piece.rotate_left();
            break;
        case 'e':
            piece.rotate_right();
            break
        case 'p':
            paused = !paused;
        default:
            break;
    }
    piece.draw_shadow();
    piece.draw();
});

let piece = get_random_piece();
let paused = false;

const _INTERVAL = setInterval(()=>{
    if(paused) return;
    if(piece.placed)
        piece = get_random_piece();
    if(!piece.move_rel(0, 1))
        piece.lock();
    draw_board();
    piece.draw_shadow();
    piece.draw();
}, 250);
