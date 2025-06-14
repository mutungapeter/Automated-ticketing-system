from apps.core.models import Agent
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from datetime import datetime

MAX_TICKET_COUNT = 5


def assign_ticket(ticket):
    if ticket.priority == "high":
        agents = Agent.objects.filter(level="senior")
    else:
        agents = Agent.objects.all()

    agents = [a for a in agents if a.assigned_ticket_count() < MAX_TICKET_COUNT]
    agents = sorted(agents, key=lambda a: a.assigned_ticket_count())

    if agents:
        assigned_agent = agents[0]
        ticket.assigned_agent = assigned_agent
        ticket.save()

        print(f"Ticket '{ticket.title}' assigned to {assigned_agent.first_name}")
        full_name = f"{assigned_agent.first_name} {assigned_agent.last_name}"
        if assigned_agent.email:
            context = {
                "agent_name": full_name,
                "ticket_title": ticket.title,
                "ticket_priority": ticket.priority,
                "ticket_description": ticket.description,
                'current_year': datetime.now().year,
            }

            message = render_to_string("tickets/ticket_assignment_email.html", context)

            send_mail(
                subject="New Ticket Assigned",
                message="", 
                html_message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[assigned_agent.email],
                fail_silently=False,
            )
    else:
        print("No available agents for assignment.")

