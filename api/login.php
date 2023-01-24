<?php
session_start();
header("Content-Type: application/json");
include("./conn.php");

if(isset($_POST['action'])){
    $action = $_POST['action'];
}else{
    echo"Error aya ka jira halkan";
}
function login($conn){
    extract($_POST);
    $data=array();
    $res_data=array();
    $query = "CALL login_sp('$username','$password')";
    $result = $conn->query($query);
    if($result){
        $row=$result->fetch_assoc();
        if(isset($row['Message'])){
            if($row['Message'] == 'Incorrect'){
                $res_data = array("status"=>false,"Message"=>"Username Or Password Incorrect");  
            }else if($row['Message']=='Deny'){
                 $res_data =array("status"=>false, "Message"=>"Your Acccount is locked by administrator"); 
            }
        }else{
            $_SESSION['username']=$row['username'];
             $_SESSION['image']=$row['image'];
             foreach($row as $key => $value ){
                $_SESSION[$key] = $value;
            }
             $res_data=array("status"=>true,"Message"=>"Successfully");
        } 
    }else{
        $res_data=array("status"=>false,"Message"=>$conn->error);
        }
    echo json_encode($res_data);
}
if(isset($action)){
    $action($conn);
}

?>