document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonformusic').addEventListener('click', searchMusicManual)
    document.getElementById('formformusic').addEventListener('submit', searchMusicManual)
});


// Just in case we get throttled, here is a header to pass to the API.
const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "UChicagoDigitalStudies/1.0 (adomiter@uchicago.edu)"
});

// This function will remove the previous results.
function removeResults(parentDiv) {
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
};

function searchMusicManual() {
    // Clear out previous results and hide table each time the user searches
    removeResults(document.getElementById('output'));
    removeResults(document.getElementById('tableBody'));
    document.getElementById('artistName').innerText = "";
    document.getElementById('tableContainer').className = 'd-none';

    // Get Input
    var artistName = document.getElementById('artistInput').value;

    // Declare base url for API
    var urlArtist = "https://musicbrainz.org/ws/2/artist/?query=" + artistName + "&fmt=json";

    // Perform the fetch()
    fetch(urlArtist, {
            method: 'GET',
            headers: headers
        })
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('PROBLEM! Status code is: ' + response.status);
                    return;
                };
                response.json().then(data => searchResults(data));
            });
};

function searchResults(data) {
    let artists = data.artists;
    for (i in artists) {
        var newAnchor = document.createElement("a");
        newAnchor.href = `javascript:displayAlbums('${artists[i].id}', '${artists[i].name}')`;
        newAnchor.className = 'd-block';
        newAnchor.innerText = artists[i].name;
        document.getElementById("output").appendChild(newAnchor);
    }
};

// Create table of non-live albums by artist, link through to MB site.
// This function queries 'release-group'. If that entity changes,
// so much much of the rest of the function to account for the different JSON structure.
// If we do not set &limit, the default is 25.
function displayAlbums(id, artistName) {
    var albumsURL = `https://musicbrainz.org/ws/2/release-group?artist=${id}&limit=150&fmt=json;`;
    console.log(`Albums by artist: ${albumsURL}`);
    document.getElementById('artistName').innerText = artistName;

    fetch(albumsURL)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('PROBLEM! Status code is: ' + response.status);
                    return;
                }
                response.json().then(data => getAlbums(data));
            });
};

function getAlbums(data) {
    var releases = data["release-groups"];
    console.log(releases);
    removeResults(document.getElementById('output'));
    document.getElementById('tableContainer').className = 'd-block';

    for (i in releases) {
        if (releases[i]["secondary-types"] != "Live" && releases[i]["primary-type"] == "Album") {
            console.log(releases[i])
            var releaseDate = releases[i]["first-release-date"];
            var albumTitle = releases[i]["title"];
            var newRow = document.createElement('tr');
            newRow.id = 'newRow_' + i
            document.getElementById('tableBody').appendChild(newRow)
            var newReleaseData = document.createElement('td');
            newReleaseData.innerText = releaseDate;
            document.getElementById('newRow_' + i).appendChild(newReleaseData);
            var newTitleData = document.createElement('td');
            newTitleData.id = 'newTD_' + i;
            var newAnchor = document.createElement('a');
            newAnchor.href = `https://musicbrainz.org/release-group/${releases[i].id}`
            newAnchor.target = '_blank';
            newAnchor.innerText = albumTitle;
            document.getElementById('newRow_' + i).appendChild(newTitleData);
            document.getElementById('newTD_' + i).appendChild(newAnchor);
        }
    }
    sortTable();
}

// Generic table sort
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tableOutput");
    switching = true;
    while (switching) {
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        switching = false;
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}