from rest_framework import serializers
from .models import Ticket, Agent

class AgentCreateAndUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ["first_name", "email", "last_name", "gender", "level"]
    
class AgentSerializer(serializers.ModelSerializer):
    assigned_ticket_count = serializers.SerializerMethodField()
    class Meta:
        model = Agent
        fields = ["id", "first_name", "last_name", "gender", "email", "level","assigned_ticket_count"]
        
    def get_assigned_ticket_count(self, obj):
        return obj.assigned_ticket_count()


class TicketCreateAndUpdateSerializer(serializers.ModelSerializer):
    assigned_agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all(), required=False)
    class Meta:
        model = Ticket
        fields = [
            "title", 
            "description",
            "priority", 
            "description", 
            "assigned_agent", 
        ]
        extra_kwargs = {"assigned_agent": {"required": False}}
    


class TicketSerializer(serializers.ModelSerializer):
    assigned_agent = AgentSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = [
            "id", 
            "title", 
            "description", 
            "priority", 
            "status", 
            "assigned_agent"
        ]
