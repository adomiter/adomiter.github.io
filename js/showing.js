/*
function changeTitle(){
    let selectedElement  = document.getElementById("")
    console.log(selectedElement)
    selectedElement.innerText = "DIGS"
}
*/

function searchForm() {
    let searchTerm = document.getElementById("searchTerm").value;
    var connect = new XMLHttpRequest();
    var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=20&gsrsearch=" + searchTerm;
    connect.open('GET', url);

    connect.onload = function() {
        var wikiObject = JSON.parse(this.response);
        var pages = wikiObject.query.pages;
        for (var i in pages) {
            var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'mx-3 my-2 col-sm-2');
            newDiv.setAttribute('id', "newDiv" + pages[i].pageid.toString());
            var newA = document.createElement("a");
            newA.setAttribute('href', "https://en.wikipedia.org/?curid=" + pages[i].pageid.toString());
            newA.innerText = pages[i].title;

            document.getElementById("wiki").appendChild(newDiv);
            document.getElementById("newDiv" + pages[i].pageid.toString()).appendChild(newA);

        }
    }

    connect.send();

}


function minute() {
    var minute_num = new Date()
    minute_num = minute_num.getMinutes()
    let selectedElement = document.getElementById("display_time")
    selectedElement.innerText = minute_num
}

function add_element() {
    let selectedElement = document.getElementById("delete")
    selectedElement.style.display = 'block'
}


function delete_element() {
    let selectedElement = document.getElementById("delete")
    selectedElement.style.display = 'none'

}

function mapLoad() {
    //Define the lat lon coordinate
    var latLng = [41.8866619, -87.6342304];

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
        satellite = L.tileLayer(mbUrl, { id: 'mapbox/satellite-streets-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });


    var map = L.map('map', {
        center: latLng,
        zoom: 17,
        layers: [satellite]
    });

    var baseLayers = {
        "Grayscale": grayscale,
        "Streets": streets,
        "Satellite": satellite
    };

    L.control.layers(baseLayers).addTo(map);

    L.marker(latLng).addTo(map)
        .bindPopup("<b>Origin<br>Investments</b>").openPopup();



    //Click event
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    map.on('click', onMapClick);
}

var parentElement = document.getElementById('ocherTableBody')

var url = 'https://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300'

function loadXML() {
    XMLrequest(url)
    console.log('loadXML -- ok')

}

function XMLrequest(link) {
    var connect = new XMLHttpRequest()
    connect.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            listTexts(this.responseXML)
        }
    }
    connect.open('GET', link, true)
    connect.send()
    console.log('XML request -- ok')
}

function listTexts(sourceXML) {

    document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML
    document.getElementById('setTitle').innerText = sourceXML.getElementsByTagName('set')[0].children[3].children[0].innerHTML
    document.getElementById('setDescription').innerHTML = sourceXML.getElementsByTagName('set')[0].children[4].innerHTML
    var licenseText = document.getElementById('license')
    licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML
    licenseText.setAttribute('href', sourceXML.getElementsByTagName('availability')[0].children[0].attributes[0].nodeValue)

    console.log(sourceXML)
    var textList = sourceXML.getElementsByTagName('text')
    console.log(textList)
    for (i = 0; i < textList.length; i++) {
        var tr = document.createElement('tr')
        tr.setAttribute('class', 'ochreTableRows')
        tr.setAttribute('id', 'row_' + i)
        document.getElementById('OTB').appendChild(tr)
        var td = document.createElement('td')
        td.setAttribute('id', 'td_name_' + i)
        td.textContent = textList[i].children[0].children[0].innerHTML
        document.getElementById('row_' + i).appendChild(td)
        var td2 = document.createElement('td')
        td2.setAttribute('id', 'td_desc_' + i)
        td2.textContent = textList[i].children[3].innerHTML
        document.getElementById('row_' + i).appendChild(td2)
    }

}