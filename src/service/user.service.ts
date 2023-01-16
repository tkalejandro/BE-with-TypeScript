import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export const createUser = async (input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
    try {
        return await UserModel.create(input)
    }
    catch (e: any) {
        throw new Error(e)
    }
}

export const validatePassword = async ({email, password} : {email: string, password: string}) => {
    const user = await UserModel.findOne({email})

    if(!user){
        return false;
    }

    const isValid = await user.comparePassword(password)

    if(!isValid) return false

    return omit(user.toJSON(), 'password')
}