<?php

header("Content-Type: application/json");
include('conn.php');


if(isset($_POST['action'])){
    $action = $_POST['action'];
}else{
    echo "He heey error";
}

function register_user($conn){
    extract($_POST);
    $data = array();
    $newId = genId($conn);
    $new_user_id = $newId . ".png"; 
    $target_file = "../uploads/" . $newId.".png";
    if(isset($_FILES['image']['name'])){
        
        if($_FILES['image']['error'] > 0){
            echo "There is" .$_FILES['image']['error'];
           
        }else{
             move_uploaded_file($_FILES['image']['tmp_name'],$target_file);
        }
    }else{
      
    }
    $query = "CALL users_sp('$newId','$name','$username','$password','$Phone','$gender','$new_user_id','$date')";
    $result = $conn->query($query);
    if($result){
       $row = $result->fetch_assoc(); 
       if($row['Message'] == "Registered"){
        $data = array("status"=> true, "Message"=> "Registered Successfully");
       }
    }else{
       $data = array("status"=>false,"Message"=>$conn->error); 
    }
    echo  json_encode($data);
}


function fetch_user_info($conn){
    extract($_POST);
    $data=array();
    $res_data=[];
    $query="select * from users where id='$id'";
    $result = $conn->query($query);
    if($result){
        $num_rows =$result->num_rows;
            if($num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $res_data[] = $row;
                }
               $data = array("status"=>true,"Message"=>$res_data);
            }else{
               $data = array("status"=>false,"Message"=>"Data Not Found...");
            }
    }else{
        $data=array("status"=>false ,"message"=>$conn->error);
    }
    echo json_encode($data);

}


function load_users($conn){
    $data = array();
    $res_data = [];
    $query = "SELECT  `id`'ID',`image`'Image', `name`'Name',`username`'Username',`gender`'Gender', `phone`'Phone',`date`'Date' FROM `users`";
    $result = $conn->query($query);
    if($result){
        $num_rows = $result->num_rows;
        if($num_rows > 0){ 
            while($row = $result->fetch_assoc()){
                $res_data[] = $row;
            }
           $data = array("status"=>true,"Message"=>$res_data);
        }else{
           $data = array("status"=>false,"Message"=>"Data Not Found...");
        }
    }else{
        $data = array("status"=>false,"Message"=>$conn->error);
    }
    echo json_encode($data);
}

function delete_user_info($conn){
    extract($_POST);
    $data = array();
    $res_data = [];
    $query = "DELETE  FROM users WHERE id = '$id'";
    $result = $conn->query($query);
    if($result){
           $data = array("status"=>true,"Message"=>"deletedd...");
    }else{
        $data = array("status"=>false,"Message"=>$conn->error);
    }
    echo json_encode($data);
}


function update_user($conn){
    extract($_POST);
    $data = array();
     $newId = $update_id;
    $new_user_id = $newId . ".png"; 
    $target_file = "../uploads/" . $newId.".png";
    if(isset($_FILES['image']['name'])){
        
        if($_FILES['image']['error'] > 0){
            echo "There is" .$_FILES['image']['error'];
        }else{
             move_uploaded_file($_FILES['image']['tmp_name'],$target_file);
        }
    }else{
       
    }
    $query = "CALL users_sp('$update_id','$name','$username','$password','$Phone','$gender','$new_user_id','$date')";
    $result = $conn->query($query);
    if($result){
       $row = $result->fetch_assoc(); 
       if($row['Message'] == "Updated"){
        $data = array("status"=> true, "Message"=> "Updated Successfully");
       }
    }else{
       $data = array("status"=>false,"Message"=>$conn->error); 
    }
    echo  json_encode($data);
}

function genId($conn){
    $data = array();
    $res_data = [];
    $query = "SELECT `id` FROM `users` ORDER BY id DESC LIMIT 1";
    $result = $conn->query($query);
    if($result){
        $num_rows = $result->num_rows;
        if($num_rows > 0){
            $row = $result->fetch_assoc();

          $newId =  $row['id'];

          return ++$newId;

        //    $data = array("status"=>true,"Message"=>$res_data);
        }else{
        return "1";
        }
    }else{
         $data = array("status"=>false,"Message"=>$conn->error);
    }

    echo json_encode($data);


}




if(isset($action)){
    $action($conn);
}


?>