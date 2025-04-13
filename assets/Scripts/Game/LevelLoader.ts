import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "../System/ServiceLocator";
import LevelBuilder from "./LevelBuilder";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelLoader extends cc.Component implements IService {

    private levelBuilder: LevelBuilder;

    public loadOneSegmentedLevel(){
        this.levelBuilder.buildOneSegmentedLevel();
    }

    _linkService(): void {
        let servloc = ServiceLocator.getGlobal();

        this.levelBuilder = servloc.get(LevelBuilder);
    }
}
