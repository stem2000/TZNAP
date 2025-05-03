import aBootableServiceComponent from "../../System/aBootableServiceComponent";
import { Constructor, ServiceContainer } from "../../System/ServiceContainer";
import FuncPredicate from "../../System/StateMachine/FuncPredicate";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import Hitline from "../Hitline";
import GameplayCoordinator from "../GameplayCoordinator";
import PlayerMover from "./PlayerMover";
import BuildState from "./States/BuildState";
import EdgeState from "./States/EdgeState";
import IdleState from "./States/IdleState";
import PlantState from "./States/PlantState";
import RunState from "./States/RunState";
import StickState from "./States/StickState";
import Event from "../../System/Event";
import Request from "../../System/Request";
import Segment from "../Segment/Segment";
import GameInput from "../../System/GameInput";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends aBootableServiceComponent{
    input: GameInput;

    stateMachine : StateMachine = new StateMachine();

    isStickTime: boolean = false;
    isEdgeTime: boolean = false;
    isBuildTime: boolean = false;
    isRunTime: boolean = false;
    isRunToFallTime: boolean = false;

    @property(Hitline)
    hitline: Hitline = null;
    mover: PlayerMover = null;

    eventOnSticked: Event;
    eventOnEdged: Event;

    requestProximate: Request<[], Segment>;
    requestValidate: Request<[cc.Vec2, number], void>;
    requestLashit: Request<[], number>;
    
    public override _inject_(container: ServiceContainer): void {
        this.input = container.get(GameInput);

        var gameCoordinator = container.get(GameplayCoordinator);

        this.requestProximate = new Request<[], Segment>(gameCoordinator.GetProximateSegment.bind(gameCoordinator));
        this.requestValidate = new Request<[cc.Vec2, number], void>(gameCoordinator.ValidateHit.bind(gameCoordinator));
        this.requestLashit = new Request<[], number>(gameCoordinator.GetLasthit.bind(gameCoordinator));
    }

    public override _init_(): void {
        this.initializeEvents();
        this.initializeStates();
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

    public run(){
        this.isBuildTime = false;
        this.isRunTime = true;
    }

    public runToFall(){
        this.isBuildTime = false;
        this.isRunToFallTime = true;
    }

    public stickToSegment(){
        this.isStickTime = true;
    }

    public subscribeToOnStickedEvent(subsriber: Function){
        this.eventOnSticked.Subscribe(subsriber);
    }

    public unsubscribeFromOnStickedEvent(subsriber: Function){
        this.eventOnSticked.Unsubscribe(subsriber);
    }

    public subscribeToOnEdgedEvent(subsriber: Function){
        this.eventOnSticked.Subscribe(subsriber);
    }

    public unsubscribeFromOnEdgedEvent(subsriber: Function){
        this.eventOnSticked.Unsubscribe(subsriber);
    }

    private initializeComponents(){
        this.mover = new PlayerMover(this);
    }

    private initializeEvents(){
        this.eventOnSticked = new Event();
        this.eventOnEdged = new Event();
    }

    private initializeStates(){
        const idle = new IdleState();
        const run = new RunState();
        const plant = new PlantState(this.requestProximate, this);
        const build = new BuildState(this.hitline, this.requestValidate, this.input);
        const stick = new StickState(new PlayerMover(this), this.eventOnSticked, this.requestProximate);
        const edge = new EdgeState(new Request<[], void>(this.unlockBuilding.bind(this)), this.requestProximate, this.node);

        this.stateMachine.addTransition(plant, idle, new FuncPredicate(()=> true));
        this.stateMachine.addTransition(idle, stick, new FuncPredicate(()=> this.isStickTime));
        this.stateMachine.addTransition(stick, edge, new FuncPredicate(()=> this.isEdgeTime));
        this.stateMachine.addTransition(edge, build, new FuncPredicate(()=> this.isBuildTime));
        this.stateMachine.addTransition(build, run, new FuncPredicate(()=> this.isRunTime));

        this.stateMachine.setState(plant);
    }
}


