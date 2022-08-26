const els = {
    pause_menu: document.querySelector('.pause-menu'),
    main_menu: document.querySelector('.main-menu'),
    score: document.querySelector('#score-value'),
    lines_cleared:document.querySelector('#lines-value'),
};
const keys = {};
let bag = new GrabBag();
let piece = null;
let hold = null;
let can_hold = true;
let paused = false;
let interval = undefined;
let score = 0;
let lines_cleared = 0;

document.querySelectorAll('.key-entry').forEach(entry => keys[entry.name] = entry.value);

document.addEventListener('keydown', event=>{
    piece.erase()
    piece.erase_shadow();
    switch(event.key.toLowerCase()){
        case keys.hard_drop:
            if(!paused)
                piece.hard_drop();
            break;
        case keys.left:
            if(!paused)
                piece.move_rel(-1, 0);
            break;
        case keys.soft_drop:
            if(!paused)
                piece.move_rel(0, 1);
            break;
        case keys.right:
            if(!paused)
                piece.move_rel(1, 0);
            break;
        case keys.rotate_left:
            if(!paused)
                piece.rotate_left();
            break;
        case keys.rotate_right:
            if(!paused)
                piece.rotate_right();
            break
        case keys.pause:
            if(!paused)
                toggle_pause();
            break;
        case keys.swap:
            if(!can_hold || paused) break;
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
    els.pause_menu.classList.toggle('hidden');
}

function end_game(){
    if(paused)
        toggle_pause();
    clearInterval(interval);
    setTimeout(()=>{
        clear_all();
        els.main_menu.classList.remove('hidden');
    }, 250);
}

function update_lines_cleared(){
    els.lines_cleared.innerHTML = lines_cleared;
}

function update_score(){
    els.score.innerHTML = score;
}

function start_game(){
    els.main_menu.classList.add('hidden');
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
