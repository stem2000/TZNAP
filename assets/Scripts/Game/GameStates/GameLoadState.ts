import { iState } from "../../System/StateMachine/iState";
import LevelLoader from "../LevelLoader";

export default class GameLoadState extends iState {

    levelLoader : LevelLoader;

    public constructor(levelLoader : LevelLoader){
        super();
        this.levelLoader = levelLoader;
    }

    public override onEnter(): void {
        this.levelLoader.loadOneSegmentedLevel();
    }
}
