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
        default:
            break;
    }
    piece.draw_shadow();
    piece.draw();
});

let piece = get_random_piece();

const _INTERVAL = setInterval(()=>{
    if(piece.placed)
        piece = get_random_piece();
    piece.erase()
    piece.erase_shadow();
    if(!piece.move_rel(0, 1))
        piece.lock();
    piece.draw_shadow();
    piece.draw();
}, 250);
