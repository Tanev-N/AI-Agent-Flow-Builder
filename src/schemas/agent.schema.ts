import { z } from "zod";

export const AgentSchema = z.object(
    {
        id: z.string(),
        name: z.string().min(1, "Нужно имя !:)").max(50, 'Слишком длинное имя :('),
        tokenBudget: z.number().min(0, 'Бюджет не может быть отрицательным'),
        isActive: z.boolean().default(true),
        createdAt: z.string().datetime(),
    }
)

export type Agent = z.infer< typeof AgentSchema >;

export const CreateAgentSchema = AgentSchema.omit({ 
  id: true, 
  createdAt: true 
});

export type CreateAgent = z.infer<typeof CreateAgentSchema>;

export const UpdateAgentSchema = AgentSchema.omit({ 
  id: true, 
  createdAt: true 
}).partial();

export type UpdateAgent = z.infer<typeof UpdateAgentSchema>;