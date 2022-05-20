import { BaseDatabase } from "./BaseDatabase";


export class Migrations extends BaseDatabase {
    static creatingTables = () => BaseDatabase.connection
        .raw(
            `
            CREATE TABLE IF NOT EXISTS case_1_competition (
                id VARCHAR(100) PRIMARY KEY,
                competition_Name VARCHAR(255) UNIQUE NOT NULL,
                status ENUM('open', 'close' ) NOT NULL,
                unit ENUM('s', 'm' ) NOT NULL
            );


            CREATE TABLE IF NOT EXISTS case_1_competitors (
                id VARCHAR(100) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                value FLOAT NOT NULL,
                times int DEFAULT 0, 
                competition VARCHAR(255) NOT NULL,
                FOREIGN KEY (competition) REFERENCES case_1_competition(competition_Name)
            );

            `
        )
        .then(() => console.log("Tables created!"))
        .catch((error: any) => console.log(error.message || error.sqlMessage))

    static closeConnection = () => this.connection.destroy();
};

