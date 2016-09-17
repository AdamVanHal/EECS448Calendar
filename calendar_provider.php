<?php

class Calendar {

	public function getEvents() {
		$db = $this->getDB();
		$records = $db->query("SELECT * FROM calendar");
		$data = array();
		while($row = $records->fetch_assoc()) {
			$data[] = $row; 
		}
		return $data;
	}
	public function addEvent($name, $description, $event_date) {
		$db = $this->getDB();
		$insert_string = "'" . $name . "', '" . $description . "', '" . $event_date . "', " . "0";
		$db->query("INSERT INTO calendar (name, description, event_date, user) VALUES (" . $insert_string . ")");
	}
	public function deleteEvent($event_id) {
		$db = $this->getDB();
		$db->query("DELETE FROM calendar WHERE event_id=" . $event_id);
	}
	public function getDB() {
		$server = "mysql.eecs.ku.edu";
		$username = "dmurga";
		$db = new mysqli($server, $username, "Ns5qKknK", $username);
		return $db;
	}
	// public function editEvent($name, $description, $event_date) {
	// }
}
$calendar = new Calendar;

$method = $_REQUEST['method'];
if($method) {
	switch ($method) {
		case "getEvents":
			$data = $calendar->getEvents();
			break;
		case "addEvent":
			$calendar->addEvent($_REQUEST['name'], $_REQUEST['description'], $_REQUEST['event_date']);
			break;
		case "deleteEvent":
			$calendar->deleteEvent($_REQUEST['event_id']);
			break;
		// case "editEvent":
		// 	$calendar->editEvent($_REQUEST['name'], $_REQUEST['description'], $_REQUEST['event_date']);
		// 	break;
		
	}
}


?>