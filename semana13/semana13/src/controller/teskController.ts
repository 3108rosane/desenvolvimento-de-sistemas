import { FastifyInstance } from "fastify";
import { taskService } from "../services/taskService";
import { request } from "https";

// crontrolle recebe informação e passa informação

export async function taskController(app: FastifyInstance) {
    // pode ser usado reponse ou reply
    app.post("/task", async(request, response) => {
        // PEGAR INFROMAÇÃO DE FRON OU DE QUEM CHAMA O ENDPOINT(TEXT)
        const body = request.body as { text: string }
        try {
            // pega informação do service
            await taskService.create(body.text);
            // retorna a resposta
            return response.code(201).send();
            // retorna o vetor
            // return response.code(200).send(newTask);
        } catch (error: any) {
            return response.code(409).send({ error: error.message })
        }
    })
    app.get("/task",async (_, response) => {
        const list = await taskService.getAll();
        // RETORNA A RESPOSTA PARA QUEM CHAMOU 
        return response.code(200).send(list)
    })

   
    app.patch("/task/:id/completed", (request, response) => {
        // CAPTURA INFORMAÇÃO
        const { id } = request.params as { id: string }
        
        // REPASSA INFORMAÇÃO E RECEBE INFORMAÇÃO PROCESSADA
        const task = taskService.updateCompleted(id);
        // RETORNA A RESPOSTA PARA QUEM CHAMOU 
        return response.send(task)
    })
   

    app.delete('/task:id',async(request,reply,)=> {
        const {id} = request.params as {id: string};
        await taskService.deleteTask(id);
        return reply.code(200).send();
    })

}