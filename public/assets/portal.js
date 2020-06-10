class Tele_Portal {
    constructor() {
        this.w = 50;
        this.h = 150;
        this.x = width - d - 50;
        this.y = height - this.h;

        this.x2 = d - 25;

    }

    show_portal1() {
        // fill(255);
        // rect(this.x, this.y, this.w, this.h);
        image(portalGamePlayImg, this.x, this.y, this.w, this.h);
    }

    show_portal2() {
        // fill(255);
        // rect(this.x2, this.y, this.w, this.h);
        image(portalGamePlayImg, this.x2, this.y, this.w, this.h);
    }
}