import knex, {Knex} from "knex";
import dotenv from "dotenv";


dotenv.config();



export abstract class  BaseDatabase { 
    protected static connection: Knex = knex({
        client : "mysql", 
        connection :{ 
            host:process.env.DB_HOST ,
            user:process.env.DB_USER ,
            port:3306,
            password:process.env.DB_PASS,
            database :process.env.DB_NAME,
            multipleStatements: true,
        } 
       })

    static closeConnection =()=> this.connection.destroy()

    
}
