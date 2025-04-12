// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass("Limits")
export default class Limits {

    @property(cc.Float)
    private min: number = 0;

    @property(cc.Float)
    private max: number = 0;


    constructor(){}


    public GetValueInLimits(): number{
        return Math.randomInRange(this.min, this.max);
    }

    public IsPointInside(point : number): boolean{
        return point > this.min && point < this.max;
    }
}
