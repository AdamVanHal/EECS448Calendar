<?
//set up sql connection to eecs server

$method = $_REQUEST['method'];
$server = "mysql.eecs.ku.edu";
$username = "dmurga";
$db = new mysqli($server, $username, "Ns5qKknK", "dmurga");

switch $method {
	case "getEvents":
		$records = $db->query("SELECT * FROM calendar");
		$data = array();
		while($row = $records->fetch_assoc()) {
			$data[] = $row; 
		}
		return $data;
		break;
	case "addEvent":
		$insert_string = $_REQUEST['name'] . ", " . $_REQUEST['description'] . ", " . $_REQUEST['event_date'] . ", " . "0";
		$db->query("INSERT INTO calendar (name, description, event_date, user) VALUES (" . $insert_string . ")");
		break;
	case "deleteEvent":
		$db->query("DELETE FROM calendar WHERE event_id=" . $_REQUEST['event_id']);
		break;
	/*
	case "editEvent":
		$db->query("UPDATE SET " . )
		break;
	*/
}

?>