import Arrow from './Arrow';
import _ from 'lodash';


export default class extends Arrow {

    constructor(game) {
        super(game);
    }

    _initDisplay() {
        super._initDisplay();
        
        this.displayObject.position.x = this.game.world.width - 100;
        this.displayObject.position.y = this.game.world.height/2;

        this.displayObject.events.onInputDown.add(this.game.switchNextAnimal, this.game);
    }

    update() {

    }
}