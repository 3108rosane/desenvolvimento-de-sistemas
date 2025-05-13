import fastify from "fastify";
import { taskController } from "./controller/teskController";
import cors from"@fastify/cors";
import { userController } from "./controller/UserController";

const app = fastify()

app.register(cors, {
    origin:["http://localhost:3000"],
    methods:["GET","POST", "PATCH","DELETE"]
});

// registo que mostra onde estão as rotas de app
app.register(taskController)
app.register(userController)

// funçao de ouvir chamadas
const PORT = 3333
app.listen({ port: PORT }).then(() => { console.log(`Backend rodando na porta ${PORT}!`) })
