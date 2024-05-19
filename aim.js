
window.onload = function(){
    start();
}
window.timer = null; 
function start(){
    let score = 0;
    makeboard(); //make grid
    let stiles = qsa('.tile');
        stiles.forEach(tile => {
            tile.addEventListener("click",() => {
                if(tile.classList[0] == "tit" || tile.classList[1]== "tit"){
                    tile.classList.add("fade");
                    setTimeout(() => {
                        disappear(tile);
                    },900);
                    select();
                    score++;
                    document.getElementById('score').innerHTML = score;   //score
                    time();
                }
        })
    })
}
function GameOver(){
    clearInterval(window.timer);
    id('score').classList.add('final');
    let stiles = qsa('.tile');
        stiles.forEach(tile => {
            tile.addEventListener("click",() => {
                if(tile.classList[0] == "tit" || tile.classList[1]== "tit"){
                    tile.classList.remove('tit');
                }})})
    setTimeout(() => {
        window.location.reload(true)
    },1500);
}
function disappear(tile){   //animation
    tile.classList.remove("fade");
    tile.classList.remove("tit");
}
function time(){
    //timer
        window.timer = setInterval(() => {  
            if (!window.gameStart) {
              window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed / 1000);
            const sLeft = Math.round(((29*1000) / 1000) - sPassed);
            if (sLeft <= -1) {
                GameOver();
                return true;
            }
            document.getElementById('timer').innerHTML = sLeft + 's';
          }, 1000);
}

function select(){
    let c4 = Math.floor(Math.random()*280); //new ball
    let tiles = qsa(".tile");
    let s = 0;    
    tiles.forEach(tile => { 
        if(s==c4){
            tile.classList.add('tit');
        }
        s++;
    });
}

function makeboard(){
    //3 ball
    let c1 = Math.floor(Math.random()*280);
    let c2 = Math.floor(Math.random()*280);
    let c3 = Math.floor(Math.random()*280);
    for (let i=0;i<288;i++){
        let tile = document.createElement("p"); 
        tile.textContent = " ";
        if(i == c1 || i==c2 || i== c3){
            tile.classList.add('tit')
        }
        tile.classList.add("tile");
        id("game").appendChild(tile);
    }
}

//helper functions
function id(id){
    return document.getElementById(id);
}
function qsa(selecter){
    return document.querySelectorAll(selecter);
}