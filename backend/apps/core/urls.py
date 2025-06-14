from django.urls import path
from .views import AgentListView, TicketCreateView, TicketDetailView, AgentCreateView, TicketListView

urlpatterns = [
    path('agents/create/', AgentCreateView.as_view(), name='agent-create'),
    path('agents/list/', AgentListView.as_view(), name='agent-list'),
    path('tickets/create/', TicketCreateView.as_view(), name='ticket-list-create'),
    path('tickets/list/', TicketListView.as_view(), name='ticket-list'),
    path('tickets/<int:pk>/', TicketDetailView.as_view(), name='ticket-detail'),
]
