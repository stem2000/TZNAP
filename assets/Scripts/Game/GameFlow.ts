import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "../System/ServiceLocator";
import LevelLoader from "./LevelLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends cc.Component implements IService {
    levelLoader : LevelLoader;

    _linkService(): void {
        let servloc = ServiceLocator.getGlobal();

        this.levelLoader = servloc.get(LevelLoader);
    }

}
