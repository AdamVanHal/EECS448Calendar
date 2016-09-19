<?php

class Calendar {

	public function getEvents($event_date) {
		$db = $this->getDB();
		$records = $db->query("SELECT * FROM calendar WHERE event_date='" . $event_date . "'");
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
	public function editEvent($sql_string) {
		$db = $this->getDB();
		$db->query("UPDATE calendar SET " . $sql_string . "WHERE event_id=" . $_REQUEST['event_id']);
	}
}
$calendar = new Calendar;

$method = $_REQUEST['method'];
if($method) {
	switch ($method) {
		case "getEvents":
			$data = $calendar->getEvents($_REQUEST['event_date']);
			echo json_encode($data);
			break;
		case "addEvent":
			$calendar->addEvent($_REQUEST['name'], $_REQUEST['description'], $_REQUEST['event_date']);
			break;
		case "deleteEvent":
			$calendar->deleteEvent($_REQUEST['event_id']);
			break;
		 case "editEvent":
			$changed_data = array();
			$_REQUEST['name'] ? $changed_data['name'] = "name='" . $_REQUEST['name'] . "'" : '';
			$_REQUEST['description'] ? $changed_data['description'] = "description='" . $_REQUEST['description'] . "'": '';
			$_REQUEST['event_date'] ? $changed_data['event_date'] = "event_date='" . $_REQUEST['event_date'] . "'": '';
			$sql_string = implode(", ", $changed_data);
			$calendar->editEvent($sql_string);
			break;
		
	}
}


?>