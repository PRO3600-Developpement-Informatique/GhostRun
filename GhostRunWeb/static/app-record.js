function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", $("[name=csrfmiddlewaretoken]").val());
        }
    }
});

$(document).ready(function () {
    setStatus("", "Démarrage...");
    $("#stop_recording_and_go").on("click", stop_recording);
    initLocationProcedure();
});

function locError(error) {
    // the current position could not be located
    alert("The current position could not be found! " + error);
}

function watchGhostsPositions() {
    setTimeout(watchGhostsPositions, showGhostsPositions())
}

function setMarkerPosition(marker, position) {
    marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    console.log(position);
}

function watchCurrentPosition() {
    var positionTimer = navigator.geolocation.watchPosition(function (position) {
        /*if (!$("#recordSwitch").is(':checked')) {
            setStatus("", "Enregistrement mis en pause...");
            return
        }*/
        // setMarkerPosition(userLocation, position);
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        map.panTo(latLng);

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var altitude = position.coords.altitude;
        var accuracy = position.coords.accuracy;
        var date = new Date(position.timestamp);

        if (accuracy <= 15) {
            var path = current_location_poly.getPath();
            path.push(latLng);

            $.ajax("{% url 'localisation-list' %}", {
                method: "POST",
                data: {
                    "latitude": latitude,
                    "longitude": longitude,
                    "altitude": altitude,
                    "timestamp": date.toISOString(),
                    "trip": "{% url 'trip-detail' pk=trip.id %}"
                }
            })
            setStatus("positive", "Enregistrement en cours...");
        } else {
            setStatus("negative", "Précision insuffisante...");
        }
        $("#capa").html(`Latitude: ${latitude}\nLongitude: ${longitude}\nAltitude: ${altitude}\nAccuracy: ${accuracy}\nTimestamp: ${date}`);

    });
}

function displayAndWatch(position) {
    // set current position
    setUserLocation(position);
    // watch position
    watchCurrentPosition();
    watchGhostsPositions();
}

function setUserLocation(pos) {
    // marker for userLocation
    userLocation = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        title: "Position actuelle",
    });
    // scroll to userLocation
    map.panTo(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
}


function initLocationProcedure() {
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 17
    });

    current_location_poly = create_current_loc_poly();

    ghosts_icons = []
    for (ghost_data_id in ghosts_coords) {
        ghost_data = ghosts_coords[ghost_data_id];
        let initial_pos = new google.maps.LatLng(ghost_data['coords'][0]['lat'], ghost_data['coords'][0]['lng']);

        ghosts_icons.push(new google.maps.Marker({
            position: initial_pos,
            map: map,
            title: ghost_data['name'],
            icon: ghost_data['icon']
        }));
    }
    //current_location_poly.setMap(map);


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError, {
            enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: 0
        });
    } else {
        alert("Your phone does not support the Geolocation API");
    }
}

function showGhostsPositions() {

    var current_date = new Date();
    var delta = (current_date - start_date) / 1000;
    //console.log("Current time is", current_date);
    //console.log("Starting time is", start_date);
    console.log("Current delta is", delta);
    var ghost_id = 0;
    let call_next = 60;
    var previous_pos
    for (var ghost_data_id in ghosts_coords) {
        ghost_data = ghosts_coords[ghost_data_id];
        var coords = ghost_data['coords']
        previous_pos = coords[0];
        for (var pos_id in coords) {
            pos = coords[pos_id];
            if (pos['delta'] > delta) {
                console.log("Current call_next is", call_next)
                console.log("Next delta is ", pos['delta'] - delta)
                call_next = Math.min(call_next, pos['delta'] - delta);
                ghosts_icons[ghost_id].setPosition(new google.maps.LatLng(previous_pos['lat'], previous_pos['lng']));
                break;
            } else {
                previous_pos = pos;
            }
        }
        ghost_id++
    }
    call_next = (call_next + 3) * 1000
    console.log("Next delta in", call_next);
    return call_next
}

function create_current_loc_poly() {
    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };

    return new google.maps.Polyline({
        path: map_coords,
        icons: [{
            icon: lineSymbol,
            offset: '0%',
            repeat: '150px'
        }],
        strokeColor: '#0dc6be',
        strokeOpacity: 0.75,
        strokeWeight: 3,
        map: map
    });
}