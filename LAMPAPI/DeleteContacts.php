<?php
	$inData = getRequestInfo();
	
	$id = $inData["id"];

    $conn = new mysqli("localhost", "Group17", "Group17POOSD", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE from Contacts WHERE ID=?");
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$deletedRows = $stmt->affected_rows;
		$stmt->close();  

        if ($deletedRows > 0)
        {
            $retValue = '{"status":"Success"}';
		    sendResultInfoAsJson( $retValue );
        }
        else
        {
            $retValue = '{"status":"Fail"}';
		    sendResultInfoAsJson( $retValue );
        }      
		$conn->close();
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

    function returnResults()
    {
        $retValue = '{"Delete Status":"' . $err . '"}';
    }
?>