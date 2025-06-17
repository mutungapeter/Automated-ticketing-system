from django.shortcuts import render


from apps.users.models import  User

from .serializers import (
    CreateAdminAccountSerializer,
    CustomTokenObtainPairSerializer
)
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import generics, status
from django.utils import timezone
from rest_framework.permissions import AllowAny,  IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


class UserLoginAPIView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

class RegisterAdminAccountAPIView(generics.CreateAPIView):
    serializer_class = CreateAdminAccountSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        username = request.data.get("username")
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "User with the Username already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is missing"}, status=400)

            try:
                token = RefreshToken(refresh_token)
                token.blacklist()

                return Response({"message": "Logout successful"}, status=200)
            except TokenError as te:
                return Response({"error": f"Token Error: {str(te)}"}, status=400)

        except Exception as e:
            print("Unexpected error:", str(e))
            return Response({"error": f"Unexpected error: {str(e)}"}, status=400)



