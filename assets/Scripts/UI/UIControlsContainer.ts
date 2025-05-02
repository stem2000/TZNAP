import GameFlow from "../Game/GameStates/GameFlow";
import { ServiceContainer } from "../System/ServiceContainer";
import aBootableComponent from "../System/aBootableComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIControlsContainer extends aBootableComponent {
    private gameFlow: GameFlow;

    override _inject_(container: ServiceContainer) {
        this.gameFlow = container.get(GameFlow);
    }

}
