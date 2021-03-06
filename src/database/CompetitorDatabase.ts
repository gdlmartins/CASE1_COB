import { Competitors } from "../business/entities/Competitors";
import { Competitor, CompetitorFRomDBDTO, CompetitorOutputDTO, CompetitorwId } from "../controller/model/competitorModel";
import { RackingInputDTO } from "../controller/model/rackingModel";
import { BaseDatabase } from "./BaseDatabase";
import { RackingOutDTO } from "./model/racking";


let competitors: Competitors[] = []

export class CompetitorDatabase extends BaseDatabase {
    public inserting = async (input: Competitors): Promise<void> => {
        try {
         
            const table_name = "case_1_competitors"
            
            const competitor: CompetitorOutputDTO = {
                id: input.id,
                competition: input.competition,
                name: input.name,
                value: input.value,
                times: input.times
            }
            await BaseDatabase.connection(table_name)
            .insert(competitor)
        } catch(error: any){ 
           throw new Error(error.sqlmessage || error.message);
       }
        }
        public insertingNewValue = async (input: Competitors): Promise<void> => {
            try {
                
                const table_name = "case_1_competitors"
                
                const competitor: CompetitorOutputDTO = {
                    id: input.id,
                    competition: input.competition,
                    name: input.name,
                    value: input.value,
                    times: input.times
            }
            await BaseDatabase.connection(table_name)
            .where({ name: competitor.name })
            .update({ value: competitor.value })
            .then(
                await BaseDatabase.connection(table_name)
                .where({ name: competitor.name })
                .update({ times: competitor.times })
                )
            } catch(error: any){ 
                throw new Error(error.sqlmessage || error.message);
            }
        }
            public gettingCompetitorByName = async (input: string): Promise<CompetitorwId | undefined> => {
                try{
                    const table_name = "case_1_competitors"
                    const name = input;
                    
                    const [competitorFromDb]: CompetitorFRomDBDTO[] =
                    await BaseDatabase.connection(table_name)
                    .where({ name })
                    
                    if (competitorFromDb) {
                        const competitor: CompetitorwId = {
                            id: competitorFromDb.id,
                            competition: competitorFromDb.competition,
                            name: competitorFromDb.name,
                            value: competitorFromDb.value,
                            times: competitorFromDb.times
                        }
                        return competitor;
        }
    }catch(error: any){ 
            throw new Error(error.sqlmessage || error.message);
        }
    }
    public gettingRanking = async (input: RackingInputDTO): Promise<any> => {
      try{
        const table_name = "case_1_competitors"

        const competition: RackingOutDTO = {
            competition: input.competitionName
        }
        const result = await BaseDatabase.connection(table_name)
            .where(competition).orderBy("value")
        return result
    } catch(error: any){ 
        throw new Error(error.sqlmessage || error.message);
    }
    } 

}