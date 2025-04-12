import CycleElement from "./CycleElement";
import Segment from "./Segment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentCycler {
    private first: CycleElement;
    private pointed: CycleElement;

    constructor(segments: Segment[]){
        this.createCycle(segments);
    }

    private createCycle(segments: Segment[]){
        this.first = this.pointed = new CycleElement(segments[0]);

        for(let i = 1; i < segments.length; i++){
            let cycled = new CycleElement(segments[i]);

            this.pointed = this.pointed.next = cycled;
        }

        this.pointed = this.pointed.next = this.first;
    }

    public getNext(): Segment{
        this.pointed = this.pointed.next;

        return this.pointed.GetSegment();
    }

    public getFirst(): Segment{
        return this.first.GetSegment();
    }
    
}
