$(document).ready(function () {

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
    var pinInfoBox;
    var pointId = [];
    var credentials = "AkBI3eBjLpCZE74qrT44B-tAET626SDzR2q6aE19mkGNpg_7EQF6oDsNRrkA5qVN";
    var pathId = 0;
    var donePath = false;
    var personDetails = [];
    var imageDetails = [];
    var videoDetails = [];

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

    navigator.geolocation.getCurrentPosition(function () {
        position = pos.coords;
    });

    window.setInterval(function () { checkDonations(); }, 1000);
    window.setInterval(function () { getAllPeople(); }, 1000);

    function getAllPeople() {
        PageMethods.getAllPersonsAsXml(function (response) {
            if (response != '<NewDataSet />') {
                var xml = StringtoXML(response);
                var id = getData(xml, 'id');
                if (personDetails.length != id.length) {
                    for (var i = 0; i < id.length; i++) {
                        if ($.inArray(id[i], personDetails) == -1) {
                            personDetails[id[i]] = [];
                            personDetails[id[i]]["latitude"] = getOneElement(xml, 'latitude', i);
                            personDetails[id[i]]["longitude"] = getOneElement(xml, 'longitude', i);
                            personDetails[id[i]]["description"] = getOneElement(xml, 'description', i);
                            personDetails[id[i]]["city"] = getOneElement(xml, 'city', i);
                            personDetails[id[i]]["state"] = getOneElement(xml, 'state', i);
                            personDetails[id[i]]["name"] = getOneElement(xml, 'name', i);
                            personDetails[id[i]]["surname"] = getOneElement(xml, 'surname', i);
                            personDetails[id[i]]["age"] = getOneElement(xml, 'age', i);
                            var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(personDetails[id[i]]["latitude"], personDetails[id[i]]["longitude"]));
                            map.entities.push(pin);
                            addListener(pin, id[i]);
                        }
                    }
                }
            }
        });
    }

    function addListener(pin, id) {
        Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
            PageMethods.getImages(id, function (imagesResult) {
                if (imagesResult != '<NewDataSet />') {
                    var xmlImages = StringtoXML(imagesResult);
                    var imageId = getData(xmlImages, 'id');
                    if (imageDetails.length != imageId.length) {
                        for (var i = 0; i < imageId.length; i++) {
                            if ($.inArray(imageId[i], imageDetails) == -1) {
                                imageDetails[imageId[i]] = [];
                                imageDetails[imageId[i]]['person_id'] = getOneElement(xmlImages, 'person_id', i);
                                imageDetails[imageId[i]]['profile'] = getOneElement(xmlImages, 'profile', i);
                                imageDetails[imageId[i]]['name'] = getOneElement(xmlImages, 'name', i);
                                imageDetails[imageId[i]]['path'] = getOneElement(xmlImages, 'path', i);
                            }
                        }
                    }
                }
            });
            PageMethods.getVideos(id, function (videosResult) {
                if (videosResult != '<NewDataSet />') {
                    var xmlVideos = StringtoXML(videosResult);
                    var videosId = getData(xmlVideos, 'id');
                    if (videoDetails.length != videosId.length) {
                        for (var i = 0; i < videosId.length; i++) {
                            if ($.inArray(videosId[i], videoDetails) == -1) {
                                videoDetails[videosId[i]] = [];
                                videoDetails[videosId[i]]['person_id'] = getOneElement(xmlVideos, 'person_id', i);
                                videoDetails[videosId[i]]['name'] = getOneElement(xmlVideos, 'name', i);
                                videoDetails[videosId[i]]['url'] = getOneElement(xmlVideos, 'url', i);
                            }
                        }
                    }
                }
            });

            displayInfobox(e, id);
        });
    }

    function getProfilePicture(personId) {
        for (var i in imageDetails) {
            if (imageDetails[i]['person_id'] == personId && imageDetails[i]['profile'] == 1) {
                return imageDetails[i]['path'] + imageDetails[i]['name'];
            }
        }
        return 'images/poor.jpg';
    }

    function getHiddenUl(personId) {
        var str = '<ul style="display:none">';
        for (var i in imageDetails) {
            if (imageDetails[i]['person_id'] == personId) {
                var path = imageDetails[i]['path'] + imageDetails[i]['name'];
                str += '<li>' +
                        '<a class="gallery" href="' + path + '">' +
                            '<img src="' + path + '" width="72" height="72" alt="' + path + '" />' +
                        '</a>' +
                    '</li>';
            }
        }
        str += '</ul>';
        return str;
    }

    function getVideos(personId) {
        var str = '';
        for (var i in videoDetails) {
            str += '<iframe width="420" height="315" src="' + videoDetails[i]['url'] + '" frameborder="0" allowfullscreen></iframe>';
        }
        return str;
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

    function displayInfobox(e, id) {
        var profilePath = getProfilePicture(id);
        var location = e.target.getLocation();
        pinInfobox.setOptions(
        {
            width: 800,
            height: 450,
            description: '<div>' +
                            '<div class="info">' +
                                '<div class="image-container">' +
                                    '<a href="' + profilePath + '" class="light-box gallery">' +
                                        '<img  class="info-image gallery" src="' + profilePath + '" alt="' + profilePath + '">' +
                                        '<div class="clearfix view-all">View All</div>' +
                                    '</a>' +
                                    getHiddenUl(id) +
                                '</div>' +
                                '<div class="person-info">' +
                                    '<h4>Basic Info</h4>' +
                                    '<ul class="information">' +
                                        '<li><b>Name</b>: ' + personDetails[id]["name"] + personDetails[id]["surname"] + '</li>' +
                                        '<li><b>Age</b>: ' + personDetails[id]["age"] + ' </li>' +
                                        '<li><b>City</b>: ' + personDetails[id]["city"] + '</li>' +
                                        '<li><b>Country</b>: ' + personDetails[id]["country"] + '</li>' +
                                        '<li><b>Needs</b>: 50000$</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                            '<div class="desc">' +
                                '<h3>' + personDetails[id]["name"] + '\'s Story</h3>' +
                                personDetails[id]["description"] +
                                getVideos(id) +
                            '</div>' +
                        '</div>'
            ,
            zIndex: 2,
            visible: true,
            offset: new Microsoft.Maps.Point(0, 25)
        });
        pinInfobox.setLocation(location);

        map.setView({ center: new Microsoft.Maps.Location(location.latitude, location.longitude) });
    }

    function hideInfobox(e) {
        pinInfobox.setOptions({ visible: false });
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