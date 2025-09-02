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
}

class GivenNum {
    constructor() {
        this.x = width / 2;
        this.y = d + 10;
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
            const candidate = `(${expr}) / ${nextDigit}`;
            const val = math.evaluate(candidate);
            return Number.isInteger(val);
        }
        function tooManySameHardOperators(ops, current) {
            // [ '*', '/' ]
            if (mathOperators.slice(2).includes(current)) {
                const total = ops.filter((op) => op === current);
                return total.length > 3;
            }
            return false;
        }

        const shuffledDigits = this.shuffle(items);
        // Random subset length: from 1 up to all digits
        const subsetLength = Math.floor(Math.random() * shuffledDigits.length) + 1;
        const chosenDigits = shuffledDigits.slice(0, subsetLength);

        let allOps = [];

        let expr = `${chosenDigits[0]}`;

        for (let i = 1; i < chosenDigits.length; i++) {
            let op;
            const nextDigit = chosenDigits[i];

            const beforeRound3 = timePerTries.length < 3;
            // Try to pick an operator that won't produce a fraction
            do {
                const index = Math.floor(Math.random() * (beforeRound3 ? 1 : mathOperators.length));
                op = mathOperators[index];
            } while (
                tooManySameHardOperators(allOps, op) || (op === '/' && !validDivision(expr, nextDigit)) // retry until safe
            );

            allOps.push(op);

            expr = `(${expr})${op}${nextDigit}`;
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
        if (endGame3()) return;
        push();
            push();
            translate(this.x, this.y - 10);
            let angle = frameCount += 0.1;
            rotate(angle);
	        imageMode(CENTER);
            image(crateImg, 0, 0, d, d);
            pop();
        stroke(202, 153, 0);
        fill(0);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(40);
        text(this.arbitNum, this.x, this.y);
        pop();
    }

    skip() {

    }
}
