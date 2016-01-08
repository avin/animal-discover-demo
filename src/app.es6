import Background from './Models/Background';
import Animal from './Models/Animal';
import LeftArrow from './Models/LeftArrow';
import RightArrow from './Models/RightArrow';
import _ from 'lodash';

let game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload(){
        this.load.image('background', 'assets/images/backgorund.jpg');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.atlasJSONHash('animals', 'assets/images/animals.png', 'assets/images/animals.json');
    },
    create(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


        this.models = {};

        this.models.background = new Background(this);

        this.models.animals = [];
        let animals = ['fox', 'bear', 'cat', 'pig'];
        _.each(animals, (animalName) => {
            let animal = new Animal(this, animalName);
            animal.hide();
            this.models.animals.push(animal);
        });
        this.currentAnimalIndex = 0;
        this.models.animals[this.currentAnimalIndex].show();
        this.models.animals[this.currentAnimalIndex].walk();

        this.models.leftArrow = new LeftArrow(this);
        this.models.rightArrow = new RightArrow(this);

    },
    update(){
        let modelUpdate = function (models) {
            _.each(models, (model) => {
                if (_.isArray(model)) {
                    modelUpdate(model)
                } else {
                    if (_.isFunction(model.update)) {
                        model.update();
                    }
                }
            });
        };
        modelUpdate(this.models);
    },
    switchNextAnimal(){
        //Если еще не закончилась предыдущая анимацию - выходим
        if (this.models.animals[this.currentAnimalIndex].isAppearing){
            return false;
        }

        if (this.models.animals[this.currentAnimalIndex + 1]) {
            this.newAnimalIndex = this.currentAnimalIndex + 1;
        } else {
            this.newAnimalIndex = 0;
        }
        this.models.animals[this.currentAnimalIndex].hideLeft();
        this.models.animals[this.newAnimalIndex].appearRight();

        this.currentAnimalIndex = this.newAnimalIndex;
    },
    switchPreviousAnimal(){
        //Если еще не закончилась предыдущая анимацию - выходим
        if (this.models.animals[this.currentAnimalIndex].isAppearing){
            return false;
        }

        if (this.models.animals[this.currentAnimalIndex - 1]) {
            this.newAnimalIndex -= 1;
        } else {
            this.newAnimalIndex = this.models.animals.length - 1;
        }

        this.models.animals[this.currentAnimalIndex].hideRight();
        this.models.animals[this.newAnimalIndex].appearLeft();

        this.currentAnimalIndex = this.newAnimalIndex;
    }
});