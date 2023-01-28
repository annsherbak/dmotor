
$dblocation = "127.0.0.1:3306";
$dbname = "u0958551_dmotor";
$dbuser = "u0958551_dmuser";
$dbpass = "7UpecnMMgBiVE36";

$conn = mysqli_connect($dblocation, $dbuser, $dbpass, $dbname);

mysqli_set_charset($conn, "utf8");