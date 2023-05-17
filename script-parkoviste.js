const url = 'https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/carparks_live/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

var a = "";
var b = "";
const navigovat = [];

function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
}

function showPosition(position) {
    a = position.coords.latitude;
    b = position.coords.longitude;
    nejblizsi();
}
getLocation();

fetch(url)
  .then(response => response.json())
  .then(data => {
    const features = data.features;
    const tableBody = document.querySelector('#parking-table tbody');

    for (let i = 0; i < features.length; i++) {
      const attributes = features[i].attributes;
      const name = attributes.name;
      const capacity = attributes.capacity;
      const free = attributes.free;
      const c = attributes.Latitude;
      const d = attributes.Longitude;
      const capacityPercentage = (free / capacity) * 100;
        
        getLocation();
        
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const capacityCell = document.createElement('td');
      const freeCell = document.createElement('td');
      const progressBarCell = document.createElement('td');
      const progressBar = document.createElement('div');
      const progressBarFill = document.createElement('div');

      nameCell.textContent = name;
        nameCell.innerHTML = '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+c+','+d+'" target="_blank" class="button">'+nameCell.innerHTML+'</a></div>';
      capacityCell.textContent = capacity;
            freeCell.textContent = free;

      progressBar.style.width = capacityPercentage + '%';
      progressBar.classList.add('progress-bar-1');
      progressBarFill.classList.add('progress-bar-fill');
        if (capacityPercentage >= 95){
            progressBarFill.style.backgroundColor = '#e41313';
        }else{
            const X = { X: d, Y: c };
            console.log(typeof d);
            navigovat.push(X);
        }
        
        
      progressBar.appendChild(progressBarFill);

      progressBarCell.appendChild(progressBar);

      row.appendChild(nameCell);
      row.appendChild(capacityCell);
      row.appendChild(freeCell);
      row.appendChild(progressBarCell);

      tableBody.appendChild(row);
    }
  })
  .catch(error => {
    console.error('Chyba při získávání dat:', error);
  });

const navigovat2 = [
    {X:16.5801433, Y:49.1758850},{X:16.6049692,Y:49.1903733},{X:16.6140764,Y:49.1926839},{X:16.5925664,Y:49.2072989},{X:16.6094689,Y:49.1990306},{X:16.6177942,Y:49.1923911}
];

function nejblizsi(){
    function calculateDistance(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  return distance;
}

function sortCoordinatesByDistance(mainPoint, coordinates) {
  const sortedCoordinates = coordinates.sort((coordA, coordB) => {
    const distanceA = calculateDistance(
      mainPoint.X,
      mainPoint.Y,
      coordA.X,
      coordA.Y
    );
    const distanceB = calculateDistance(
      mainPoint.X,
      mainPoint.Y,
      coordB.X,
      coordB.Y
    );

    return distanceA - distanceB;
  });

  return sortedCoordinates;
}

const mainPoint = { X: b, Y: a };
const sortedPoints = sortCoordinatesByDistance(mainPoint, navigovat2);
console.log(sortedPoints);
        document.getElementById("nejblizsi").innerHTML = '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+sortedPoints[0]["Y"]+','+sortedPoints[0]["X"]+'" target="_blank" class="button">Navigovat na nejbližší volné parkoviště<br>(pod 95% kapacity)</a></div>';
}

