function BingMap() {
    var credentials = "AkBI3eBjLpCZE74qrT44B-tAET626SDzR2q6aE19mkGNpg_7EQF6oDsNRrkA5qVN";
    var container = document.getElementById('mapDiv');
    var center = new Microsoft.Maps.Location(41.0092, 20.0194);
    var map;
    var position;
    this.zoom = 2;
    var fPoints = new Array();
    this.endPoints = new Array();
    this.donating = false;
    var infobox;

    this.init = function () {
        var myOptions = {
            credentials: credentials,
            center: center,
            mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
            zoom: this.zoom,
            showCopyright: false,
            showDashboard: true,
            showMapTypeSelector: false,
            showScalebar: false,
            fixedMapPosition: true,
            customizeOverlays: true
        }
        //        Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', { callback: function () {
        //            map = new Microsoft.Maps.Map(container,
        //    {
        //        credentials: credentials,
        //        theme: new Microsoft.Maps.Themes.BingTheme()
        //    });
        //        }
        //        });
        Microsoft.Maps.loadModule('Microsoft.Maps.Overlays.Style', { callback: function () {
            map = new Microsoft.Maps.Map(container, myOptions);
            infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
            map.entities.push(infobox);
        } 
        });
        
        this.getCurrentPosition();
    }

    this.getCurrentPosition = function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
            position = pos.coords;
        });
    }

    this.addPin = function (lat, long) {
        map.entities.push(new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, lat)));
    }

    this.add = function (el) {
        map.entities.push(el);
    }

    this.remove = function (el) {
        map.entities.remove(el);
    }

    this.getMap = function () {
        return map;
    }

    this.setMap = function (m) {
        map = m;
    }

    this.clear = function () {
        map.entities.clear();
    }

    this.displayInfobox = function (location, options) {
        infobox.setOptions(options);
        infobox.setLocation(location);
    }

    this.setView = function (options) {
        map.setView(options);
    }

    this.nextRoute = function () {
        if (endPoints.length) {
            this.donating = true;
            fPoints = [];
            var p = endPoints.shift();
            var heart = new Microsoft.Maps.Pushpin(p.start, {
                icon: 'images/flying-heart-icon.png',
                width: 150,
                height: 150
            });
            map.entities.push(heart);
            plotRoute(p.start, p.end, heart);
        }
        else {
            this.donating = false;
        }
    }

    this.plotRoute = function (p1, p2, heart) {
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
                window.setTimeout(function () { plotRoute(p1, p2, heart); }, 50);
            }
            else {
                fPoints.push(p2);
                heart.setLocation(p2);
                map.entities.remove(heart);
                nextRoute();
            }
        }

    }

}