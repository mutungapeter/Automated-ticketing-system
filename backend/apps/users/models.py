from django.db import models
from django.contrib.auth.models import AbstractUser

from apps.core.models import AbsoluteBaseModel
import random
from django.utils import timezone
from datetime import timedelta
from django.conf import settings


GENDER_CHOICES = (
    ("Male", "Male"),
    ("Female", "Female"),
)







ROLE_CHOICES = [
    ("admin", "Admin"),
    ("agent", "Agent"),
    ("customer", "Customer"),
]

class User(AbstractUser, AbsoluteBaseModel):
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=255)
    def __str__(self):
        return self.username

    def name(self):
        return f"{self.first_name} {self.last_name}"
