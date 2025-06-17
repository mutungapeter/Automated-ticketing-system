from apps.core.models import Agent
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.db import transaction
from django.db.models import Count
from datetime import datetime

MAX_TICKET_COUNT = 5

def assign_ticket(ticket):
    with transaction.atomic():
        if ticket.priority == "high":
            agents = Agent.objects.filter(level="senior")
        else:
            agents = Agent.objects.all()

        agents = agents.annotate(ticket_count=Count('ticket')).filter(ticket_count__lt=MAX_TICKET_COUNT)
        agents = agents.order_by('ticket_count')

        if agents.exists():
            assigned_agent = agents.first()
            ticket.assigned_agent = assigned_agent
            ticket.save()

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

            return True
        else:
            return False
