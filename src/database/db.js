import { connect } from "mongoose";


const passwordDB = process.env.DB_URI_PASSWORD

export const connectDB = async () =>{

    try {
        await connect(`mongodb+srv://user:${passwordDB}@cluster0.mpi76g7.mongodb.net/VUE?retryWrites=true&w=majority`)
        console.log("base de datos conectada")
    } catch (error) {
        console.log(error)
        console.log("hubo un error en la base de datos")
    }

}