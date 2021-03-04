var input = require('readline-sync');

class Player {
    constructor(number) {
        this.number = number;
        this.score = 0;
    }
    add(value) {
        this.score += value;
    }
} //end Coffee class

var P1 = new Player(1);
var P2 = new Player(2);
var P3 = new Player(3);
var P4 = new Player(4);
var playerList = [P1, P2, P3, P4];

function generateGrid(stage) {
    var valueArr = [];
    switch (stage) {
        case 1:
            rnd = Math.floor(Math.random() * 10) + 16;
            valueArr = [rnd - 6, rnd, rnd + 7];
            break;
        case 2:
            rnd = Math.floor(Math.random() * 10) + 35;
            valueArr = [rnd - 13, rnd, rnd + 12];
            break;
        case 3:
            rnd = Math.floor(Math.random() * 10) + 62;
            valueArr = [rnd - 37, rnd, rnd + 28];
            break;
    }

    console.log(' -----------------------------');
    console.log('|         |         |         |');
    console.log(`|   $${valueArr[0]}   |   (A)   |   $${valueArr[1]}   |`);
    console.log('|         |         |         |');
    console.log(' -----------------------------');
    console.log('|         |         |         |');
    console.log(`|   (B)   |   $${valueArr[2]}   |   (C)   |`);
    console.log('|         |         |         |');
    console.log(' -----------------------------');
    console.log('|         |         |         |');
    console.log(`|   $${valueArr[1]}   |   (D)   |   $${valueArr[0]}   |`);
    console.log('|         |         |         |');
    console.log(' -----------------------------');

    return valueArr;
}

function displayOption(valueArr) {
    var optStr = "";
    for (let i = 0; i < valueArr.length; i++) {
        optStr += `Option ${i + 1}: $${valueArr[i]}\n`
    }
    console.log(optStr);
}

function getPlayerInput() {
    var playerInputArr = [];
    for (i = 0; i < playerList.length; i++) {
        do {
            playerInput = input.question(`Player ${playerList[i].number}'s choice: `);
        } while (playerInput <= 0 || playerInput >= 4 || isNaN(parseInt(playerInput)));
        playerInputArr.push(parseInt(playerInput));
    }
    return playerInputArr;
}

function calculateScore(vArr, pArr, playerList) {
    //vArr = [ low, mid, high ]
    //pArr = [ p1, p2, p3, p4 ] (1,2 or 3)
    var countArr = [];
    for (let i = 0; i < pArr.length; i++) {
        var currentPlayerOption = pArr[i];
        var count = 0;
        for (let j = 0; j < pArr.length; j++) {
            if (currentPlayerOption == pArr[j]) {
                count++;
            }
        }
        countArr.push(count);
    }
    //countArr = [ 1, 2, 1, 2]
    // console.log(vArr)
    // console.log(pArr)
    // console.log(countArr)
    for (let k = 0; k < countArr.length; k++) {
        var currentCount = countArr[k];
        if (currentCount == 1) {
            var getValueSelected = vArr[pArr[k] - 1];
            console.log(getValueSelected)
            playerList[k].add(getValueSelected);
        }
    }
}
var stage = 1;
do {
    console.log(`Stage ${stage}`);
    var valueArr = generateGrid(stage);
    displayOption(valueArr);
    var playerInput = getPlayerInput();
    calculateScore(valueArr, playerInput, playerList);
    stage++;

} while (stage <= 3);

for (i = 0; i < playerList.length; i++) {
    console.log(`Player ${playerList[i].number}'s score is ${playerList[i].score}`);
}
