import _ from 'lodash';

export default class {

    constructor(game) {
        this.game = game;
        this.displayObject = {};

        this._initDisplay();
    }

    _initDisplay(){
        this.displayObject = this.game.add.sprite(0, 0, 'arrow');
        this.displayObject.anchor.setTo(0.5);

        this.displayObject.inputEnabled = true;
        this.displayObject.pixelPerfectClick = true;
    }

    update(){

    }
}