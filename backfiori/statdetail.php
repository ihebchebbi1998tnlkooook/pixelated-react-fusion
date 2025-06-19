<?phpheader("Access-Control-Allow-Origin: *");
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

// Count unique visitors for February
$febVisitorsQuery = "SELECT COUNT(DISTINCT ip_visitors) AS unique_feb FROM visitors WHERE MONTH(date_visitors) = 2";
$febVisitorsResult = $conn->query($febVisitorsQuery);
$febVisitors = $febVisitorsResult->fetch_assoc()["unique_feb"];

// Count unique visitors for March
$marVisitorsQuery = "SELECT COUNT(DISTINCT ip_visitors) AS unique_mar FROM visitors WHERE MONTH(date_visitors) = 3";
$marVisitorsResult = $conn->query($marVisitorsQuery);
$marVisitors = $marVisitorsResult->fetch_assoc()["unique_mar"];

// Count total visits & unique visitors for the 'cart' page
$cartQuery = "SELECT COUNT(*) AS total_cart, COUNT(DISTINCT ip_visitors) AS unique_cart FROM visitors WHERE page_visitors = 'cart'";
$cartResult = $conn->query($cartQuery);
$cartStats = $cartResult->fetch_assoc();
$totalCartVisits = $cartStats["total_cart"];
$uniqueCartVisitors = $cartStats["unique_cart"];

// Count unique visitors per page
$pageQuery = "SELECT page_visitors, COUNT(DISTINCT ip_visitors) AS unique_count FROM visitors GROUP BY page_visitors";
$pageResult = $conn->query($pageQuery);

$pageData = [];
while ($row = $pageResult->fetch_assoc()) {
    $pageData[$row["page_visitors"]] = $row["unique_count"];
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visitor Statistics</title>
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
</head>
<body>

<h2>Unique Visitors & Page Statistics</h2>

<!-- Summary Statistics -->
<table border="1" cellpadding="10">
    <tr>
        <th>Month</th>
        <th>Unique Visitors</th>
    </tr>
    <tr>
        <td>February</td>
        <td><?php echo $febVisitors; ?></td>
    </tr>
    <tr>
        <td>March</td>
        <td><?php echo $marVisitors; ?></td>
    </tr>
</table>

<h3>'Cart' Page Visitors</h3>
<table border="1" cellpadding="10">
    <tr>
        <th>Total Visits</th>
        <th>Unique Visitors</th>
    </tr>
    <tr>
        <td><?php echo $totalCartVisits; ?></td>
        <td><?php echo $uniqueCartVisitors; ?></td>
    </tr>
</table>

<h3>Unique Visitors Per Page</h3>
<table id="pageTable" class="display nowrap" style="width:100%">
    <thead>
        <tr>
            <th>Page</th>
            <th>Unique Visitors</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($pageData as $page => $count) { ?>
            <tr>
                <td><?php echo $page; ?></td>
                <td><?php echo $count; ?></td>
            </tr>
        <?php } ?>
    </tbody>
</table>

<!-- Chart -->
<canvas id="pageChart"></canvas>

<script>
$(document).ready(function() {
    $('#pageTable').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf']
    });

    // Chart Data
    const pageData = <?php echo json_encode($pageData); ?>;

    new Chart(document.getElementById('pageChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(pageData),
            datasets: [{
                label: 'Unique Visitors Per Page',
                data: Object.values(pageData),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
        }
    });
});
</script>

</body>
</html>
