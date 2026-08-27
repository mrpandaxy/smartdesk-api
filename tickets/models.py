from django.db import models

class Ticket(models.Model):
    CATEGORY_CHOICES = [
        ('BUG', 'Bug ou Falha'),
        ('DUVIDA', 'Dúvida'),
        ('HARDWARE', 'Problema de Hardware'),
        ('OUTROS', 'Outros')
    ]
    
    STATUS_CHOICES = [
        ('ABERTO', 'Aberto'),
        ('EM_ANDAMENTO', 'Em Andamento'),
        ('RESOLVIDO', 'Resolvido')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OUTROS')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ABERTO')
    
    ai_summary = models.TextField(blank=True, null=True) 
    
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.title}"