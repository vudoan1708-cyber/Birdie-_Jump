class Cell {
    constructor(i, j, w, h) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = (j * h) + (h * rows_mode3);
        this.w = w;
        this.h = h;
        this.number = int(random(1, 10));
        this.softDeleted = false;
        this.rafId = 0;

        this.hitWrong = false;
    }

    updateCellY(newCell) {
        this.y += 1;

        if (this.y !== newCell.y) {
            this.rafId = requestAnimationFrame(() => { this.updateCellY(newCell); });
        } else {
            cancelAnimationFrame(this.rafId);
        }
    }

    show() {
        push();
        image(crateImg, this.x, this.y, this.w, this.h);
        
        textAlign(CENTER);
        textSize(50);
        if (!this.numStored) {
            stroke(100);
            fill(0, 150);
        } else {
            stroke(255, 150);
            fill(255, 150);
        }

        if (this.hitWrong) {
            stroke(255, 0, 0);
            fill(200, 0, 0);
        } else if (this.hitRight) {
            stroke(0, 255, 0);
            fill(0, 200, 0);
        }
        text(this.number, this.x + this.w / 2, this.y + this.h / 2 + 20);
        pop();
    }

    showHitWrong() {
        this.hitWrong = true;
        this.hitRight = false;
    }

    showHit() {
        this.hitRight = true;
        this.hitWrong = false;
    }

    dehighlight() {
        this.hitRight = false;
        this.hitWrong = false;
        this.numStored = false;
    }

    getHit(birdie3) {
        if (birdie3.y_pos3 < this.y + this.h) {
            if (birdie3.x_pos3 > this.x && birdie3.x_pos3 + birdie3.size_3 < this.x + this.w) {
                this.numStored = true;
                selectedOperator = '';
                return true;
            }
        }
        // if (birdie3.isFlying() && this.numStored) {
        //     this.numStored = false;
        //     this.hitRight = false;
        //     this.hitWrong = false;
        // }
        return false;
    }

    getAddedUp() {
     // CASE 2 - 2:
        // a SUM of number is larger
        if (currentTotal > givenNum.arbitNum) {
            currentTotal = 0;
        }
        //a SUM of number is less than
        else if (currentTotal < givenNum.arbitNum) {
            let remainder = givenNum.arbitNum - currentTotal;
            // for (let j = 0; j < rows_mode3 * 4; j += 50) {
                // if (birdie3.jump()) {
                    if (jumpTime > 3) {
                        jumpTime = 0;
                        currentTotal = 0;
                    }
                        // console.log("NEED MORE: " + remainder);
                        // console.log("CURRENT: " + currentTotal);
                        // return remainder;
                    
                    // if (currentTotal == grid[i][150].number[n]) {
                    //     // let addUpRemainder 
                        
                    // }
                // }
            // }    
            
        }
        // else {
        //     this.number = [int(random(1, 10))]; // re-make a new number 
        //     givenNum.arbitNum = int(random(1, 10)); // number change whenever a cell is correctly hit
        //     this.showHit();

        //     // return true;
        // }
       
        // this.numStored = false;

        // for (let i = 0; i < 10; i++) { //check every cols
        //     for (let j = 0; j < 4; j++) { // check every rows
        //         let eachCellCoord = grid[this.i + i][this.j +j]; // check every cell's coordinate
        //         // console.log(givenNum.arbitNum);
        //         for (let n = 0; n < this.number.length; n++) {

        //             // if each cell that has a number which its sum with another number in the array equals to a given num
        //             if (givenNum.arbitNum == eachCellCoord.number[n] + this.number[n + 1]) {
        //                 console.log(this.number[n + 1]);
        //                 console.log(eachCellCoord[j]);
        //                 console.log("CORRECT");
        //                 return true;
        //             }
        //             return false;

        //         }
        //     }
        // }
    }
}

class GivenNum {
    constructor() {
        this.x = width / 2;
        this.y = d;
        this.arbitNum = int(random(1, 10));
    }

    // Fisher-Yates shuffle to randomise digits
    shuffle(array) {
        let arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    generateMathExpression(items) {
        function validDivision(expr, nextDigit) {
            if (nextDigit === 0) return false;
            const candidate = `${expr} / ${nextDigit}`;
            const val = math.evaluate(candidate);
            return Number.isInteger(val);
        }

        const shuffledDigits = this.shuffle(items);
        // Random subset length: from 1 up to all digits
        const subsetLength = Math.floor(Math.random() * shuffledDigits.length) + 1;
        const chosenDigits = shuffledDigits.slice(0, subsetLength);

        let expr = `${chosenDigits[0]}`;

        for (let i = 1; i < chosenDigits.length; i++) {
            let op;
            let nextDigit = chosenDigits[i];

            // Try to pick an operator that won't produce a fraction
            do {
                op = mathOperators[Math.floor(Math.random() * mathOperators.length)];
            } while (
                op === '/' && !validDivision(expr, nextDigit) // retry until safe
            );

            expr = `${expr}${op}${nextDigit}`;
        }
        console.log('expr', expr);
        return expr;
    }

    assignNewNumber(grid) {
        const lastRowItems = [];
        for (let i = 0; i < grid.length; i ++) {
            if (!grid[i][rows_mode3 - 1]) continue;
            lastRowItems.push(grid[i][rows_mode3 - 1].number);
        }
        const expression = this.generateMathExpression(lastRowItems);
        try {
            const result = math.evaluate(expression);
            this.arbitNum = result > 0 ? result : lastRowItems[Math.floor(Math.random() * lastRowItems.length)];
        } catch (err) {
            console.error('Invalid expression, likely due to division by zero: ', expression);
        }

    }

    show() {
        push();
        fill(255);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(40);
        text(this.arbitNum, this.x, this.y);
        pop();
    }
}
