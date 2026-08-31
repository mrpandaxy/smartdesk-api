import os
from dotenv import load_dotenv
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Ticket
from .serializers import TicketSerializer
from google import genai

load_dotenv() 

client = genai.Client()

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    # Substituímos o perform_create pelo create para ter controle total do HTTP
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # 1. Tratamento de erro do cliente (HTTP 400 - Bad Request)
        if not serializer.is_valid():
            return Response(
                {"erro": "Dados inválidos ou incompletos enviados no chamado.", "detalhes": serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        descricao = serializer.validated_data.get('description', '')
        
        # 2. Tentativa de conexão com a IA
        try:
            prompt = f"Atue como um analista de suporte de TI. Faça um resumo técnico, em apenas uma frase curta, sobre este problema: {descricao}"
            
            # Atualizado para o modelo mais moderno do Google
            resposta = client.models.generate_content(
                model='gemini-3.6-flash', 
                contents=prompt
            )
            resumo_gerado = resposta.text.strip()
        except Exception as e:
            print(f"Erro ao conectar com a IA: {e}")
            resumo_gerado = "Não foi possível gerar o resumo automático."
            
        # 3. Tentativa de salvar no Banco de Dados
        try:
            serializer.save(ai_summary=resumo_gerado)
            
            # Sucesso (HTTP 201 - Created)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print(f"Erro no banco de dados: {e}")
            # Erro crítico do servidor (HTTP 500 - Internal Server Error)
            return Response(
                {"erro": "Falha interna no servidor ao tentar salvar o chamado."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )