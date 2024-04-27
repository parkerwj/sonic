import { v2d_t } from "../../core/v2d"
import { objectmachine_t } from "./base/objectmachine"
import { objectdecorator_t, get_object_instance } from "./base/objectdecorator"
import { enemy_get_observed_player } from "./../enemy"
import { player_t, player_bounce } from "./../player"
import { brick_list_t } from "./../brick"
import { item_list_t } from "./../item"
import { enemy_list_t } from "./../enemy"

export interface objectdecorator_bounceplayer_t extends objectdecorator_t {}

export const objectdecorator_bounceplayer_new = (decorated_machine:objectmachine_t) => {
  const obj:objectmachine_t = {
    init,
    release,
    update,
    render,
    get_object_instance
  }

  const me:objectdecorator_bounceplayer_t = <objectdecorator_bounceplayer_t>obj;
  const dec:objectdecorator_t = <objectdecorator_t>me;

  dec.decorated_machine = decorated_machine;

  return obj;
}

const init = (obj:objectmachine_t) => {
  const dec:objectdecorator_t = <objectdecorator_t>obj;
  const decorated_machine:objectmachine_t = dec.decorated_machine;

  decorated_machine.init(decorated_machine);
}

const release = (obj:objectmachine_t) => {
  const dec:objectdecorator_t = <objectdecorator_t>obj;
  const decorated_machine:objectmachine_t = dec.decorated_machine;
  
  decorated_machine.release(decorated_machine);
  //free(obj);
}

const update = (obj:objectmachine_t, team:player_t[], team_size:number, brick_list:brick_list_t, item_list:item_list_t, object_list:enemy_list_t) => {
  const dec:objectdecorator_t = <objectdecorator_t>obj;
  const decorated_machine:objectmachine_t = dec.decorated_machine;
  const me:objectdecorator_bounceplayer_t = <objectdecorator_bounceplayer_t>obj;
  const player = enemy_get_observed_player(obj.get_object_instance(obj));

  player_bounce(player);

  decorated_machine.update(decorated_machine, team, team_size, brick_list, item_list, object_list);
}

const render = (obj:objectmachine_t, camera_position:v2d_t) => {
  const dec:objectdecorator_t = <objectdecorator_t>obj;
  const decorated_machine:objectmachine_t = dec.decorated_machine;

  decorated_machine.render(decorated_machine, camera_position);
} 
