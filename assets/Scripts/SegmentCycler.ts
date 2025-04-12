// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CycledSegment from "./CycledSegment";
import Segment from "./Segment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentCycler extends cc.Component {
    private first: CycledSegment;
    private pointed: CycledSegment;

    public CreateCycle(segments: Segment[]){
        this.first = this.pointed = new CycledSegment(segments[0]);

        for(let i = 1; i < segments.length; i++){
            let cycled = new CycledSegment(segments[i]);

            this.pointed = this.pointed.next = cycled;
        }

        this.pointed = this.pointed.next = this.first;
    }

    public GetNext(): Segment{
        this.pointed = this.pointed.next;

        return this.pointed.GetSegment();
    }
    
}
