import { CompetitionInputDTO } from "../controller/model/competitionModel"
import { CompetitionDatabase } from "../database/CompetitionDatabase ";
import { Competition, Unit } from "./entities/Competitions";
import { idGenerator } from "./services/IdGenerator";


export class CompetitionBusiness {
    constructor(
        private idGenerator: idGenerator,
        private CompetitionDatabase: CompetitionDatabase
    ) { }

    public startingCompetition = async (input: CompetitionInputDTO): Promise<void> => {

        const { status, competitionName } = input;

        if (!status || !competitionName) {
            throw new Error("Please fill up all the fields!");
        }

        const competitionExistOnDB = await this.getCompetition(competitionName)


        if (competitionExistOnDB) {
            throw new Error("This name has alread been used!");
        }

        const id = this.idGenerator.createId()

        let unit: Unit;
        if (competitionName.toLowerCase().includes("100m")) {
            unit = Unit.s
        } else if (competitionName.toLowerCase().includes("dart")) {
            unit = Unit.m
        } else throw new Error("That is not a valid competition!");


        const competitiontoDB: Competition = {
            id,
            status,
            competition: competitionName,
            unit
        }


        await this.CompetitionDatabase.inserting(competitiontoDB)

    }
    public closingCompetition = async (input: CompetitionInputDTO): Promise<void> => {

        const { status, competitionName } = input;

        if (!status || !competitionName) {
            throw new Error("Please fill up all the fields!");
        }

        const competitionExistOnDB: Competition | undefined = await this.getCompetition(competitionName)

        if (!competitionExistOnDB) {
            throw new Error("There is no register of this competition!");
        }


        const competitionTocloseDB = {
            id: competitionExistOnDB.id,
            status: status,
            competition: competitionExistOnDB.competition,
            unit: competitionExistOnDB.unit
        }

        // await funcao that will get 

      


        await this.CompetitionDatabase.insertingStatus(competitionTocloseDB)

    }

    public getCompetition = async (competetitionName: string): Promise<Competition | undefined> => {

        if (!competetitionName) {
            throw new Error("There is not a valid Competition!");
        }

        const result = await this.CompetitionDatabase.exists(competetitionName)

        return result
    }
}