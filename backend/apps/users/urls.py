from django.urls import path

from .views import (   
    RegisterAdminAccountAPIView,
    UserLoginAPIView,
    UserLogoutAPIView
)

urlpatterns = [
    path("create-account/", RegisterAdminAccountAPIView.as_view(), name="create-admin-account"),
    path("login/", UserLoginAPIView.as_view(), name="login"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout")
]
