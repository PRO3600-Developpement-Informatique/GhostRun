from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def index(request):
    return render(request, "front/index.html", context={})


def login_view(request):
    return render(request, "front/login.html", context={})


def logout_view(request):
    return HttpResponse("Page à creer")


def register_view(request):
    return HttpResponse("Page à creer")


@login_required()
def my_trips_view(request):
    return HttpResponse("Page à creer")


@login_required()
def my_settings_view(request):
    return HttpResponse("Page à creer")


@login_required()
def trip_detail_view(request, trip_id: int):
    return HttpResponse("Page à creer")
