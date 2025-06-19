<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
$servername = "fioriflmaster.mysql.db";
$username = "fioriflmaster";
$password = "Azerty123456";
$dbname = "fioriflmaster";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Default month (February)
$selected_month = isset($_GET['month']) ? intval($_GET['month']) : 2;

// Query to fetch unique visits per page for the selected month
$sql = "SELECT page_visitors, city_visitors, country_visitors, COUNT(DISTINCT ip_visitors) AS visit_count 
        FROM visitors 
        WHERE MONTH(date_visitors) = $selected_month 
        GROUP BY page_visitors, city_visitors, country_visitors 
        ORDER BY visit_count DESC";

$result = $conn->query($sql);

// Stats Calculation
$pageCounts = [];
$cityCounts = [];
$countryCounts = [];
$totalVisitors = 0;
$cartVisitors = 0;

while ($row = $result->fetch_assoc()) {
    $totalVisitors += $row['visit_count'];

    // Count visits for "cart" page
    if ($row['page_visitors'] === 'cart') {
        $cartVisitors += $row['visit_count'];
    }

    // Count page visits (Unique IPs)
    $page = $row["page_visitors"];
    $pageCounts[$page] = isset($pageCounts[$page]) ? $pageCounts[$page] + $row['visit_count'] : $row['visit_count'];

    // Count city visits
    $city = $row["city_visitors"];
    $cityCounts[$city] = isset($cityCounts[$city]) ? $cityCounts[$city] + $row['visit_count'] : $row['visit_count'];

    // Count country visits
    $country = $row["country_visitors"];
    $countryCounts[$country] = isset($countryCounts[$country]) ? $countryCounts[$country] + $row['visit_count'] : $row['visit_count'];
}

// Sort most visited pages first
arsort($pageCounts);

// Close DB connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statistiques des Visiteurs</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.3/css/buttons.dataTables.min.css">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; }
        .container { background: white; padding: 20px; border-radius: 10px; }
        h2 { text-align: center; }
        select { padding: 8px; font-size: 16px; }
        .table-container { margin-top: 20px; }
        .badge { font-size: 14px; padding: 6px 12px; }
    </style>
</head>
<body>

<div class="container">
    <h2>📊 Statistiques des Visiteurs (Unique IPs)</h2>
    <label for="month">📅 Sélectionner un mois:</label>
    <select id="month" onchange="changeMonth()">
        <option value="2" <?= ($selected_month == 2) ? 'selected' : '' ?>>Février</option>
        <option value="3" <?= ($selected_month == 3) ? 'selected' : '' ?>>Mars</option>
    </select>

    <h3>👥 Nombre total de visiteurs uniques: <?= $totalVisitors ?></h3>
    <h3>🛒 Visiteurs uniques sur la page 'Cart': <?= $cartVisitors ?></h3>

    <div class="table-container">
        <h3>📄 Pages les plus visitées (Unique IPs)</h3>
        <table id="visitorTable" class="display table table-striped table-hover">
            <thead class="table-light">
                <tr>
                    <th>🏷 Page Visité</th>
                    <th>📊 Nombre de Visiteurs Uniques</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($pageCounts as $page => $count): ?>
                    <tr>
                        <td><strong><?= ucfirst(htmlspecialchars($page)) ?></strong></td>
                        <td><span class="badge bg-primary"><?= $count ?></span></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <canvas id="cityChart"></canvas>
    <canvas id="countryChart"></canvas>
</div>

<script>
function changeMonth() {
    let selectedMonth = document.getElementById('month').value;
    window.location.href = "?month=" + selectedMonth;
}

$(document).ready(function() {
    $('#visitorTable').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf']
    });

    // Prepare Chart Data
    const cityData = <?= json_encode($cityCounts) ?>;
    const countryData = <?= json_encode($countryCounts) ?>;

    // City Chart
    new Chart(document.getElementById('cityChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(cityData),
            datasets: [{
                label: 'Visiteurs Uniques par Ville',
                data: Object.values(cityData),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
        }
    });

    // Country Chart
    new Chart(document.getElementById('countryChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(countryData),
            datasets: [{
                label: 'Visiteurs Uniques par Pays',
                data: Object.values(countryData),
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
        }
    });
});
</script>

</body>
</html>



