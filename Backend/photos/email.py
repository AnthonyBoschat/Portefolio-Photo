from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings


class sendEmailView(APIView):
    
    def post(self, request, *args, **kwargs):

        user_first_name = request.data.get("firstname")
        user_last_name = request.data.get("lastname")
        user_email = request.data.get("email")
        subject = request.data.get("subject")
        message = request.data.get("message")

        if not subject or not user_email or not message or not user_first_name or not user_last_name:
            return Response({"message":"Données manquantes"}, status=status.HTTP_400_BAD_REQUEST)
        
        send_mail(
            subject,
            message,
            user_email,
            [settings.ADMIN_EMAIL]
        )
        return Response({"success":True}, status=status.HTTP_200_OK)