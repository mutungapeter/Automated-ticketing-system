from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
import os


is_production = os.getenv("DEBUG", "True") == "False"


schema_url = "" if is_production else None

schema_view = get_schema_view(
    openapi.Info(
        title="Automated Ticketing System",
        default_version="v1",
        description="Automated Ticketing System API",
        terms_of_service="",
        contact=openapi.Contact(email=""),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    url=schema_url,
    permission_classes=[permissions.AllowAny],
)
