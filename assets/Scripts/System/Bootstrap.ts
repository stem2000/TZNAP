import BootstrapStrategy from "./BootstrapStrategies/BootstrapStrategy";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Bootrstrap extends cc.Component {
    @property(BootstrapStrategy)
    bootstrapStrategy: BootstrapStrategy = null;

    onLoad(): void {
        this.bootstrapStrategy.Boot();
    }
}
