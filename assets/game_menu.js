class Rectangles {
    constructor() {
        this.x = x_menu;
        this.y = y_menu;
        this.w = d / 5;
        this.h = -d / 2;
    }

    show() {
        // for (let i = 0; i < this.x / 4; i += 5) { //loop repeats 5 times for x
        //     for (let j = 0; j < this.y + this.h; j += 10) { //loop repeats 10 times for y
        //         if (i += 20) {
        //             rect(this.x + i, this.y - j, this.w, this.h); //draw 20 rectangles next to one another
        //         }

        //     }
        // }

        // for (let u = 0; u < this.x / 4; u += 5) { //loop repeats 5 times for x
        //     for (let v = 0; v < this.y + this.h; v += 10) { //loop repeats 10 times for y
        //         if (u += 20) {
        //             rect(this.x + u, this.y + v, this.w, -this.h); //draw 20 rectangles next to one another
        //         }

        //     }
        // }

        // for (let m = 0; m < this.x / 4; m += 5) { //loop repeats 5 times for x
        //     for (let n = 0; n < this.y + this.h; n += 10) { //loop repeats 10 times for y
        //         if (m += 20) {
        //             rect(this.x + 200 + m, this.y - d + 10 + n, this.w, this.h); //draw 20 rectangles next to one another
        //         }

        //     }
        // }


        // }
        image(bgMenuImg, this.x, 0, this.x, height);
        push();
        noStroke();
        fill(255);
        rect(this.x, 0, -this.x / 4, height);
        rect(2 * this.x, 0, this.x / 4, height);

        //text
        fill(38, 150, 118);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(60);
        text("Welcome to", width / 2, d);
        textSize(120);
        text("Birdie Jump", width / 2, height / 2);
        pop();

    }
}

//play button
class Button {
    constructor() {
        this.x_btn = width / 2 - x_menu / 4;
        this.y_btn = height - height / 4;
        this.x_close = width / 2;
        this.y_close = d / 2;
        this.r_btn = d;
    }


    //make a play button
    show() {
        push();
        strokeWeight(3);
        rectMode(CENTER);
        fill(255, 0, 0);
        ellipse(this.x_btn, this.y_btn, this.r_btn, this.r_btn);
        fill(0);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(35);
        text("1", this.x_btn, this.y_btn + 10);
        // text("1", this.x_btn, this.y_btn + d);

        strokeWeight(3);
        rectMode(CENTER);
        fill(255, 0, 0);
        ellipse(this.x_btn + 2 * x_menu / 4, this.y_btn, this.r_btn, this.r_btn);
        fill(0);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(35);
        text("2", this.x_btn + 2 * x_menu / 4, this.y_btn + 10);
        pop();
    }
    showClose() {
        push();
        strokeWeight(3);
        rectMode(CENTER);
        fill(255);
        ellipse(this.x_close, this.y_close, this.r_btn / 2, this.r_btn / 2);
        fill(0);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(45);
        text("X", this.x_close, this.y_close + 15);
        pop();
    }

    //play button gets clicked with mousePressed function
    clickedMode1() {
        let d = dist(mouseX, mouseY, this.x_btn, this.y_btn);

        if (d < this.r_btn / 2) {
            return true;
        } else return false;
    }

    clickedMode2() {
        let d1 = dist(mouseX, mouseY, this.x_btn + 2 * x_menu / 4, this.y_btn);
        if (d1 < this.r_btn / 2) {
            return true;
        } else return false;
    }


    clickedCloseInstruction() {
        let d2 = dist(mouseX, mouseY, this.x_close, this.y_close);
        //trigger instruction board to close early
        if (d2 < this.r_btn / 4) {
            return true;            
        } else return false;
    }
    //play button gets hovered
    //overlay new information for ellipse and text on top the old one
    hovered() {
        let d = dist(mouseX, mouseY, this.x_btn, this.y_btn); //button to first mode

        //mode 1
        if (d < this.r_btn / 2) { //if the button is hovered
            if (!hoverPlayed) { //if the sound is not played
                hover_play_button.play(); //play the sound
                hoverPlayed = true;
            }
            push();
            fill(126, 201, 111);
            ellipse(this.x_btn, this.y_btn, this.r_btn, this.r_btn);
            fill(0);
            textAlign(CENTER);
            textFont("Georgia");
            textSize(35);
            text("PLAY", this.x_btn, this.y_btn + 10);
            console.log("Hovering");

            textSize(20);
            text("OVER THE PLANES", this.x_btn, this.y_btn + 100);
            pop();


        } else { //else if the button is not hovered
            hover_play_button.stop(); //stop the sound
            hoverPlayed = false;
        }


        //mode 2
        let d1 = dist(mouseX, mouseY, this.x_btn + 2 * x_menu / 4, this.y_btn); //button to second mode

        if (d1 < this.r_btn / 2) { //if the button is hovered
            if (!hoverPlayed2) {
                hover_play_button2.play(); //play the sound only once
                hoverPlayed2 = true;
            }
            push();
            fill(126, 201, 111);
            ellipse(this.x_btn + 2 * x_menu / 4, this.y_btn, this.r_btn, this.r_btn);
            fill(0);
            textAlign(CENTER);
            textFont("Georgia");
            textSize(35);
            text("PLAY", this.x_btn + 2 * x_menu / 4, this.y_btn + 10);
            console.log("Hovering 2");

            textSize(20);
            text("GAME OF THORNS", this.x_btn + 2 * x_menu / 4, this.y_btn + 100);
            pop();

        } else { //else if the button is not hovered
            hover_play_button2.stop(); //stop the sound
            hoverPlayed2 = false;
        }



    }

}