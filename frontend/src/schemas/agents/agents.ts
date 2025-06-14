
import { z  } from "zod"
export const CreateAgentSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50, "First Name must be at most 50 characters"),
  last_name: z.string().min(1, "Last name is required").max(50, "Last Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  level: z.string().min(1, "Level is required"),
});

export type AgentTypeFormData = z.infer<typeof CreateAgentSchema>;