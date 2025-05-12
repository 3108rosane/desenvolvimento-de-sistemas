import { error } from "console";
import { Task } from "../entity/task";
import {Task as TaskPrisma } from "@prisma/client"
import { promises } from "dns";
import { prisma } from "../prisma/client";
class TaskService {
    // FAKE BANCO DE DADOS
    private tasklist: Task[] = [];

    public async create(text: string):Promise<void> {
        
        const task: TaskPrisma = {
            id: crypto.randomUUID(),
            text:text,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),

        }
        await prisma.task.create({data:task});
       
    }
    public async getAll(): Promise<TaskPrisma[]> {

        return await prisma.task.findMany();
    }
   
    public async updateCompleted(id: string):Promise<TaskPrisma> {
        

        const task = await prisma.task.findUnique({where:{id}})
        if (task == null) {
            throw new Error("Tarefa não foi encontrada")
        }
        const taskUpdate = {
            completed: !task.completed,
            updatedAt: new Date()
        }

        return await prisma.task.update({
            where:{id},
            data:  taskUpdate
   
        })

    }
   
    public async deleteTask(id: string){
        return await prisma.task.delete({where:{id: id }})
    }
}
//  serve pra expota a class por inteiro 
export const taskService = new TaskService();