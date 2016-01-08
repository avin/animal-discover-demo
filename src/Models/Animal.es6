import _ from 'lodash';

export default class {

    constructor(game, name) {
        this.game = game;
        this.name = name;
        this.displayObject = {};

        this.isFlipping = false;
        this.isAppearing = false;

        this._initDisplay();
        this._initTweens();
    }

    _initDisplay() {

        this.displayObject = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'animals',
            `${this.name}_0.png`
        );

        this.displayObject.anchor.setTo(0.5);
        this.displayObject.animations.add('walk', Phaser.Animation.generateFrameNames(`${this.name}_`, 0, 3, '.png', 0), 8, true);

        this.displayObject.scale.setTo(3);

        this.displayObject.inputEnabled = true;
        this.displayObject.pixelPerfectClick = false;
        this.displayObject.events.onInputDown.add(this.flip, this);
    }

    _initTweens() {
        //Appear
        this.appearTween = this.game.add.tween(this.displayObject);
        this.appearTween.to({x: this.game.world.width / 2}, 500);
        this.appearTween.onComplete.add(() => {
            this.isAppearing = false;
        });

        //Appear left
        this.hideLeftTween = this.game.add.tween(this.displayObject);
        this.hideLeftTween.to({x: -this.displayObject.width / 2}, 500);
        this.hideLeftTween.onComplete.add(() => {
            this.hide();
            this.isHidding = false;
        });

        //Appear right
        this.hideRightTween = this.game.add.tween(this.displayObject);
        this.hideRightTween.to({x: this.game.world.width + this.displayObject.width / 2}, 500);
        this.hideRightTween.onStart.add(() => {
            this.isHidding = true;
        });
        this.hideRightTween.onComplete.add(() => {
            this.hide();
            this.isHidding = false;
        });
    }

    walk() {
        this.displayObject.animations.play('walk');
    }

    stopWalk() {
        this.displayObject.animations.stop('walk');
    }

    hide() {
        this.displayObject.visible = false;
    }

    show() {
        this.displayObject.visible = true;
    }

    flip() {
        this.isFlipping = true;
    }

    hideRight() {
        this.isHidding = true;
        this.stopWalk();
        this.hideRightTween.start();
    }

    appearRight() {
        this.isAppearing = true;
        this.show();
        this.walk();
        this.displayObject.position.x = this.game.world.width + this.displayObject.width / 2;
        this.appearTween.start();
    }

    hideLeft() {
        this.isHidding = true;
        this.stopWalk();
        this.hideLeftTween.start();
    }

    appearLeft() {
        this.isAppearing = true;
        this.show();
        this.walk();
        this.displayObject.position.x = -this.displayObject.width / 2;
        this.appearTween.start();
    }


    update() {
        if (this.isFlipping) {
            this.displayObject.angle += 10;
            if (this.displayObject.angle == 0) {
                this.isFlipping = false;
            }
        }
    }
}