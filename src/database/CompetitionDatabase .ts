import { Competition } from "../business/entities/Competitions";
import { Competitors } from "../business/entities/Competitors";
import { CompetitionOutputDTO } from "../controller/model/competitionModel";
import { BaseDatabase } from "./BaseDatabase";


let competitions: CompetitionOutputDTO[] = []

export class CompetitionDatabase extends BaseDatabase {
    public inserting = async (input: Competition): Promise<void> => {
        try {

            const competition: CompetitionOutputDTO = {
                id: input.id,
                status: input.status,
                competition_Name: input.competition,
                unit: input.unit
            }
            const table_name = "case_1_competition"

            await BaseDatabase.connection(table_name)
                .insert(competition)

        } catch (error: any) {

            throw new Error(error.sqlmessage || error.message);

        }
    }
    public insertingStatus = async (input: Competition): Promise<void> => {
        try {

            const competition: CompetitionOutputDTO = {
                id: input.id,
                status: input.status,
                competition_Name: input.competition,
                unit: input.unit
            }
            const table_name = "case_1_competition"

            await BaseDatabase.connection(table_name)
                .where({id:competition.id})
                .update({status: competition.status})

        } catch (error: any) {

            throw new Error(error.sqlmessage || error.message);

        }
    }

    public exists = async (input: string ): Promise<Competition | undefined > => {
        try {
            const competition_Name = input

            const table_name = "case_1_competition"

            const result: CompetitionOutputDTO[]
                = await BaseDatabase.connection(table_name)
                    .where({ competition_Name })
       
             
            if(result.length > 0){

                const competition: Competition = {
                    id:result[0].id,
                    status:result[0].status,
                    competition:result[0].competition_Name,
                    unit:result[0].unit
                }
                return competition
            } return 

        }
        catch (error: any) {

            throw new Error(error.sqlmessage || error.message);

        }
    }
}