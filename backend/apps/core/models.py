from django.db import models


class AbsoluteBaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Agent(AbsoluteBaseModel):
    LEVEL_CHOICES = [
        ("junior", "Junior"),
        ("senior", "Senior"),
    ]
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES)

    def assigned_ticket_count(self):
        return self.tickets.count()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Ticket(AbsoluteBaseModel):
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]
    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("closed", "Closed"),
        ("Unassigned", "Unassigned"),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")
    assigned_agent = models.ForeignKey(
        Agent, on_delete=models.SET_NULL, null=True, blank=True, related_name="tickets"
    )

    def __str__(self):
        return self.title
