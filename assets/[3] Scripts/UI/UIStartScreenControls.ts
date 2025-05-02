import GameFlow from "../Game/GameStates/GameFlow";
import { ServiceContainer } from "../System/ServiceContainer";
import aBootableComponent from "../System/aBootableComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export abstract default class UIStartScreenControls extends aBootableComponent {
    private gameFlow: GameFlow;
    
    @property(cc.Button)
    private startButton: cc.Button = null;

    override _inject_(container: ServiceContainer) {
        this.gameFlow = container.get(GameFlow);
    }

    protected start(): void {
        this.startButton.node.on('click', () => {this.gameFlow.confirmGameStart();}, this);
    }

}
