// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Segment from "./Segment";

export default class CycledSegment{

    private segment: Segment;
    public next: CycledSegment;


    constructor(segment: Segment){
        this.segment = segment;
    }

    public GetSegment(): Segment{
        return this.segment;
    }
}
