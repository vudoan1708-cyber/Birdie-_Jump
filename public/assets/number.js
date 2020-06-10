class Number {
    constructor(i, j, w, h) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j + rows_mode3 * 4;
        this.w = w;
        this.h = h;
        this.numbers = [int(random(1, 10))];
    }

    show() {
        if (!this.numStored) {
            push();
            fill(100);
            rect(this.x, this.y, this.w, this.h);
            textAlign(CENTER);
            textSize(50);
            textFont("Georgia");
            fill(0);
            text(this.numbers, this.x + this.w / 2, this.y + this.h / 2 + 10);
            pop();
        }
        else {
            push();
            fill(255, 150);
            rect(this.x, this.y, this.w, this.h);
            textAlign(CENTER);
            textSize(50);
            textFont("Georgia");
            fill(0);
            text(this.numbers, this.x + this.w / 2, this.y + this.h / 2 + 10);
            pop();
        }
    }

    showHitWrong() {
        push();
            fill(255, 0, 0);
            rect(this.x, this.y, this.w, this.h);
            textAlign(CENTER);
            textSize(50);
            textFont("Georgia");
            fill(0);
            text(this.numbers, this.x + this.w / 2, this.y + this.h / 2 + 10);
            pop();
    }

    showHit() {
        
            push();
            fill(0, 255, 0);
            rect(this.x, this.y, this.w, this.h);
            textAlign(CENTER);
            textSize(50);
            textFont("Georgia");
            fill(0);
            text(this.numbers, this.x + this.w / 2, this.y + this.h / 2 + 10);
            pop();
        
    }

    getHit(birdie3) {
        if (birdie3.y_pos3 < this.y + this.h) {
            if (birdie3.x_pos3 > this.x && birdie3.x_pos3 + birdie3.size_3 < this.x + this.w) {
                this.numStored = true;
                return true;
            }
        }
        hitOnce = false;
        this.numStored = false;
        return false;
    }

    getDeleted() {
        for (let i = this.numbers.length - 1; i >= 0; i--) {
            this.numbers.splice(i, 1);
        }
    }

    getAddedUp() {
     // CASE 2 - 2:
        //number chosen is less than
        //add up till it gets equal
            for (let i = 0; i < cols_mode3; i++) {
                for (let n = 0; n < this.numbers.length; n++) {
                    currentTotal = grid[i][150].numbers[n];
                    // a SUM of numbers is larger
                    if (currentTotal > givenNum.arbitNum) {
                        currentTotal = 0;
                    }
                    //a SUM of numbers is less than
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
                                
                                // if (currentTotal == grid[i][150].numbers[n]) {
                                //     // let addUpRemainder 
                                    
                                // }
                            // }
                        // }    
                        
                    }
                    // else {
                    //     this.numbers = [int(random(1, 10))]; // re-make a new number 
                    //     givenNum.arbitNum = int(random(1, 10)); // numbers change whenever a cell is correctly hit
                    //     this.showHit();
        
                    //     // return true;
                    // }
                }
            }
       
        // this.numStored = false;

        // for (let i = 0; i < 10; i++) { //check every cols
        //     for (let j = 0; j < 4; j++) { // check every rows
        //         let eachCellCoord = grid[this.i + i][this.j +j]; // check every cell's coordinate
        //         // console.log(givenNum.arbitNum);
        //         for (let n = 0; n < this.numbers.length; n++) {

        //             // if each cell that has a number which its sum with another number in the array equals to a given num
        //             if (givenNum.arbitNum == eachCellCoord.numbers[n] + this.numbers[n + 1]) {
        //                 console.log(this.numbers[n + 1]);
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

    show() {
        push();
        fill(255);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(40);
        text(this.arbitNum, this.x, this.y);
    }
}