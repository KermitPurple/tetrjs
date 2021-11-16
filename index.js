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
            toggle_pause();
            break;
        case ' ':
            if(!can_hold) break;
            let temp = hold;
            hold = piece.clone();
            if(temp === null)
                piece = bag.get_random_piece();
            else
                piece = temp;
            piece.pos = new Coord(Math.floor(BOARD_SIZE.x / 2 - piece.matrix[0].length / 2), -1);
            can_hold = false;
            hold.show_in_hold();
            break;
        default:
            break;
    }
    piece.draw_shadow();
    piece.draw();
});

function toggle_pause(){
    paused = !paused;
    pause_menu.classList.toggle('hidden');
}

function end_game(){
    if(paused)
        toggle_pause();
    clearInterval(interval);
    setTimeout(()=>{
        clear_all();
        main_menu.classList.remove('hidden');
    }, 250);
}

function start_game(){
    main_menu.classList.add('hidden');
    interval = setInterval(()=>{
        if(paused) return;
        if(piece == null || piece.placed){
            piece = bag.get_random_piece();
            can_hold = true;
        }
        if(!piece.move_rel(0, 1))
            if(!piece.lock()) // if peice is already in that spot
                end_game();
        clear_lines();
        draw_board();
        piece.draw_shadow();
        piece.draw();
    }, 250);
}

const pause_menu = document.querySelector('.pause-menu');
const main_menu = document.querySelector('.main-menu');
let bag = new GrabBag();
let piece = null;
let hold = null;
let can_hold = true;
let paused = false;
let interval = undefined;

// start_game();
