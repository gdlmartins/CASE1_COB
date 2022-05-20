import {Request, Response } from "express"; 
import { CompetitionBusiness } from "../business/CompetitionBusiness";
import { CompetitionInputDTO } from "./model/competitionModel";


 export class CompetitionController { 
     constructor(
         private competitionBusiness : CompetitionBusiness
     ){}

     public creating = async (request: Request, response: Response): Promise<void> => { 
         try{ 
             const input = request.body;
             
             const competition : CompetitionInputDTO = { 
                competitionName: input.competitionName,
                 status: input.status
                }
                   await this.competitionBusiness.startingCompetition(competition)
                   response.status(201).end("Success")
                   
            }catch(error: any){ 
                response.status(400).send(error.message)
            }
     }
     public closing = async (request: Request, response: Response): Promise<void> => { 
         try{ 
             const input = request.body;
             
             const competition : CompetitionInputDTO = { 
                competitionName: input.competitionName,
                 status: input.status
                }
                   await this.competitionBusiness.closingCompetition(competition)
                   response.status(200).send("Success!")
            }catch(error: any){ 
                response.status(400).send(error.message)
            }
     }


     

 }