from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.views import logout_then_login
from .forms import *
import requests

def comprar(request):
    if not request.user.is_authenticated:
        return redirect(to="login")
    carro = request.session.get("carro", [])
    total = 0
    for item in carro:
        total += item [5]
    venta = Venta()
    venta.cliente = request.user
    venta.total = total
    venta.save()
    for item in carro:
        detalle = DetalleVenta()
        detalle.producto = Producto.objects.get(codigo = item[0])
        detalle.precio = item[3]
        detalle.cantidad = item[4]
        detalle.venta = venta
        detalle.save()
        request.session["carro"] = []    
    return redirect(to="carro")

# Create your views here.

def inicio(request):
    return render(request, 'core/inicio.html')

def nosotros(request):
    return render(request, 'core/nosotros.html')

def contacto(request):
    return render(request, 'core/contacto.html')

def carrito(request):
    return render(request, 'core/carrito.html')

def hombre(request):
    mostrar = Producto.objects.all()
    return render(request, 'core/hombre.html', {'mostrar':mostrar})

def login(request):
    return render(request, 'core/login.html')

def logout(request):
    return logout_then_login(request, login_url="login")

def registro(request):
    if request.method == "POST":
        registro = Registro(request.POST)
        if registro.is_valid():
            registro.save()
            return redirect(to="login")
    else:
        registro = Registro()
    return render(request, 'core/registro.html', {'form':registro})

def vestuario(request):
    plantas = Producto.objects.all()
    dolar = requests.get("https://mindicador.cl/api").json()
    for planta in plantas:
        planta.dolar = planta.precio / dolar["dolar"]["valor"]
    return render(request, 'core/vestuario.html', {'plantas':plantas, "carro":request.session.get("carro", [])})

def addtocar(request, codigo):
    producto = Producto.objects.get(codigo=codigo)
    carro = request.session.get("carro", [])
    for item in carro:
        if item [0] == codigo:
            item[4] += 1
            item[5] = item[3] * item[4]
            break
    else:
        carro.append([codigo, producto.detalle, producto.imagen, producto.precio, 1, producto.precio])
    request.session["carro"] = carro
    return redirect(to="vestuario")

def limpiar(request):
    request.session.flush()
    return redirect(to="vestuario")

def carro(request):
    return render(request, 'core/carro.html', {"carro":request.session.get("carro", [])})

def dropitem(request, codigo):
    carro = request.session.get("carro", [])
    for item in carro:
        if item [0] == codigo:
            if item [4] > 1:
                item[4] -= 1
                item[5] = item[3] * item[4]
                break
            else:
                carro.remove(item)
    request.session["carro"] = carro
    return redirect(to="carro")
