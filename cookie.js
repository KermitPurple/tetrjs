function set_cookie(key, value){
    document.cookie = key + '=' + value;
}

function get_cookie(key){
    let rows = document.cookie.split('; ')
    for(let i = 0; i < rows.length; i++)
        if(rows[i].startsWith(key)){
            return rows[i].split('=')[1]
        }
    return null
}
