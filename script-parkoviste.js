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
//const navigovat2 = [
//    {X:16.6276207,Y:49.1977103},{X:16.5942887,Y:49.1773315},{X:16.5862066,Y:49.2142771},{X:16.6278493,Y:49.236492},{X:16.6157882,Y:49.2164103},{X:16.6209915,Y:49.2228745},{X:16.6276695,Y:49.2045425},{X:16.6418173,Y:49.1835452},{X:16.6337126,Y:49.1769491},{X:16.6292015,Y:49.1756896},{X:16.6108098,Y:49.1686715},{X:16.5868791,Y:49.1711609},{X:16.5652583,Y:49.1693508},{X:16.5599778,Y:49.1630947},{X:16.5583159,Y:49.1741113},{X:16.5327038,Y:49.1965249},{X:16.5349467,Y:49.2269981},{X:16.6161293,Y:49.2475268},{X:16.5194915,Y:49.2236855},{X:16.5602696,Y:49.220555},{X:16.5722486,Y:49.2410905},{X:16.6773648,Y:49.2026623},{X:16.6628314,Y:49.1987012},{X:16.6904233,Y:49.1814392},{X:16.6822774,Y:49.1768338},{X:16.6650237,Y:49.1512826},{X:16.6518886,Y:49.1518402},{X:16.6454638,Y:49.1320857},{X:16.5282215,Y:49.174132},{X:16.5666981,Y:49.2647114},{X:16.5935143,Y:49.2741317},{X:16.6072246,Y:49.2743156},{X:16.5889393,Y:49.2505071},{X:16.4972039,Y:49.2063289},{X:16.5637193,Y:49.2129475},{X:16.630276,Y:49.2912699},{X:16.6377919,Y:49.2035216}
//  ];
const navigovat2 = [
    {X:16.5801433, Y:49.1758850},{X:16.6049692,Y:49.1903733},{X:16.6140764,Y:49.1926839},{X:16.5925664,Y:49.2072989},{X:16.6094689,Y:49.1990306},{X:16.6177942,Y:49.1923911}
];
console.log(navigovat);





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

//            console.log(typeof b);
//    console.log(mainPoint);
const sortedPoints = sortCoordinatesByDistance(mainPoint, navigovat2);
console.log(sortedPoints);
        document.getElementById("nejblizsi").innerHTML = '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+sortedPoints[0]["Y"]+','+sortedPoints[0]["X"]+'" target="_blank" class="button">Navigovat na nejbližší volné parkoviště<br>(pod 95% kapacity)</a></div>';
//        document.getElementById("nejblizsi").innerHTML += '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+sortedPoints[1]["Y"]+','+sortedPoints[1]["X"]+'" target="_blank" class="button">Navigovat na nejbližší volné parkoviště<br>(pod 95% kapacity)</a></div>';
//        document.getElementById("nejblizsi").innerHTML += '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+sortedPoints[2]["Y"]+','+sortedPoints[2]["X"]+'" target="_blank" class="button">Navigovat na nejbližší volné parkoviště<br>(pod 95% kapacity)</a></div>';
//        document.getElementById("nejblizsi").innerHTML += '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+sortedPoints[3]["Y"]+','+sortedPoints[3]["X"]+'" target="_blank" class="button">Navigovat na nejbližší volné parkoviště<br>(pod 95% kapacity)</a></div>';
//        document.getElementById("nejblizsi").innerHTML += '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+sortedPoints[4]["Y"]+','+sortedPoints[4]["X"]+'" target="_blank" class="button">Navigovat na nejbližší volné parkoviště<br>(pod 95% kapacity)</a></div>';
//        document.getElementById("nejblizsi").innerHTML += '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+sortedPoints[5]["Y"]+','+sortedPoints[5]["X"]+'" target="_blank" class="button">Navigovat na nejbližší volné parkoviště<br>(pod 95% kapacity)</a></div>';
}

