import { app } from "./app";
import { CompetitionBusiness } from "./business/CompetitionBusiness";
import { CompetitorBusiness } from "./business/CompetitorBusiness";
import { idGenerator } from "./business/services/IdGenerator";
import { CompetitionController } from "./controller/CompetitionController";
import { CompetitorController } from "./controller/CompetitorController"
import { CompetitionDatabase } from "./database/CompetitionDatabase ";
import { CompetitorDatabase } from "./database/CompetitorDatabase";
import { Migrations } from "./database/migrations";
import { BaseDatabase } from "./database/BaseDatabase";


const competitionBusiness = new CompetitionBusiness(
    new idGenerator(),
    new CompetitionDatabase()
)

const competitorBusiness = new CompetitorBusiness(
    new idGenerator(),
    new CompetitorDatabase(),
    competitionBusiness
)

const competitorController = new CompetitorController(
    competitorBusiness
)

const competitionController = new CompetitionController(
    competitionBusiness
)


app.post("/competitor", competitorController.creating)

app.post("/competition", competitionController.creating)

app.put("/competition/status", competitionController.closing)

app.get("/competitor/racking", competitorController.gettingRacking)



// Pra criar as tabelas é só descomentar as linhas abaixo e dar npm run start/dev!
// Migrations.creatingTables()
//     .finally(BaseDatabase.closeConnection)