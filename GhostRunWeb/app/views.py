import datetime
import json

from django.contrib.auth.decorators import login_required
from django.db.models import Count
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.generic import CreateView

from .forms import AppInitForm
from front.models import Trip


class IndexView(CreateView):
    model = Trip
    form_class = AppInitForm
    template_name = "app/index.html"

    def get_form_kwargs(self):
        return {"user": self.request.user}

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        form.send_email()
        return super().form_valid(form)

@login_required()
def record(request, trip_pk):
    trip = get_object_or_404(Trip, user=request.user, pk=trip_pk)
    context = {"trip": trip, "ghosts_coords": []}

    ghosts = trip.\
        category.\
        trips.\
        exclude(pk=trip_pk).\
        annotate(loc_count=Count('localisations')).\
        filter(loc_count__gte=2).\
        prefetch_related("localisations").\
        all()

    for ghost in ghosts:
        ghost:Trip
        map_coords = []
        first = ghost.localisations.first()
        starting_time = first.timestamp  # ghost.started_at
        for loc in ghost.localisations.all():
            map_coords.append({"lat": loc.latitude, "lng": loc.longitude, "delta": (loc.timestamp - starting_time).seconds})
        context['ghosts_coords'].append({"coords": map_coords, "name": ghost.name})
    context['ghosts_coords'] = json.dumps(context['ghosts_coords'])

    map_coords = []
    for loc in trip.localisations.all():
        map_coords.append({"lat": loc.latitude, "lng": loc.longitude})

    context['map_coords'] = json.dumps(map_coords)

    return render(request, "app/record.html", context=context)