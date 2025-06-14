from django.urls import path, include
from .schema import schema_view


urlpatterns = [
    # api documentation urls
    path("core/", include("apps.core.urls")),
    path("auth/", include("apps.users.urls")),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
