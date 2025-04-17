import { IInjectable } from "../../Interfaces/Interfaces";
import iBootableComponent from "../../System/iBootableComponent";
import InputHandler from "../../System/InputHandler";
import { ServiceLocator } from "../../System/ServiceLocator";
import FuncPredicate from "../../System/StateMachine/FuncPredicate";
import { iPredicate } from "../../System/StateMachine/iPredicate";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import { GlobalEvent } from "../GlobalEvent";
import Hitline from "../Hitline";
import PlayerValidator from "../PlayerValidator";
import Segment from "../Segment/Segment";
import BuildState from "./States/BuildState";
import EdgeState from "./States/EdgeState";
import IdleState from "./States/IdleState";
import PlantState from "./States/PlantState";
import StickState from "./States/StickState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends iBootableComponent{
    @property(Hitline)
    hitline: Hitline;

    stateMachine : StateMachine = new StateMachine();
    validator: PlayerValidator;
    inputHandler: InputHandler;

    isStickTime: boolean = false;
    isEdgeTime: boolean = false;
    isBuildTime: boolean = false;
    
    public override _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.validator = servloc.get(PlayerValidator);
    }

    public override _init_(): void{
        const plant = new PlantState(this.validator, this);
        const idle = new IdleState();
        const stick = new StickState(this.validator, this);
        const edge = new EdgeState(this, this.validator);
        const build = new BuildState(this);

        this.stateMachine.addTransition(plant, idle, new FuncPredicate(()=> true))
        this.stateMachine.addTransition(idle, stick, new FuncPredicate(()=> this.isStickTime))
        this.stateMachine.addTransition(stick, edge, new FuncPredicate(()=> this.isEdgeTime))
        this.stateMachine.addTransition(edge, build, new FuncPredicate(()=> this.isBuildTime))

        this.stateMachine.setState(plant);
    }

    protected update(dt: number): void {
        this.stateMachine.update();
    }
    
    public moveTo(position: cc.Vec3){
        this.node.position = position;
    }

    public moveToEdge(){
        this.isStickTime = false;
        this.isEdgeTime = true;
    }

    public unlockBuilding(){
        this.isEdgeTime = false;
        this.isBuildTime = true;
    }

    public lockBuilding(){
        let hitlineWorldPosition = this.hitline.node.convertToWorldSpaceAR(new cc.Vec2(0,0));

        this.hitline.stopGrowing();
        this.validator.ValidateHit(hitlineWorldPosition, this.hitline.lenght)
    }

    public stickToSegment(){
        this.isStickTime = true;
    }

}
