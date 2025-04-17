import { IInjectable } from "../../Interfaces/Interfaces";
import { ServiceLocator } from "../../System/ServiceLocator";
import { iState } from "../../System/StateMachine/iState";
import { GlobalEvent } from "../GlobalEvent";

export default class GameReloadState extends iState{

    public constructor(){
        super();
    }

    public override onEnter(): void {

    }

    public override onExit(): void {

    }

}
