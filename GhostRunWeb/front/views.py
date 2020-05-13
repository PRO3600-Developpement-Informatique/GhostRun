import datetime
import json

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from .models import Category

class SignUp(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'


def index(request):
    return render(request, "front/index.html", context={})


@login_required()
def profile_home(request):
    categories = Category.objects.filter(user=request.user).prefetch_related("trips").all()
    return render(request, "front/profile_home.html", context={"categories": categories})


@login_required()
def my_trips_view(request):
    return HttpResponse("Page à creer")


@login_required()
def my_settings_view(request):
    return HttpResponse("Page à creer")


@login_required()
def trip_detail_view(request, trip_id: int):
    return HttpResponse("Page à creer")
