from .services import assign_ticket
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Ticket, Agent
from .serializers import AgentCreateAndUpdateSerializer, TicketCreateAndUpdateSerializer, TicketSerializer, AgentSerializer


class AgentCreateView(generics.CreateAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentCreateAndUpdateSerializer
    
    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        if Agent.objects.filter(email=email).exists():
            return Response(
                {"error": "User with the email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AgentListView(generics.ListAPIView):
    queryset = Agent.objects.all().order_by('-created_at')
    serializer_class = AgentSerializer
    

class TicketCreateView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketCreateAndUpdateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ticket = serializer.save()

        assigned = assign_ticket(ticket)
        if not assigned:
            return Response(
                {"error": "No available agents for assignment."},
                status=status.HTTP_409_CONFLICT
            )

        return Response(
            self.get_serializer(ticket).data,
            status=status.HTTP_201_CREATED
        )
class TicketListView(generics.ListAPIView):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer


class TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
