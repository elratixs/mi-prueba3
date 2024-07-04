from django.urls import path
from .views import *
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', inicio, name="inicio"),
    path('nosotros', nosotros, name="nosotros"),
    path('contacto', contacto, name="contacto"),
    path('carrito', carrito, name="carrito"),
    path('hombre', hombre, name="hombre"),
    path('registro', registro, name="registro"),
    path('login', LoginView.as_view(template_name='core/login.html'), name="login"),
    path('logout', logout, name="logout"),
    path('vestuario', vestuario, name="vestuario"),
    path('addtocar/<codigo>', addtocar, name="addtocar"),
    path('limpiar', limpiar),
    path('carro', carro, name="carro"),
    path('dropitem/<codigo>', dropitem, name="dropitem"),
    path('comprar', comprar, name="comprar"),    
]