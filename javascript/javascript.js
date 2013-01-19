$(document).ready(function () {

    var credentials = "AkBI3eBjLpCZE74qrT44B-tAET626SDzR2q6aE19mkGNpg_7EQF6oDsNRrkA5qVN";
    var minZoomLevel = 2;
    var maxZoomLevel = 10;
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
    var pointId = [];
    var pathId = 0;
    var donePath = false;
    var causeDetails = [];

    container = document.getElementById('mapDiv');
    var myOptions = {
        credentials: credentials,
        center: new Microsoft.Maps.Location(41.0092, 20.0194),
        mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
        zoom: 2,
        showCopyright: false,
        showDashboard: true,
        showMapTypeSelector: false,
        showScalebar: false,
        fixedMapPosition: true
    }
    map = new Microsoft.Maps.Map(container, myOptions);

    Microsoft.Maps.Events.addHandler(map, "mousemove", function (e) {
        var mapElem = map.getRootElement();
        if (e.targetType === "map") {
            mapElem.style.cursor = "hand";
        } else {
            mapElem.style.cursor = "pointer";
        }
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
        position = pos.coords;
    });

    window.setInterval(function () { checkDonations(); }, 1000);
    window.setInterval(function () { getAllPeople(); }, 1000);

    function getAllPeople() {
        try {
            PageMethods.getCauses(function (response) {
                if (response != '<NewDataSet />') {
                    var xml = StringtoXML(response);
                    var id = getData(xml, 'id');
                    if (causeDetails.length != id.length) {
                        for (var i = 0; i < id.length; i++) {
                            if ($.inArray(id[i], causeDetails) == -1) {
                                causeDetails[id[i]] = [];
                                causeDetails[id[i]]["latitude"] = getOneElement(xml, 'latitude', i);
                                causeDetails[id[i]]["longitude"] = getOneElement(xml, 'longitude', i);
                                causeDetails[id[i]]["description"] = getOneElement(xml, 'description', i);
                                causeDetails[id[i]]["title"] = getOneElement(xml, 'title', i);
                                causeDetails[id[i]]["name"] = getOneElement(xml, 'name', i);
                                var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(causeDetails[id[i]]["latitude"], causeDetails[id[i]]["longitude"]));
                                map.entities.push(pin);
                                addListener(pin, id[i]);
                            }
                        }
                    }
                }
            });
        } catch (e) {
            alert(e);
        }
    }

    function addListener(pin, id) {
        Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {

            try {
                PageMethods.getImages(id, function (imagePath) {
                    causeDetails[id]["image_path"] = imagePath;
                });
            } catch (e) {
                alert(e);
            }

            var location = new Microsoft.Maps.Location(causeDetails[id]["latitude"], causeDetails[id]["longitude"]);

            setTimeout(function () {
                var infoboxOptions =
                {
                    width: 400,
                    height: 200,
                    description: '<div>' +
                                    '<div class="info">' +
                                        '<img src="' + causeDetails[id]["image_path"] + '" class="info-image" alt="">' +
                                    '</div>' +
                                    '<div class="desc">' +
                                        '<h3>' + causeDetails[id]["title"] + ' by ' + causeDetails[id]["name"] + '</h3>' +
                                            causeDetails[id]["description"] +
                                            '<a href="profile.html?causeId="' + id + '">Read More</a>' +
                                    '</div>' +
                                '</div>'
                    ,
                    zIndex: 2,
                    visible: true,
                    offset: new Microsoft.Maps.Point(0, 25)
                }

                pinInfobox = new Microsoft.Maps.Infobox(location, infoboxOptions);
                map.entities.push(pinInfobox);
                map.setView({ center: location });
            }, 180);
        });
    }

    function checkDonations() {
        PageMethods.getLastContribute(function (response) {
            if (response != '<NewDataSet />') {
                var resultXML = StringtoXML(response);
                var id = getOneElement(resultXML, 'id', 0);
                if (id != pathId) {
                    pathId = id;
                    var slat = getData(resultXML, 'user_id');
                    var slong = getData(resultXML, 'cause_id');
                    var elat = getData(resultXML, 'contribute');
                    var elong = getData(resultXML, 'date');
                    for (var i = 0; i < slat.length; i++) {
                        endPoints.push({ start: new Microsoft.Maps.Location(slat[i], slong[i]), end: new Microsoft.Maps.Location(elat[i], elong[i]) });
                    }
                }
            }
        });
        if (endPoints.length != 0 && !donating) {
            nextRoute();
        }
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
        try {
            var ret = [];
            var x = xml.getElementsByTagName(name);
            for (var i = 0; i < x.length; i++) {
                ret.push(x[i].childNodes[0].nodeValue);
            }
            return ret;
        } catch (e) {
            alert(e);
            alert('name:' + name);
        }
    }

    function getIndexId(xml, id) {
        try {
            var x = xml.getElementsByTagName(name);
            for (var i = 0; i < x.length; i++) {
                if (x[i] == id) {
                    return i;
                }
            }
        } catch (e) {
            alert(e);
            alert('id:' + id);
        }
    }

    function getOneElement(xml, name, index) {
        try {
            var x = xml.getElementsByTagName(name);
            return x[index].childNodes[0].nodeValue;
        } catch (e) {
            alert(e);
            alert("name:" + name + " index:" + index);
        }
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