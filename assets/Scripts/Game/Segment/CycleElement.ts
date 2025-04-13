import Segment from "./Segment";

export default class CycleElement{

    private segment: Segment;
    public next: CycleElement;


    constructor(segment: Segment){
        this.segment = segment;
    }

    public GetSegment(): Segment{
        return this.segment;
    }
}
