export interface CompetitorInputDTO {
    competition: string
    name: string
    value: number
}
export interface CompetitorOutputDTO {
    id: string
    competition: string
    name: string
    value: number
    times: number 
}
export interface CompetitorFRomDBDTO {
    id: string
    competition: string
    name: string
    value: number
    times: number 
}

export class Competitor {
    constructor(
        private competition: string,
        private name: string,
        private value: number
    ) { }
}
export interface CompetitorwId {

    id: string
    competition: string
    name: string 
    value: number
    times: number  

}