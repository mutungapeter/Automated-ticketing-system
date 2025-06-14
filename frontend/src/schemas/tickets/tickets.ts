
import { z  } from "zod"
export const CreateTicketSchema = z.object({
  title: z.string().min(1, "Title requird").max(50, "Title  must be at most 50 characters"),
  description: z.string().min(1, "Description is required"),
  priority: z.string().min(1, "Priority is required"),
});

export type TicketTypeFormData = z.infer<typeof CreateTicketSchema>;