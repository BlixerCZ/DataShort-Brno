<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="utf-8">
  <title>Zaplněnost parkovišť</title>
  <link rel="stylesheet" href="style-parkoviste.css">
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    .progress-bar {
      width: 100%;
      height: 20px;
      background-color: #f2f2f2;
      border-radius: 4px;
      margin-bottom: 8px;
    }

.progress-bar-fill {
      height: 100%;
      border-radius: 4px;
      background-color: #4CAF50;
    }
      .progress-bar-1 {
  height: 5px;
}

  </style>
  
    <link rel="shortcut icon" href="favicon.ico" />
</head>
<body>
  <h1>Zaplněnost parkovišť</h1>
  <a style="position: fixed;top: 20px;right: 20px;font-size: 34px;cursor: pointer;text-decoration: none;color: #000;" href="https://datashort.cz/datashort/hackathon-brno/">×</a>
  
  <table id="parking-table">
    <thead>
      <tr>
        <th>Název parkoviště</th>
        <th>Kapacita</th>
        <th>Zaplněnost</th>
        <th>Naplněno</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table><br><br>
  <div id="nejblizsi"></div>
<!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwKEKMCaJz0mzPEuYEnQhpU1TcC8RcQ2A&callback=initMap" async defer></script>-->
  <script src="script-parkoviste.js"></script>
</body>
</html>
