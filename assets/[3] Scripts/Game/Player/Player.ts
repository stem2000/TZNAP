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
    _input: GameInput;

    _stateMachine : StateMachine = new StateMachine();

    _isStickTime: boolean = false;
    _isEdgeTime: boolean = false;
    _isBuildTime: boolean = false;
    _isRunTime: boolean = false;
    _isDeathRunTime: boolean = false;
    _isFallTime: boolean = false;


    @property(Hitline)
    hitline_: Hitline = null;
    _mover: PlayerMover = null;

    _eventOnStop: Event;
    _eventOnEdged: Event;

    _requestProximate: Request<[], Segment>;
    _requestValidate: Request<[cc.Vec2, number], void>;
    _requestLasthit: Request<[], number>;
    
    public override _inject_(container: ServiceContainer): void {
        this._input = container.get(GameInput);

        var gameCoordinator = container.get(GameplayCoordinator);

        this._requestProximate = new Request<[], Segment>(gameCoordinator.getProximateSegment.bind(gameCoordinator));
        this._requestValidate = new Request<[cc.Vec2, number], void>(gameCoordinator.validateHit.bind(gameCoordinator));
        this._requestLasthit = new Request<[], number>(gameCoordinator.getLasthit.bind(gameCoordinator));
    }

    public override _init_(): void {
        this.initializeComponents();
        this.initializeEvents();
        this.initializeStates();
    }

    protected update(dt: number): void {
        this._stateMachine.update();
    }

    public moveToEdge(){
        this._isStickTime = false;
        this._isEdgeTime = true;
    }

    public unlockBuilding(){
        this._isEdgeTime = false;
        this._isBuildTime = true;
    }

    public run(){
        this._isBuildTime = false;
        this._isRunTime = true;
    }

    public runToFall(){
        this._isBuildTime = false;
        this._isDeathRunTime = true;
    }

    public stickToSegment(){
        this._isRunTime = false;
        this._isStickTime = true;
    }

    public subscribeToOnPlayerStop(subsriber: Function){
        this._eventOnStop.Subscribe(subsriber);
    }

    public unsubscribeFromOnPlayerStopEvent(subsriber: Function){
        this._eventOnStop.Unsubscribe(subsriber);
    }

    public subscribeToOnEdgedEvent(subsriber: Function){
        this._eventOnStop.Subscribe(subsriber);
    }

    public unsubscribeFromOnEdgedEvent(subsriber: Function){
        this._eventOnStop.Unsubscribe(subsriber);
    }

    private initializeComponents(){
        this._mover = new PlayerMover(this.node);
    }

    private initializeEvents(){
        this._eventOnStop = new Event();
        this._eventOnEdged = new Event();
    }

    private initializeStates(){
        const idle = new IdleState();
        const run = new RunState(this._mover, this._requestLasthit, this._eventOnStop);
        const plant = new PlantState(this._requestProximate, this);
        const build = new BuildState(this.hitline_, this._requestValidate, this._input);
        const stick = new StickState(this._mover, this._requestProximate);
        const edge = new EdgeState(new Request<[], void>(this.unlockBuilding.bind(this)), this._requestProximate, this.node);

        this._stateMachine.addTransition(plant, idle, new FuncPredicate(()=> true));
        this._stateMachine.addTransition(idle, stick, new FuncPredicate(()=> this._isStickTime));
        this._stateMachine.addTransition(stick, edge, new FuncPredicate(()=> this._isEdgeTime));
        this._stateMachine.addTransition(edge, build, new FuncPredicate(()=> this._isBuildTime));
        this._stateMachine.addTransition(build, run, new FuncPredicate(()=> this._isRunTime));
        this._stateMachine.addTransition(run, stick, new FuncPredicate(()=> this._isStickTime));

        this._stateMachine.setState(plant);
    }
}


