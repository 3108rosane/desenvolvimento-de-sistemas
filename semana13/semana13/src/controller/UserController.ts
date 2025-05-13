import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { request } from "https";
import { CreateUserType } from "../types/CreateUser";

// crontrolle recebe informação e passa informação

export async function userController(app: FastifyInstance) {
    // pode ser usado reponse ou reply
    app.post("/user/register", async(request: FastifyRequest, replay:FastifyReply) => {
        // PEGAR INFROMAÇÃO DE FRON OU DE QUEM CHAMA O ENDPOINT(TEXT)
        const body = request.body as CreateUserType;
        try {
            // pega informação do service
            await userService.register(body);
            // retorna a resposta
            return replay.code(201).send();
            // retorna o vetor
            // return response.code(200).send(newTask);
        } catch (error: any) {
            return replay.code(409).send({ error: error.message })
        }
    })

    app.post("/user/login", async(request: FastifyRequest, replay:FastifyReply) => {
       
        const body = request.body as LoginType;
        try {
            
            const token = await userService.login(body);
           
            return replay.code(201).send({acess_token: token});
           
        } catch (error: any) {
            return replay.code(409).send({ error: error.message })
        }
    })
}