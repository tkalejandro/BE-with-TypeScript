import logger from 'pino'
import dayjs from 'dayjs'

//OLD PINO
// const log = logger({
//     prettyPrint: true,
//        base: {
//            pid: false,
//        },
//        timestamp: () => `"time":"${dayjs().format()}"`

// })

//NEW PINO
const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
})

export default log