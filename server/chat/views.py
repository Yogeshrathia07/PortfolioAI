from rest_framework.decorators import api_view
from rest_framework.response import Response
from .rag.engine import build_db, search_context, ask_ai

db_ready = False   # prevents rebuilding every reload

@api_view(['POST'])
def chat(request):
    global db_ready

    if not db_ready:
        build_db()
        db_ready = True

    message = request.data.get("message")

    context = search_context(message)
    answer = ask_ai(message, context)

    return Response({"response": answer})