import CycleElement from "./CycleElement";
import Segment from "./Segment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentCycle {
    private first: CycleElement;
    private current: CycleElement;

    constructor(segments: Segment[]){
        this.createCycle(segments);
    }

    private createCycle(segments: Segment[]){
        this.first = this.current = new CycleElement(segments[0]);

        for(let i = 1; i < segments.length; i++){
            let cycleElement = new CycleElement(segments[i]);

            this.current = this.current.next = cycleElement;
        }

        this.current = this.current.next = this.first;
    }

    public getCurrent(): Segment{
        return this.current.GetSegment();
    }

    public toNext(): Segment{
        this.current = this.current.next;

        return this.current.GetSegment();
    }

    public getFirst(): Segment{
        return this.first.GetSegment();
    }
    
}
