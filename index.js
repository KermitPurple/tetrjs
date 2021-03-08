document.addEventListener('keydown', event=>{
    console.log(event);
    piece.erase()
    switch(event.key.toLowerCase()){
        case 'w':
            piece.pos.y -= 1;
            break;
        case 'a':
            piece.pos.x -= 1;
            break;
        case 's':
            piece.pos.y += 1;
            break;
        case 'd':
            piece.pos.x += 1;
            break;
        case 'q':
            console.log(piece.matrix);
            piece.matrix = piece.get_rotate_left();
            console.log(piece.matrix);
            break;
        case 'e':
            piece.matrix = piece.get_rotate_right();
            break
        default:
            break;
    }
    piece.draw();
});

let piece = get_random_piece();

const _INTERVAL = setInterval(()=>{
    piece.erase()
    // piece.pos.y += 1;
    if(piece.pos.y + 4 >= BOARD_SIZE.y)
        clearInterval(_INTERVAL);
    piece.draw();
}, 250);
