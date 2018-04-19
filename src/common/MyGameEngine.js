'use strict';

import TwoVector from 'lance/serialize/TwoVector';
import PlayerShooter from './PlayerShooter';
import Bullet from './Bullet';
const PADDING = 20;
const WIDTH = 400;
const HEIGHT = 400;
const PLAYERSHOOTER_WIDTH = 10;
const PLAYERSHOOTER_HEIGHT = 10;

start() {
    super.start();

    this.on('postStep', () => {this.postStepHandleBullet();});
    this.on('objectAdded', (object) => {
       if (object.class === Bullet) {
           this.bullet = object;
    } else if (object.playerId === 1 ){
        this.playershooter1 = object;
    } else if (object.playerId === 2) {
        this.playershooter2 = object;
    }
    });
}

registerClasses(serializer) {
    serializer.registerClass(PlayerShooter);
    serializer.registerClass(Bullet);
}

processInput(inputData, playerId) {
    super.processInput(inputData, playerId);

    let playerShooter = this.world.queryObject({ playerId });
    if (playerShooter) {
        if (inputData.input === 'up') {
            playerShooter.position.y -= 5;
        } else if (inputData.input === 'down'){
            playerShooter.position.y += 5;
        } else if (inputData.input === 'left') {
            playerShooter.position.x -= 5;
        } else if (inputData.input === 'right') {
            playerShooter.position.x += 5;
        }
    }
}

initGame() {

    this.addObjectToWorld(new PlayerShooter(this,null, { position: new TwoVector(PADDING, 0), playerId: 1}));
    this.addObjectToWorld(new PlayerShooter(this,null, { position: new TwoVector(WIDTH - PADDING, 0), playerId: 2}));
    this.addObjectToWorld(new Bullet(this, null, { position: new TwoVector(WIDTH /2, HEIGHT / 2) }));
}

postStepHandleBullet() {
    if (!this.bullet){
        return;
    }

    // Check left edge
    if (this.bullet.position.x <= PADDING + PLAYERSHOOTER_WIDTH &&
        this.bullet.position.y <= this.playershooter1.position.y + PLAYERSHOOTER_HEIGHT &&
        this.bullet.velocity.x > 0){
        //bullet hit player 1

        this.bullet.velocity.x *= -1;
        this.bullet.position.x = PADDING + PLAYERSHOOTER_WIDTH + 1;
        console.log('Player 1 hit');
    }

    // Check right edge
    if (this.bullet.position.x >= WIDTH - PADDING - PLAYERSHOOTER_WIDTH &&
        this.bullet.position.y >= this.playershooter2.position.y && this.bullet.position.y <= this.playershooter2.position.y + PLAYERSHOOTER_HEIGHT &&
        this.bullet.velocity.x > 0) {

        // bullet hits player 2
        this.ball.velocity.x *= -1;
        this.ball.position.x = WIDTH - PADDING - PLAYERSHOOTER_WIDTH - 1;
    }




}