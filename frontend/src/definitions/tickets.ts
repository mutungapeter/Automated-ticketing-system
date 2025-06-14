import { AgentType } from "./agents";


export interface TicketType {
	id: number;
	title: string;
	description: string;
	priority: string;
	status: string;
	assigned_agent: AgentType;
}