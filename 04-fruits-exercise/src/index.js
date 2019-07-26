import foods from "./food";
import { choice, remove } from "./helpers";

let fruit = choice(foods);
console.log(`I would like to have a ${fruit} please.`);
console.log(`Here you go ${fruit}`);
let remaining = remove(foods, fruit);
console.log(`We have  ${remaining} left`);
