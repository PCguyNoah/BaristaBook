<?php

	$inData = getRequestInfo();
	
    $name = $inData["name"];
    $phone = $inData["phone"];
    $email = $inData["email"];
	$id = $inData["id"];

    $conn = new mysqli("localhost", "Group17", "Group17POOSD", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// $stmt = $conn->prepare("INSERT into Contacts (Name, Phone, Email, UserID) VALUES(?,?,?,?)");
		// $stmt->bind_param("ssss", $name, $phone, $email, $userId);

        $setClauses = array();

        // We check if each field is not empty and we add it to setClauses
        if (strlen($name) > 0)
        {
            $setClauses[] = "Name = '$name'";
        }

        if (strlen($phone) > 0)
        {
            $setClauses[] = "Phone = '$phone'";
        }

        if (strlen($email) > 0)
        {
            $setClauses[] = "Email = '$email'";
        }

        if (!empty($setClauses))
        {
            $sql = "UPDATE Contacts SET " . implode(", ", $setClauses) . " WHERE ID = $id";

            if ($conn->query($sql) === TRUE)
            {
                returnWithError(""); // that is everything added nicely
            }
            else
            {
                returnWithError($conn->error);
            }
        }
        else
        {
            returnWithError("Nothing was provided to update");
        }
        
        $conn->close();


		// $stmt->execute();
		// $stmt->close();
		// $conn->close();
		// returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

