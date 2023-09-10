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
		$stmt->close();
        $stmt = $conn->prepare("SELECT * from Contacts WHERE ID=?");
		$stmt->bind_param("s", $id);
		$stmt->execute();
        $result = $stmt->get_result(); 
        $stmt->close();  
        $conn->close();

        if ($result !== true && $result->num_rows <= 0)
        {
            $retValue = '{"status":"Success"}';
		    sendResultInfoAsJson( $retValue );
        }
        else
        {
            $retValue = '{"status":"Fail"}';
		    sendResultInfoAsJson( $retValue );
        }      
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