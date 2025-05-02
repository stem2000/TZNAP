const {ccclass, property} = cc._decorator;

@ccclass("Limits")
export default class Limits {

    @property(cc.Float)
    private min: number = 0;

    @property(cc.Float)
    private max: number = 0;


    public getValueInLimits(): number{
        return Math.randomInRange(this.min, this.max);
    }

    public isPointInside(point : number): boolean{
        return point > this.min && point < this.max;
    }
}
