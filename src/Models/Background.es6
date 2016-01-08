import _ from 'lodash';

export default class {

    constructor(game) {
        this.game = game;
        this.displayObject = {};

        this._initDisplay();
    }

    _initDisplay(){
        let game = this.game;
        let displayObject = this.displayObject;

        displayObject = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        displayObject.scale.setTo(2.3);
        displayObject.anchor.setTo(0.5);
    }

    update(){

    }
}