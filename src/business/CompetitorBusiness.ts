import { CompetitorInputDTO } from "../controller/model/competitorModel";
import { RackingInputDTO } from "../controller/model/rackingModel";
import { CompetitorDatabase } from "../database/CompetitorDatabase";
import { CompetitionBusiness } from "./CompetitionBusiness";
import { Competition } from "./entities/Competitions";
import { Competitors } from "./entities/Competitors";

import { idGenerator } from "./services/IdGenerator";

export class CompetitorBusiness {
  constructor(
    private idGenerator: idGenerator,
    private competitorDatabase: CompetitorDatabase,
    private competitionBusiness: CompetitionBusiness
  ) {}

  // public creating = async (input:CompetitorInputDTO ): Promise<void> => {
  public creating = async (input: CompetitorInputDTO): Promise<void> => {
    const { competition, name, value } = input;

    if (!competition || !name || !value) {
      throw new Error("One or more inputs are not valid!");
    }

    // Also needs a test if the competitions exists and/or is actually is happing.

    const competitionExistOnDB: Competition | undefined =
      await this.competitionBusiness.getCompetition(competition);

    if (!competitionExistOnDB) {
      throw new Error("There is no register of this competition!");
    }

    if (competitionExistOnDB.status === "close") {
      throw new Error("The competition is closed!");
    }

    const id = this.idGenerator.createId();
    const times = 1; 

    const competitor: Competitors = {
      id,
      competition,
      name,
      value,
      times: times
    };

    
    if (competition.toLowerCase().includes("darts")) {
      const competitorDb = await this.competitorDatabase.gettingCompetitorByName(name)
      if(competitorDb){ 
          if(competitorDb.times >=3){ throw new Error("This competitor has already finshed!")}

         if(competitorDb.value <  competitor.value ) {
           competitorDb.value = competitor.value 
           competitorDb.times++;  
          }       
         await  this.competitorDatabase.insertingNewValue(competitorDb) 
         return;
      }
    }
    
    
     await this.competitorDatabase.inserting(competitor);
  
  };
  public gettingRacking = async (input: RackingInputDTO): Promise<void> => {
    const { competitionName } = input;

    if (!competitionName) {
      throw new Error("This is invalid competition!");
    }

    const competitionExistOnDB: Competition | undefined =
      await this.competitionBusiness.getCompetition(competitionName);
    if (!competitionExistOnDB) {
      throw new Error("This competition is not in our Data Base!");
    }

    const competition = {
      competitionName: competitionName,
    };

    if (competitionName.toLowerCase().includes("100m")) {
      return this.competitorDatabase.gettingRanking(competition);
    }

    if (competition.competitionName.includes("darts")) {
     const result = await this.competitorDatabase.gettingRanking(competition);
     return result.reverse()
    }
  };
}
