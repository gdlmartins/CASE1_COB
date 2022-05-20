import { Request, Response } from "express";
import { CompetitorBusiness } from "../business/CompetitorBusiness";
import { CompetitorInputDTO } from "./model/competitorModel";





// {
//     "competicao": "100m classificatoria 1", 
//     "atleta": "Joao das Neves", 
//     "value": "10.234", 
//     "unidade": "s"
//   }


export class CompetitorController {
    constructor(
        private competitorBusiness: CompetitorBusiness
    ) { }

    public creating = async (request: Request, response: Response): Promise<void> => {
        try {
            const input = request.body;
            const competitor: CompetitorInputDTO = {
                competition: input.competition,
                name: input.name,
                value: input.value
            }

            await this.competitorBusiness.creating(competitor)

            response.status(201).end("Success!")

        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
    public gettingRacking = async (request: Request, response: Response): Promise<void> => { 
        try{ 
            const input = request.body;
            
            const competition = { 
               competitionName: input.competition,
               }
                 const result =  await this.competitorBusiness.gettingRacking(competition) 
                 response.status(201).send(result)
           }catch(error: any){ 
               response.status(400).send(error.message)
           }
    }
}