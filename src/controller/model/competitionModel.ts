import { Unit } from "../../business/entities/Competitions";

export interface CompetitionInputDTO { 
    competitionName: string
    status: string
}
export interface CompetitionOutputDTO  { 
    id:string
    unit:Unit
    competition_Name: string
    status: string

}

