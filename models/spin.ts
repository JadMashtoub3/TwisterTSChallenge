import { BodyParts } from "./bodyParts.enum";
import { Colours } from "./colours.enum";

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number  **
export class SpinRecord implements ISpin {
public num: Number;
public colour: Colours;
public bodyPart: BodyParts;


constructor(num: Number, Colour: Colours, BodyPart: BodyParts) {
              this.num = num;
              this.colour = Colour;
              this.bodyPart = BodyPart;
            }
          }