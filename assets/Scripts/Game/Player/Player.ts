import { IInjectable } from "../../Interfaces/Interfaces";
import iBootableComponent from "../../System/iBootableComponent";
import { ServiceLocator } from "../../System/ServiceLocator";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import Segment from "../Segment/Segment";
import Idle from "./States/Idle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PLayer extends iBootableComponent{
    stateMachine : StateMachine = new StateMachine();
    currentSegment: Segment;
    
    public _inject_(): void {
        let servloc = ServiceLocator.getGlobal();
    }

    public _init(): void{
        const idle = new Idle();
    }

    protected update(dt: number): void {
        this.stateMachine.update();
    }
}
