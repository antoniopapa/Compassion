$(document).ready(function () {
    var causeDetails = [];
    var contributions = [];
    var pins = [];
    var map = new BingMap();
    function load_the_map() {
        map = new BingMap();
        map.init();
    }
    load_the_map();

    window.setInterval(function () { addNewCauses(); }, 3000); //checkContributions();

    function addNewCauses() {
        //emptyPins();
        //map.clear();
        getCauses();
        for (var causeId in causeDetails) {
            causeContent(causeId);
        }
    }

    function getCauses() {
        try {
            PageMethods.getCauses(function (response) {
                if (response != '<NewDataSet />') {
                    xml = StringtoXML(response);
                    var idArray = getData(xml, 'id');
                    for (var i in idArray) {
                        var currentId = idArray[i];
                        causeDetails[currentId] = [];
                        causeDetails[currentId]["latitude"] = getOneElement(xml, 'latitude', i);
                        causeDetails[currentId]["longitude"] = getOneElement(xml, 'longitude', i);
                        causeDetails[currentId]["description"] = getOneElement(xml, 'description', i);
                        causeDetails[currentId]["title"] = getOneElement(xml, 'title', i);
                        causeDetails[currentId]["name"] = getOneElement(xml, 'name', i);
                    }
                }
            });
        }
        catch (e) { }
    }

    function causeContent(causeId) {
        var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(causeDetails[causeId]["latitude"], causeDetails[causeId]["longitude"]));
        pins[causeId] = pin;
        map.add(pin);
        Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
            displayCauseContent(causeId);
        });
    }

    function displayCauseContent(causeId) {
        var location = new Microsoft.Maps.Location(causeDetails[causeId]["latitude"], causeDetails[causeId]["longitude"]);
        getImagePath(causeId);
        setTimeout(function () {
            var infoboxOptions = {
                width: 400,
                height: 200,
                description: '<div>' +
                                    '<div class="info">' +
                                        '<img src="' + causeDetails[causeId]["image_path"] + '" class="info-image" alt="">' +
                                    '</div>' +
                                    '<div class="desc">' +
                                        '<h3>' + causeDetails[causeId]["title"] + ' by ' + causeDetails[causeId]["name"] + '</h3>' +
                                           truncateString(causeDetails[causeId]["description"], 100) +
                                            '<a href="profile.html?causeId="' + causeId + '">Read More</a>' +
                                    '</div>' +
                                '</div>'
                    ,
                zIndex: 2,
                visible: true,
                offset: new Microsoft.Maps.Point(-8, 25)
            }

            //map.add(new Microsoft.Maps.Infobox(location, infoboxOptions));
            map.displayInfobox(location, infoboxOptions);
            map.setView({ center: location });
        }, 180);
    }

    function checkContributions() {
        contributions = getContributions(contributions, map.endPoints);
        if (map.endPoints.length != 0 && !map.donating) {
            map.nextRoute();
        }
    }

    function emptyPins() {
        for (causeId in pins) {
            map.remove(pins[causeId]);
        }
    }

    function addPins() {

    }

    function getImagePath(causeId) {
        try {
            PageMethods.getImages(causeId, function (imagePath) {
                causeDetails[causeId]["image_path"] = imagePath;
            });
        } catch (e) {
            alert(e);
        }
    }

    function getContributions(endPoints) {
        try {
            PageMethods.getLastContribute(function (response) {
                if (response != '<NewDataSet />') {
                    var resultXML = StringtoXML(response);
                    var id = getOneElement(resultXML, 'id', 0);
                    if ($.inArray(id, contributions) == -1) {
                        contributions[id] = [];
                        contributions[id]['user_id'] = getOneElement(resultXML, 'user_id', 0);
                        contributions[id]['cause_id'] = getOneElement(resultXML, 'cause_id', 0);
                        contributions[id]['contribute'] = getOneElement(resultXML, 'contribute', 0);
                        contributions[id]['date'] = getOneElement(resultXML, 'date', 0);
                        //                for (var i = 0; i < slat.length; i++) {
                        //                    endPoints.push({ start: new Microsoft.Maps.Location(slat[i], slong[i]), end: new Microsoft.Maps.Location(elat[i], elong[i]) });
                        //                }
                    }
                }
            });
        } catch (e) {
            alert(e);
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

    $('.input-metro').keyup(function () {
        try {
            $('.menu-item.search-obj').remove();
            if ($('.input-metro').val() != '') {
                PageMethods.getSearchCauses($('.input-metro').val(), function (response) {
                    if (response != '<NewDataSet />') {
                        xml = StringtoXML(response);
                        var idArray = getData(xml, 'id');
                        for (var i in idArray) {
                            $('#sidebar-menu').prepend('<div class="menu-item search-obj" causeId="' + idArray[i] + '">' +
                                                           '<img src="imgs/icons/Data.png" style="background-color: rgb(0, 0, 0);">' +
                                                           '<span>' + getOneElement(xml, 'title', i) + '</span>' +
                                                        '</div>');
                        }
                    }
                });
            }
        } catch (e) { }
    });

    function truncateString(str, len) {
        if (str.length > len) {
            return str.substring(0, len) + '...';
        }

        return str;
    }

    $('.search-obj').livequery('mouseover', function () {
        var causeId = $(this).attr('causeId');
        map.setView(new Microsoft.Maps.Location(causeDetails[causeId]["latitude"], causeDetails[causeId]["longitude"]));
    });

    $('.search-obj').livequery('click', function () {
        var causeId = $(this).attr('causeId');
        displayCauseContent(causeId);
        map.setView({ zoom: 10 });
    });
});

