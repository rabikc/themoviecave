from django.shortcuts import render
# from authentication import CsrfExemptSessionAuthentication

def index(request):
    return render(request, 'index.html')