
import {User } from "@prisma/client";
import { prisma } from "../prisma/client";
import { hash } from "bcryptjs";
class UserService {
    // FAKE BANCO DE DADOS
    private tasklist: Task[] = [];

    public async register({name, email, password, birthDate,} : CreateUserType):Promise<void> {
        const userExist = await prisma.user.findUnique({
            where: {email: email}
        })
        if(userExist){
            throw new Error("Email ja cadastrado!")
        }

        const passwordHashed = await hash(password,10)
        
        const user : user = {
            id:      crypto.randomUUID(),
            name:       name,
            password:   password,
            birthDate:  new Date(birthDate),
            createdAt:  new Date(),
            updatedAt:  new Date(),

        }
        await prisma.user.create({data:user})
       
    }

    public async login({email,password}: LoginType):Promise< string | null> {
        const user = await prisma.user.findUnique({where: {email: email}})
        if(!user){
            throw new Error("credenciais Invalidas.")
        }
        const passwordInvalid = await compare(password,user.password)
        if(!passwordInvalid){
            throw new Error("credenciais invalidas")

        }
    }
}
export const userService = new UserService();