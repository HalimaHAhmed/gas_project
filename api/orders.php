<?php

header("Content-Type: application/json");
include('conn.php');


if(isset($_POST['action'])){
    $action = $_POST['action'];
}else{
    echo "He heey error";
}

function register_order($conn){
    extract($_POST);
    $data = array();
    $query = "CALL orders_sp('','$name','$Phone','$District','$village','$type','$price')";
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

function fill_gas($conn){
    $data = array();
    $res_data = [];
    $query = "SELECT * FROM gas";
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
function fetch_gasPrice($conn){
    extract($_POST);
    $data=array();
    $res_data=[];
    $query="select * from gas where type='$type'";
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

function fetch_orders($conn){
    extract($_POST);
    $data=array();
    $res_data=[];
    $query="select * from orders where id='$id'";
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


function load_orders($conn){
    $data = array();
    $res_data = [];
    $query = "SELECT  * FROM orders";
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

function delete_order($conn){
    extract($_POST);
    $data = array();
    $res_data = [];
    $query = "DELETE  FROM orders WHERE id = '$id'";
    $result = $conn->query($query);
    if($result){
           $data = array("status"=>true,"Message"=>"deletedd...");
    }else{
        $data = array("status"=>false,"Message"=>$conn->error);
    }
    echo json_encode($data);
}


function update_order($conn){
    extract($_POST);
    $data = array();
    $query = "CALL orders_sp('$update_id','$name','$Phone','$District','$village','$type','$price')";
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