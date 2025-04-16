import { IInjectable } from "../../Interfaces/Interfaces";
import { ServiceLocator } from "../../System/ServiceLocator";
import { iState } from "../../System/StateMachine/iState";
import { GlobalEvent } from "../GlobalEvent";
import LevelLoader from "../LevelLoader";

export default class GameReloadState extends iState{
    levelLoader : LevelLoader;

    public constructor(levelLoader : LevelLoader){
        super();

        this.levelLoader = levelLoader;
    }

    public override onEnter(): void {
        this.levelLoader.loadTwoSegmentedLevel();
    }

    public override onExit(): void {

    }

}
