import { MenuGroup } from "@/definitions/menu";
import { LuTickets, LuUsers } from "react-icons/lu";
export const menuItems: MenuGroup[] = [
  {
    title: "Tickets",
    items: [
      {
        icon: <LuTickets />,
        label: "Tickets",
        href: "/dashboard/tickets",
      },
    ],
  },
  {
    title: "Agents",
    items: [
      {
        icon: <LuUsers />,
        label: "Agents",
        href: "/dashboard/agents",
      },
    ],
  },
 
];
