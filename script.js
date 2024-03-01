// Write JS for Create Board
let grid = [0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
            ];
// let grid = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
let score = 0;


const display = () => {
    const gridW = document.querySelector(".grid").cloneNode(false);
    for (let i=0;i<16;i+=1) {
        const x = document.createElement("div")
        x.innerHTML = grid[i]===0?'':grid[i];
        gridW.appendChild(x);
    }
    document.querySelector(".grid").replaceWith(gridW);
    document.querySelector('#score').innerHTML = score;
}

const generate = () => {
    const emptySq = []
    grid.forEach((ele, idx)=>{
        if (ele === 0) {
            emptySq.push(idx);
        }
    })
    grid[emptySq[Math.floor(Math.random()*(emptySq.length))]] = (Math.random() < 0.9 ? 2 : 4);
    display();
}

const shift = (prevN, curN) => {
    let change = false;
    let merged = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let temp=1;temp<=3;temp+=1) {
        for (let i=temp;i>0;i-=1) {
            for (let j=0;j<=3;j++) {
                const prev = prevN(i, j);
                const cur = curN(i, j);
                if (grid[prev] === 0&& grid[cur] !== 0) {
                    grid[prev]=grid[cur];
                    grid[cur] = 0;
                    change = true;
                    merged[prev] = merged[cur];
                } 
                else if (merged[cur] === 0 && grid[prev] === grid[cur]) {
                    grid[prev] *= 2;
                    score += grid[prev];
                    console.log(score);
                    grid[cur] = 0;
                    change = true;
                    merged[prev] = 1;
                }
            }
        }
    }
    return change
}

// const isOver = ()=> {
//     for (let i=0;i<16;i++) {
//         if 
//     }
// }

const left = [
    (i, j) => j*4 + i-1,
    (i, j) => j*4 + i
]
const right = [
    (i, j) => j*4 + (3-i+1),
    (i, j) => j*4 + (3-i)
]
const down = [
    (i, j) => i*4 + j,
    (i, j) => (i-1)*4 + j
]
const up = [
    (i, j) => (i-1)*4 + j,
    (i, j) => i*4 + j
]



document.querySelector('#restart-button').addEventListener("click", ()=>{
    startGame();
})

const startGame = ()=> {
    grid=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    score = 0;
    generate();
    generate();
    display();
}
startGame();

document.addEventListener('keyup', function(event){ 
    // alert(event. keyCode); 
    if (event.keyCode === 37) {
        if (shift(left[0], left[1])){
            generate();
            display();
        }
    } else if (event.keyCode === 38) {
        if (shift(up[0], up[1])){
            generate();
            display();
        }
    } else if (event.keyCode === 39) {
        if (shift(right[0], right[1])){
            generate();
            display();
        }
    } else if (event.keyCode === 40) {
        if (shift(down[0], down[1])){
            generate();
            display();
        }
    }
    if (checkForWin()) {
        document.querySelector('#result').textContent = "YOU WIN"
        document.body.removeEventListener('keyup', keyUpHandler);
    }
    else if (isGameOver()) {
        document.querySelector('#result').textContent = "Game Over!";
        document.body.removeEventListener('keyup', keyUpHandler);
    }
} );


const isGameOver = () => {
    // for(let i=0; i<16; i+=1){
    //     rowValues.push(document.querySelector(`#id_${i}`).textContent)
    // }
    let all_blocks = document.querySelectorAll('.grid>div')
    let filteredBlocks = [...all_blocks]
    if (filteredBlocks.filter((a)=>a.textContent==='0').length > 0) {
        return false;
    }
    let blocks = [...all_blocks].map(a=>parseInt(a.textContent));
    for ( let i=0;i<4;i++) {
        for (let j=0;j<3;j++) {
            if (blocks[i*4+j]===blocks[i*4+j+1]) {
                return false;
            }
        }
    }
    for ( let i=0;i<4;i++) {
        for (let j=0;j<3;j++) {
            if (blocks[j*4+i]===blocks[(j+1)*4+i]) {
                return false;
            }
        }
    }
    return true;
}
const checkForWin = () => {
    let all_blocks = document.querySelectorAll('.grid>div')
    let blocks = [...all_blocks].map(a=>parseInt(a.textContent));
    console.log(blocks);
    return blocks.reduce((accum, cur) => accum||(cur===2048), false)
}
