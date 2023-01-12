//Database connection

import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

const connect = async () => {
    const dbUri = config.get<string>('dbUri')

    //if lower than mongoose v6
    // return mongoose.connect(dbUri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })

    //Old way
    // return mongoose.connect(dbUri)
    // .then(() => {
    //     console.log('Connected to DB')
    // })
    // .catch((error) => {
    //     console.error('Could not connect to DB')
    //     process.exit(1)
    // })

    try {
        await mongoose.connect(dbUri)
        logger.info("DB Connected")
    }
    catch (error) {
        logger.error('Could not connect to DB')
        process.exit(1)
    }
}

export default connect