import os
from dotenv import load_dotenv
from rest_framework import viewsets
from .models import Ticket
from .serializers import TicketSerializer
import google.generativeai as genai

load_dotenv()   

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def perform_create(self, serializer):
        
        descricao = serializer.validated_data.get('description', '')
        
        try:
           
            prompt = f"Atue como um analista de suporte de TI. Faça um resumo técnico, em apenas uma frase curta, sobre este problema: {descricao}"
            resposta = model.generate_content(prompt)
            resumo_gerado = resposta.text.strip()
        except Exception as e:
            print(f"Erro ao conectar com a IA: {e}")
            resumo_gerado = "Não foi possível gerar o resumo automático."
            
        serializer.save(ai_summary=resumo_gerado)