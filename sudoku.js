var board = [
    "---------------------------------------------------------------------------------"
]
const qboard =[];
function isValid(qboard, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (qboard[row][i] == k || qboard[i][col] == k || qboard[m][n] == k) {
          return false;
        }
    }
    return true;
}
function sudokoSolver(qboard) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (qboard[i][j] == '.') {
          for (let k = 1; k <= 9; k++) {
            if (isValid(qboard, i, j, k)) {
              qboard[i][j] = `${k}`;
            if (sudokoSolver(qboard)) {
             return true;
            } else {
             qboard[i][j] = '.';
            }
           }
         }
         return false;
       }
     }
   }
   return true;
  }
window.onload = function(){
    start(board);
}
function start(){
    makeboard(board); //make board
    checkselect();
}

function makeboard(board){
    //make board
    let idcount = 0;
    for (let i=0;i<81;i++){
        let tile = document.createElement("p"); 
        if(board[0][i] != "-"){
            tile.textContent = board[0][i];
        }else{
            tile.textContent = " ";
        }
        tile.id = idcount;
        idcount++;
        tile.classList.add("tile");
        if((tile.id>17 && tile.id <27) || (tile.id >44 && tile.id <54)){
            tile.classList.add("bottomBorder");
        }
        if((tile.id+1)% 9 == 3 || (tile.id+1) % 9 == 6){
            tile.classList.add("rightBorder");
        }
        //add tile to board
        id("board").appendChild(tile);
    }
}

function makeqboard(){
    let nums = [];   //get all nums
    let tiles = qsa(".tile");
    tiles.forEach(tile => { 
        let text = tile.textContent;
        if(text == " "){
            nums.push('.');
        }else{
            nums.push(text);
        }                     
        })
    //conversion
    let r1 = nums.slice(0,9);
    let r2 = nums.slice(9,18);
    let r3 = nums.slice(18,27);
    let r4 = nums.slice(27,36);
    let r5 = nums.slice(36,45);
    let r6 = nums.slice(45,54);
    let r7 = nums.slice(54,63);
    let r8 = nums.slice(63,72);
    let r9 = nums.slice(72,81);
    let board = [];
    board.push(r1,r2,r3,r4,r5,r6,r7,r8,r9);
    return board;
}

function clearPrevious(){ 
    let tiles = qsa(".tile")
    tiles.forEach(tile => {
        tile.textContent = " "; 
    })
}
function display(board){
    let tiles = qsa('.tile');
    let c=0;
    for(let i=0;i<9;i++){
        r = board.shift();
        for(let j=0;j<9;j++){
            tiles[c].textContent = r.shift();
            c++;
        }if(c % 9 == 0){
            c--;
        }
        c++;
    }
    //console.log(tiles[0].textContent)
}

function checkselect(){
    let tiles = qsa(".tile") //just the selection
    tiles.forEach(tile => {
        tile.addEventListener('click',()=>{
                let ts = qsa(".selected");
                ts.forEach(t => {
                        t.classList.remove('selected');
                        })
                tile.classList.add('selected');
                });
        }) 
    let butns = qsa(".digits");  //add num
    butns.forEach(butn => {
        butn.addEventListener('click',() => {
            let ts = qs(".selected");
            ts.textContent = butn.textContent 
        })
    })
    //check for solve
    let solvebtn = id('go')
    solvebtn.addEventListener("click",() => {
        let qboard = makeqboard(); //get qboard
        sudokoSolver(qboard);
        display(qboard);  
    })

    //check for reset
    let resetbtn = id('reset')
    resetbtn.addEventListener("click",() => {
        clearPrevious();
    })

}


//short
function id(id){
    return document.getElementById(id);
}

function qs(selecter){
    return document.querySelector(selecter);
}

function qsa(selecter){
    return document.querySelectorAll(selecter);
}