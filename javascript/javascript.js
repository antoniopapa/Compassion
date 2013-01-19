$(document).ready(function () {

    var minZoomLevel = 2;
    var maxZoomLevel = 10;
    var centerPoint = new Microsoft.Maps.Location(40.178873, -96.767578);
    var container;
    var map;
    var fPoints = new Array();
    var endPoints = new Array();
    var position;
    var donating = false;
    var pLine;
    var heart;
    var path;
    var points = [];
    var people = [];
    var pinInfoBox;
    var pointId = [];
    var credentials = "AkBI3eBjLpCZE74qrT44B-tAET626SDzR2q6aE19mkGNpg_7EQF6oDsNRrkA5qVN";
    var pathId = 0;
    var donePath = false;

    container = document.getElementById('mapDiv');
    var myOptions = {
        credentials: credentials,
        center: new Microsoft.Maps.Location(0, 0),
        mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
        zoom: minZoomLevel,
        showCopyright: false,
        showDashboard: true,
        showMapTypeSelector: false,
        showScalebar: false,
        fixedMapPosition: true
    }
    map = new Microsoft.Maps.Map(container, myOptions);

    pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
    map.entities.push(pinInfobox);

    Microsoft.Maps.Events.addHandler(map, "mousemove", function (e) {
        var mapElem = map.getRootElement();
        if (e.targetType === "map") {
            mapElem.style.cursor = "hand";
        } else {
            mapElem.style.cursor = "pointer";
        }
    });

    /*google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
    if (map.getZoom() > maxZoomLevel) map.setZoom(maxZoomLevel);
    });*/
    navigator.geolocation.getCurrentPosition(success, error);

    window.setInterval(function () { checkDonations(); }, 5000);
    window.setInterval(function () { getAllPeople(); }, 5000);

    function getAllPeople() {
        PageMethods.getAllPersonsAsXml(function (response) {
            if (response != '<NewDataSet />') {
                var xml = StringtoXML(response);
                var id = getData(xml, 'id');
                if (pointId.length != id.length) {
                    for (var i = 0; i < id.length; i++) {
                        if ($.inArray(id[i], pointId) == -1) {
                            pointId.push(id[i]);
                            var lat = getOneElement(xml, 'latitude', i);
                            var long = getOneElement(xml, 'longitude', i);
                            var desc = getOneElement(xml, 'description', i);
                            var city = getOneElement(xml, 'city', i);
                            var country = getOneElement(xml, 'state', i);
                            var name = getOneElement(xml, 'name', i);
                            var surname = getOneElement(xml, 'surname', i);
                            var age = getOneElement(xml, 'age', i);
                            var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long));
                            pin.Title = '<div class="title">' + name + ' ' + surname + '</div>';
                            pin.Description = '<div><div class="info"><img src="images/Very-Funny-Animal-Faces-13.jpg" class="info-image">' +
                                                '<ul class="information">' +
                                                '<li><b>Name</b>: ' + name + ' ' + surname + '</li>' +
                                                '<li><b>Age</b>: ' + age + '</li>' +
                                                '<li><b>City</b>: ' + city + '</li>' +
                                                '<li><b>Country</b>: ' + country + '</li></ul></div>' +
                                                '<div class="desc">' + desc + '</div>' +
                                                '</div>';
                            addListener(pin);
                            people.push(pin);
                        }
                    }
                }
            }
        },
        function () {
          //  alert('error occured');
        });
    }

    function putPeople() {
        for (var i = 0; i < people.length; i++) {
            map.entities.push(people[i]);
        }
    }

    function emptyPeople() {
        for (var i = 0; i < people.length; i++) {
            map.entities.remove(people[i]);
        }
    }

    function displayInfobox(e) {
        var targetLoc = e.target.getLocation();
        pinInfobox.setOptions(
        {
            width: 500,
            height: 250,
            title:
            e.target.Title,
            description: e.target.Description,
            visible: true,
            offset: new Microsoft.Maps.Point(0, 25),
            actions: [
                { label: 'photos', id: 'photos', eventHandler: photos },
                { label: 'videos', id: 'videos', eventHandler: videos },
                { label: 'donate', id: 'donate', eventHandler: function () {
                    if (position && targetLoc) {
                        PageMethods.insertPath(position.latitude, position.longitude, targetLoc.latitude, targetLoc.longitude);
                    }
                }
                }
            ]
        });
        pinInfobox.setLocation(targetLoc);
        map.setView({ center: pinInfobox.getLocation() });
    }

    function photos() {
        alert('photos');
    }

    function videos() {
        alert('videos');
    }

    function hideInfobox(e) {
        pinInfobox.setOptions({ visible: false });
    }

    function addListener(pin) {
        map.entities.push(pin);
        Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
            displayInfobox(e);
        });
    }

    function checkDonations() {
        PageMethods.getPathAsXml(function (response) {
            if (response != '<NewDataSet />') {
                var resultXML = StringtoXML(response);
                var id = getOneElement(resultXML, 'id', 0);
                if (id != pathId) {
                    pathId = id;
                    var slat = getData(resultXML, 'start_lat');
                    var slong = getData(resultXML, 'start_long');
                    var elat = getData(resultXML, 'end_lat');
                    var elong = getData(resultXML, 'end_long');
                    for (var i = 0; i < slat.length; i++) {
                        endPoints.push({ start: new Microsoft.Maps.Location(slat[i], slong[i]), end: new Microsoft.Maps.Location(elat[i], elong[i]) });
                    }
                }
            }
        }, function () {
          //  alert('error creating path');
        });
        if (endPoints.length != 0 && !donating) {
            nextRoute();
        }
    }

    function success(pos) {
        position = pos.coords;
    }

    function error() {
      //  alert('Coul not get your location!');
    }

    function nextRoute() {
        if (endPoints.length) {
            donating = true;
            fPoints = [];
            var p = endPoints.shift();
            heart = new Microsoft.Maps.Pushpin(p.start, {
                icon: 'images/flying-heart-icon.png',
                width: 150,
                height: 150
            });
            map.entities.push(heart);
            plotRoute(p.start, p.end);
        }
        else {
            donating = false;
        }
    }

    function plotRoute(p1, p2) {
        with (Math) {
            var lat1 = p1.latitude * (PI / 180);
            var lon1 = p1.longitude * (PI / 180);
            var lat2 = p2.latitude * (PI / 180);
            var lon2 = p2.longitude * (PI / 180);

            var d = 2 * asin(sqrt(pow((sin((lat1 - lat2) / 2)), 2) + cos(lat1) * cos(lat2) * pow((sin((lon1 - lon2) / 2)), 2)));
            var f = (1 / 50) * fPoints.length;
            f = f.toFixed(6);
            var A = sin((1 - f) * d) / sin(d)
            var B = sin(f * d) / sin(d)
            var x = A * cos(lat1) * cos(lon1) + B * cos(lat2) * cos(lon2)
            var y = A * cos(lat1) * sin(lon1) + B * cos(lat2) * sin(lon2)
            var z = A * sin(lat1) + B * sin(lat2)

            var latN = atan2(z, sqrt(pow(x, 2) + pow(y, 2)))
            var lonN = atan2(y, x)
            var p = new Microsoft.Maps.Location(latN / (PI / 180), lonN / (PI / 180));
            heart.setLocation(p);
            fPoints.push(p);

            if (fPoints.length < 50) {
                window.setTimeout(function () { plotRoute(p1, p2); }, 50);
            }
            else {
                fPoints.push(p2);
                heart.setLocation(p2);
                map.entities.remove(heart);
                nextRoute();
            }
        }

    }

    function getData(xml, name) {
        var ret = [];
        var x = xml.getElementsByTagName(name);
        for (var i = 0; i < x.length; i++) {
            ret.push(x[i].childNodes[0].nodeValue);
        }
        return ret;
    }

    function getIndexId(xml, id) {
        var x = xml.getElementsByTagName(name);
        for (var i = 0; i < x.length; i++) {
            if (x[i] == id) {
                return i;
            }
        }
    }

    function getOneElement(xml, name, index) {
        var x = xml.getElementsByTagName(name);
        return x[index].childNodes[0].nodeValue;
    }

    function StringtoXML(text) {
        if (window.ActiveXObject) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(text);
        } else {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, 'text/xml');
        }
        return doc;
    }

});