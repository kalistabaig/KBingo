const NUMBER_OF_GRID_SQUARES = 25;
const GRID_DIMENSIONS = Math.sqrt(NUMBER_OF_GRID_SQUARES);
const LEFT_DIAGONAL = GRID_DIMENSIONS + 1;
const RIGHT_DIAGONAL = GRID_DIMENSIONS - 1;
const FREE_SPACE_SQUARE = parseInt(NUMBER_OF_GRID_SQUARES/2, 10); //math.floor
const bingoOptions = [
    'finished an entire drama in one day',
    'bad boy turns good',
    "disapproving matriarch that ruins everything",
    "guy is CEO or heir of family business",
    "Amnesia or Coma",
    "Avoiding Loan Sharks",
    "Love triangle",
    "Guy has endearing nerdy hobby",
    "first love returns and makes things awkward",
    "pretending to date/ be married",
    "nursing them back to health",
    "girl beats up/ hits guy",
    "first snow",
    "hospital visit",
    '"Follow me, NOW!"',
    "craving korean food",
    "dramatic rain scene",
    "Awkward, almost revealing moment",
    "Wanting a Korean boyfriend",
    "dramatic makeover",
    "break up/ make up",
    "forbidden love",
    "the back hug",
    "love at first site",
    "hate at first site",
    "paths crossed in the past",
    "accidental kiss",
    "falling asleep on  his/her shoulder",
    "dramatic wrist grab",
    "sassy best friend",
    "female lead is tripping and gets saved"
];
let gridElements = [];
const resetBtn = document.getElementById('reset-button');
resetBtn.onclick = resetGameBoard;
setupGameBoard();

function setupGameBoard() {
    let playingOptions = getOptionsForPlaying();
    const playingBoard = document.getElementById('playing-board');

    for (let i = 0; i < NUMBER_OF_GRID_SQUARES; i++) {
        let gridItem = document.createElement('div'); 
        gridItem.classList.add('grid-element');
        gridItem.addEventListener('click', stampGrid);

        let textDiv = document.createElement('div');
        textDiv.classList.add('inner');
        textDiv.classList.add('text');
        let gridItemText = document.createElement('p');
        gridItemText.classList.add('grid-element-text');
        gridItemText.innerHTML = playingOptions[i];

        textDiv.appendChild(gridItemText);
        gridItem.appendChild(textDiv);
        playingBoard.appendChild(gridItem);
        gridElements.push(gridItem);
    }
}

function getOptionsForPlaying() {
    let gameOptions = [];
    let bingoOptionsCopy = [...bingoOptions];
    while (gameOptions.length != 25) {
        let index = getRandomInt(bingoOptionsCopy.length);
        let bingoOption = bingoOptionsCopy[index];
        gameOptions.push(bingoOption);
        bingoOptionsCopy.splice(index, 1);
    }
    return gameOptions; 
}

function stampGrid(e) {
    let selectedGridItem = e.target;

    if (selectedGridItem.classList.contains('selected')) { 
        selectedGridItem.removeChild(selectedGridItem.childNodes[1]);
        selectedGridItem.classList.remove('selected');
    } else {
        //create the div to put the svg element in 
        let svgDiv = document.createElement('div');
        svgDiv.classList.add('inner');

        //create and set svg item to hold cicle
        let svgItem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgItem.setAttribute('width', selectedGridItem.offsetWidth);
        svgItem.setAttribute('height', selectedGridItem.offsetHeight);
        svgItem.classList.add('svg-item');

        //create and set circle animation
        let stamp = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        stamp.classList.add('bingo-stamp');
        stamp.setAttribute('cx', selectedGridItem.offsetWidth/2);
        stamp.setAttribute('cy', selectedGridItem.offsetHeight/2);
        stamp.setAttribute('r', 60);
        stamp.setAttribute('stroke-dasharray', 1000);
        stamp.setAttribute('stroke-dashoffset', 1000);
        setTimeout(function () {
            stamp.setAttribute('stroke-dashoffset', 0);
        }, 0);
        
        svgItem.appendChild(stamp);
        svgDiv.appendChild(svgItem);
        selectedGridItem.appendChild(svgDiv);
        selectedGridItem.classList.add('selected');
        if (checkForBingo()) {
            alert('BINGO');
        }
    }
}

function checkForBingo() {
    return checkForRows() || checkForVerticals() || checkForDiagonals();
}

function isGridElementAtRowColSelected(row, col) {
    let index = GRID_DIMENSIONS*row + col;
    return gridElements[index].classList.contains('selected');
}

function checkForRows() {
    for (let r = 0; r < GRID_DIMENSIONS; r++) {
        let allRowSelected = true;
        for (let c = 0; c < GRID_DIMENSIONS; c++) {
            if (!isGridElementAtRowColSelected(r,c)) {
                allRowSelected = false;
                break;
            }
        }
        if (allRowSelected) {
            return true;
        }
    }
    return false;
}

function checkForVerticals() {
    for (let c = 0; c < GRID_DIMENSIONS; c++) {
        let allColSelected = true;
        for (let r = 0; r < GRID_DIMENSIONS; r++) {
            if (!isGridElementAtRowColSelected(r,c)) {
                allColSelected = false;
                break;
            }
        }
        if (allColSelected) {
            return true;
        }
    }
    return false;
}

function checkForDiagonals() {
    let allDiagonalsSelected = true;
    for (let i = 0; i < GRID_DIMENSIONS; i++) {
        if (!isGridElementAtRowColSelected(i, i)) {
            allDiagonalsSelected = false;
            break;
        }
    }
    if (allDiagonalsSelected) {
        return true;
    }
    allDiagonalsSelected = true;
    for (let i = 0; i < GRID_DIMENSIONS; i++) {
        if (!isGridElementAtRowColSelected(GRID_DIMENSIONS - (i+1), i)) {
            allDiagonalsSelected = false;
            break;
        }
    }
    if (allDiagonalsSelected) {
        return true;
    }

    return false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function resetGameBoard() {
    const playingBoard = document.getElementById('playing-board');
    while (playingBoard.firstChild) {
        playingBoard.removeChild(playingBoard.firstChild);
    }
    setupGameBoard();
}




