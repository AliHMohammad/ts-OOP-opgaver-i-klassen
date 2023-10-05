

class Circle {

    constructor(public radius: number) {
        this.radius = radius
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

const newCircle = new Circle(4);


class CircleStatic {
    constructor(public radius: number) {
        this.radius = radius;
    }

    static parse(str: string) {
        const radius = JSON.parse(str).radius;
        return new CircleStatic(radius);
    }
}

const newcircleStatic = CircleStatic.parse('{"radius": 1}');

const _radiusSymbol = Symbol();
const _drawSymbol = Symbol();

class Circle4 {
    constructor(public _radius: number) {
        //@ts-ignore
        this[_radiusSymbol] = _radius;
    }

    [_drawSymbol]() {
        console.log("Draw");
        
    }

    get radius() {
        //@ts-ignore
        return this[_radiusSymbol]
    }
}

const newCircle4 = new Circle4(4)