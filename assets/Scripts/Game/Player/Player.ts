import aBootableServiceComponent from "../../System/aBootableServiceComponent";
import { Constructor, ServiceContainer } from "../../System/ServiceContainer";
import FuncPredicate from "../../System/StateMachine/FuncPredicate";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import Hitline from "../Hitline";
import PlayerValidator from "../PlayerValidator";
import PlayerMoving from "./PlayerMoving";
import BuildState from "./States/BuildState";
import EdgeState from "./States/EdgeState";
import IdleState from "./States/IdleState";
import PlantState from "./States/PlantState";
import RunToSegmentState from "./States/RunToSegmentState";
import StickState from "./States/StickState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends aBootableServiceComponent{
    stateMachine : StateMachine = new StateMachine();

    isStickTime: boolean = false;
    isEdgeTime: boolean = false;
    isBuildTime: boolean = false;
    isRunToSegmentTime: boolean = false;
    isRunToFallTime: boolean = false;

    @property(Hitline)
    hitline: Hitline = null;
    
    validator: PlayerValidator;
    
    public override _inject_(container: ServiceContainer): void {
        this.validator = container.get(PlayerValidator);
    }

    public override _init_(): void{
        const plant = new PlantState(this.validator, this);
        const idle = new IdleState();
        const stick = new StickState(this.validator, new PlayerMoving(this));
        const edge = new EdgeState(this, this.validator);
        const build = new BuildState(this.hitline, this.validator);
        const runToSegment = new RunToSegmentState(this.validator, this)

        this.stateMachine.addTransition(plant, idle, new FuncPredicate(()=> true))
        this.stateMachine.addTransition(idle, stick, new FuncPredicate(()=> this.isStickTime))
        this.stateMachine.addTransition(stick, edge, new FuncPredicate(()=> this.isEdgeTime))
        this.stateMachine.addTransition(edge, build, new FuncPredicate(()=> this.isBuildTime))
        this.stateMachine.addTransition(build, runToSegment, new FuncPredicate(()=> this.isRunToSegmentTime))

        this.stateMachine.setState(plant);
    }

    protected update(dt: number): void {
        this.stateMachine.update();
    }

    public moveToEdge(){
        this.isStickTime = false;
        this.isEdgeTime = true;
    }

    public unlockBuilding(){
        this.isEdgeTime = false;
        this.isBuildTime = true;
    }

    public RunToSegment(){
        this.isBuildTime = false;
        this.isRunToSegmentTime = true;
    }

    public RunToFall(){
        this.isBuildTime = false;
        this.isRunToFallTime = true;
    }

    public stickToSegment(){
        this.isStickTime = true;
    }
}


