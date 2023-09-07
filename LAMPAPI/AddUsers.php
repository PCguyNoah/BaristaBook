<?php

$inData = getRequestInfo();

$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$login = $inData["login"];
$password = $inData["password"];
$phone = $inData["phone"];
$email = $inData["email"];

$conn = new mysqli("localhost", "Group17", "Group17POOSD", "COP4331");
if ($conn->connect_error) 
{
	returnWithError($conn->connect_error);
} 
else 
{
	$sql = "SELECT * FROM Users WHERE Login=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s", $login);
	$stmt->execute();
	$result = $stmt->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows == 0) 
	{
		$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password, Phone, Email) VALUES(?,?,?,?,?,?)");
		$stmt->bind_param("ssssss", $firstName, $lastName, $login, $password, $phone, $email); // May need to things here
		$stmt->execute();
		$id = $conn->insert_id;
		$stmt->close();
		$conn->close();
		http_response_code(200);
		$searchResults .= '{' . '"id": "' . $id . '' . '"}';

		returnWithInfo($searchResults);
	} 
	else 
	{
		http_response_code(409);
		returnWithError("Username taken");
	}
}

function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError($err)
{
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson($retValue);
}
function returnWithInfo($searchResults)
{
	$retValue = '{"results":[' . $searchResults . '],"error":"","userAdded": true}';
	sendResultInfoAsJson($retValue);
}
