
export enum  Unit  {
    "s"= "s",
    "m"= "m"
}

export class Competition { 

    constructor(
        public id: string, 
        public status : string,
        public competition : string,
        public unit: Unit
    ){}
}