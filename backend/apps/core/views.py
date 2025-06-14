from .services import assign_ticket
from rest_framework import generics
from .models import Ticket, Agent
from .serializers import AgentCreateAndUpdateSerializer, TicketCreateAndUpdateSerializer, TicketSerializer, AgentSerializer


class AgentCreateView(generics.CreateAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentCreateAndUpdateSerializer

class AgentListView(generics.ListAPIView):
    queryset = Agent.objects.all().order_by('-created_at')
    serializer_class = AgentSerializer
    

class TicketCreateView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketCreateAndUpdateSerializer

    def perform_create(self, serializer):
        ticket = serializer.save()
        assign_ticket(ticket)
class TicketListView(generics.ListAPIView):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer


class TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
