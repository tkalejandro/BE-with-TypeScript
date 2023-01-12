import { Request, Response } from 'express'
import config from 'config'
import { createSession } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { signJwt } from '../utils/jwt.utils'

export const crateUserSessionHandler = async (
    req: Request,
    res: Response
) => {
    //Validate the users password
    const user = await validatePassword(req.body)

    if(!user) {
          return res.status(401).send("Invalid email or password")
    }
    // create a s ession
    const session = await createSession(user._id, req.get('user-agent') || "")

    // create an access token
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('accessTokenTtl')} //15min
    )
    //create a refresh token
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('accessTokenTtl')} //15min
    )
    //return access & refresh tokens

    return res.send({accessToken, refreshToken})
}