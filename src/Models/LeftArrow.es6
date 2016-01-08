import Arrow from './Arrow';
import _ from 'lodash';


export default class extends Arrow {

    constructor(game) {
        super(game);
    }

    _initDisplay() {
        super._initDisplay();

        this.displayObject.scale.setTo(-1, 1);
        this.displayObject.position.x = 100;
        this.displayObject.position.y = this.game.world.height/2;

        this.displayObject.events.onInputDown.add(this.game.switchPreviousAnimal, this.game);
    }

    update() {

    }
}