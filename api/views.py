from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from app.ai import ask_ai


@api_view(["POST"])
def chat(request):
    message = request.data.get("message")

    if not message:
        return Response(
            {"error": "Message is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        answer = ask_ai(message)

        return Response({
            "user": message,
            "ai": answer
        })

    except Exception as e:
        print("AI Error:", e)

        return Response(
            {
                "user": message,
                "ai": "Sorry, I am unable to answer right now."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )