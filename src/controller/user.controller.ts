import { Request, Response } from 'express'
import { CreateUserInput } from '../schema/user.schema'
import { createUser } from '../service/user.service'
import { omit } from 'lodash'
import log from '../utils/logger'

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) => {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), 'password'))
    }
    catch (e: any) {
        log.error(e)
        return res.status(409).send(e.message)
    }
}