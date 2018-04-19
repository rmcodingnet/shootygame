/**
 * Created by Rory's Laptop on 19/04/2018.
 */

'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';

export default class PlayerShooter extends DynamicObject {

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        if (props && props.playerId)
            this.playerId = props.playerId;
        this.class = PlayerShooter;
    }

    onAddToWorld(gameEngine) {
        if (gameEngine.renderer) {
            gameEngine.renderer.addSprite(this, 'playershooter');
        }
    }

}