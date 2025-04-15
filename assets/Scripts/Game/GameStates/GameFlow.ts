import iBootableComponent from "../../System/iBootableComponent";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import LevelLoader from "../LevelLoader";
import GameBootState from "./GameBootState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends iBootableComponent {
    levelLoader : LevelLoader;
    stateMachine : StateMachine = new StateMachine();

    _init_(): void {
        let gameBootState = new GameBootState();

    }

    _inject_(): void {}

}
