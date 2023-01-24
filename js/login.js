var $=jQuery.noConflict();
$("#loginForm").on('submit',function(e){
    e.preventDefault();
    let username=$("#username").val();
    let password=$("#password").val();
    let postData={
        "action":"login",
        "username":username,
        "password":password
    }
    $.ajax({
        url:"../api/login.php",
        method:"POST",
        dataType:"JSON",
        data:postData,
        success:function(data){
            let status=data.status;
            let Message =data.Message;
            if(status==true){
            window.location.href="../views/home.php"
            }else{
                Swal.fire({
                    title:Message,
                    type:'warning',
                    showConfirmButton:true,
                })
            }
        },
        error:function(data){

        }
    })
});