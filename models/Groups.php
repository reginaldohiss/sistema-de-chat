<?php
class Groups extends Model {

	public function getList() {
		$array = array();

		$sql = "SELECT * FROM groups ORDER by name ASC";
		$sql = $this->db->query($sql);

		$array = $sql->fetchAll(PDO::FETCH_ASSOC);

		return $array;
	}

	public function add($name) {
		$sql = "INSERT INTO groups (name) VALUES (:name)";
		$sql = $this->db->prepare($sql);
		$sql->bindValue(':name', $name);
		$sql->execute();
	}

	public function getNamesByArray($id_groups) {
		$array = array();

		if(count($id_groups) > 0) {
			$sql = "SELECT name, id FROM groups WHERE id IN (".( implode(',', $id_groups) ).")";
			$sql = $this->db->query($sql);

			if($sql->rowCount() > 0) {
				$array = $sql->fetchAll(PDO::FETCH_ASSOC);
			}
		}

		return $array;
	}

}