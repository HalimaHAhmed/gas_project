var $=jQuery.noConflict();
$(document).ready(function(){   
    $("#addcustomer").on('click', function (e) {
        $("#customersModal").modal('show');
        $("#btnSave").val("Save");
    });
    $("#close_modal").on('click', function (e) {
        $("#customersModal").modal('hide');
        $("#btnSave").val("Save");
    });
    
                       
     loadcustomerss();
    var btnAction = 'insert';
 
 
    $("#customersForm").on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData($("#customersForm")[0]);
        formData.append('action','register_customer');
        if(btnAction == "insert"){
            $.ajax({
                url: "../api/customers.php",
                method: "POST",
                dataType: "JSON",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    let status = data.status;
                    let message = data.Message;  
                        if (status == true) {
                            $("#customersModal").modal('hide');
                            $('#customerstable').DataTable().destroy();
                            loadcustomerss(); 
                            $("#customersForm")[0].reset();
                                Swal.fire({
                                    title:' Data Has been Saved Successfully',
                                    type:'success',
                                    showConfirmButton:false,
                                    timer:1500
                                })              
                            } else {
                                Swal.fire({
                                    title:'Error',
                                    type:'warning',
                                    showConfirmButton:false,
                                    // timer:2500
                                }) 
                            }   
                        },
                        error: function (data) {
                            console.log(data);
                            if (data.status == 200) {
                                Swal.fire({
                                    title:'Error',
                                    type:'warning',
                                    showConfirmButton:false,
                                    // timer:2500
                                }) 
                            } else {
                                Swal.fire({
                                    title:'Error',
                                    type:'warning',
                                    showConfirmButton:false,
                                    // timer:2500
                                }) 
                            }
                
                        }
                
                
                    })
               
                }else{
                    let formData = new FormData($("#customersForm")[0]);
                    formData.append('action','update_customer');
                    $.ajax({ 
                        url: "../api/customers.php",
                        method: "POST",
                        dataType: "JSON",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (formData) {
                            let status = formData.status;
                            let message = formData.Message;
                            if (status == true) {
                                $("#customersForm")[0].reset();
                                $("#customersModal").modal('hide');
                                $('#customerstable').DataTable().destroy();
                                loadcustomerss(); 
                                $("#submit_btn").val("Save");
                                btnAction = 'insert';
                                Swal.fire({
                                    title:'Updated Successfully',
                                    type:'success',
                                    
                                    showConfirmButton:false,
                                    timer:1500
                                }) 
                                $("#btnSave").val("Save");
                            } else {
                                Swal.fire({
                                    title:'Error',
                                    type:'warning',
                                    showConfirmButton:false,
                                    // timer:2500
                                }) 
                            }
                        },
                        error: function (data) {
                            console.log(data);
                            if (postData.status == 200) {
                                Swal.fire({
                                    title:'Error',
                                    type:'warning',
                                    showConfirmButton:false,
                                    // timer:2500
                                })
                            } else {
                                Swal.fire({
                                    title:'Error',
                                    type:'warning',
                                    showConfirmButton:false,
                                    // timer:2500
                                })
                            }
                
                        }
                    })
                }
   });
            
            
            


    function loadcustomerss() {
     $("#customerstable tbody").html('');
     let userData = {
         "action": "load_customer"
     }
     let tableBody = '';
     let tableHead = '';
     let html = '';
     $.ajax({
         url: "../api/customers.php",
         dataType: "JSON",
         method: "POST",
         data: userData,
         success: function (data) {
             let status = data.status;
             let message = data.Message;
             if (status == true) {
                 tableBody += '<tr>';   
                 message.forEach(function (element) {
                     for (singleElement in element) {
                         if(singleElement == 'Image'){
                             tableBody += `<td><image style="width:30px;height:30px;border-radius:50%;" src="../uploads/${element[singleElement]}"></td>`;
                         }else{
                             tableBody += `<td>${element[singleElement]}</td>`;
                         }
                     }
                     tableBody += `<td><a class=" btn-sm btn-info  edit_info" edit_id ="${element.id}"><i class="fa fa-edit text-white"></i></a> <a class="  btn-sm btn-danger  delete_info" delete_id ="${element.id}" ><i class="fa fa-trash text-white"></i></a></td>`;
 
                     tableBody += '</tr>';
                     // tableBody += `<td>${element['id']}</td>`;
 
                 });
                 $("#customerstable thead").append(tableHead);
                 $("#customerstable tbody").append(tableBody);
                 $('#customerstable').DataTable({
                       
                 });
 
             } else {
                 console.log(message);
             }
 
         },
         error: function (data) {
             console.log(data.responseText);
         }
 
 
     })
 
 
     }
 
 
    $("#customerstable").on('click', "a.delete_info", function (e) {
     let id = $(this).attr("delete_id");
     Swal.fire({
        title:"Are you sure to Delete?",
        type:"warning",
        showCancelButton:true,
        confirmButtonColor:"#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:"Yes , Delete it.",
    }).then((result)=>{
        if(result.value){
            deletecustomer(id);
           Swal.fire({
            title:'Deleted Successfully',
            type:'success',
            showConfirmButton:false,
            timer:1500
            })     
        }
    })
     });
     function deletecustomer(id) {
         let userData = {
             "action": "delete_customer",
             "id": id
         }
         let html = '';
         $.ajax({
             url: "../api/customers.php",
             dataType: "JSON",
             method: "POST",
             data: userData,
             success: function (data) {
                 let status = data.status;
                 let message = data.Message;
                 if (status == true) {   
                        $('#customerstable').DataTable().destroy();
                        loadcustomerss();
                 } else {
                     console.log(message);
                 }   
             },
             error: function (data) {
                 console.log(data.responseText);
             }
         })
     }

   
    $("#customerstable").on('click',"a.edit_info",function(e){
    let id=$(this).attr("edit_id");
    fetch_customer(id);
    })

    function fetch_customer(id) {
    let userData = {
    "action": "fetch_customers",
    "id": id
     }
    let html = '';
    $.ajax({
        url: "../api/customers.php",
        dataType: "JSON",
        method: "POST",
        data: userData,
        success: function (data) {
            let status = data.status;
            let message = data.Message;
            if (status == true) {
                message.forEach(function (element) {
                    btnAction = "Update";
                    $("#update_id").val(element['id']);
                    $('#name').val(element['name']);
                    $('#District').val(element['district']);
                    $("#gender").val(element['gender']);
                    $("#email").val(element['email']);
                    $("#Phone").val(element['phone']);
                    $("#village").val(element['village']);
                    $("#phone").val(element['phone']);

                    $("#btnSave").val("Update Info");
                    $("#customersModal").modal('show');
                });
            } else {
                console.log(message);
            }
        },
        error: function (data) {
            console.log(data.responseText);
        }
    })
    }
 
});