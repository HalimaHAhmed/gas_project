var $=jQuery.noConflict();
$(document).ready(function(){   
    $("#addemp").on('click', function (e) {
        $("#empmodel").modal('show');
        $("#btnSave").val("Save");
    });
    $("#close_modal").on('click', function (e) {
        $("#empmodel").modal('hide');
        $("#btnSave").val("Save");
    });
    
                       
     loademp();
    var btnAction = 'insert';
 
 
    $("#employeeForm").on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData($("#employeeForm")[0]);
        formData.append('action','register_emp');
        if(btnAction == "insert"){
            $.ajax({
                url: "../api/employe.php",
                method: "POST",
                dataType: "JSON",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    let status = data.status;
                    let message = data.Message;  
                        if (status == true) {
                            $("#empmodel").modal('hide');
                            $('#emptable').DataTable().destroy();
                            loademp(); 
                            $("#employeeForm")[0].reset();
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
                    let formData = new FormData($("#employeeForm")[0]);
                    formData.append('action','update_emp');
                    $.ajax({ 
                        url: "../api/employe.php",
                        method: "POST",
                        dataType: "JSON",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (formData) {
                            let status = formData.status;
                            let message = formData.Message;
                            if (status == true) {
                                $("#employeeForm")[0].reset();
                                $("#empmodel").modal('hide');
                                $('#emptable').DataTable().destroy();
                                loademp(); 
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
            
            
            


    function loademp() {
     $("#emptable tbody").html('');
     let userData = {
         "action": "load_emp"
     }
     let tableBody = '';
     let tableHead = '';
     let html = '';
     $.ajax({
         url: "../api/employe.php",
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
                 $("#emptable thead").append(tableHead);
                 $("#emptable tbody").append(tableBody);
                 $('#emptable').DataTable({
                       
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
 
 
    $("#emptable").on('click', "a.delete_info", function (e) {
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
            delete_employee(id);
           Swal.fire({
            title:'Deleted Successfully',
            type:'success',
            showConfirmButton:false,
            timer:1500
            })     
        }
    })
     });
     function delete_employee(id) {
         let userData = {
             "action": "delete_employee",
             "id": id
         }
         let html = '';
         $.ajax({
             url: "../api/employe.php",
             dataType: "JSON",
             method: "POST",
             data: userData,
             success: function (data) {
                 let status = data.status;
                 let message = data.Message;
                 if (status == true) {   
                        $('#emptable').DataTable().destroy();
                        loademp();
                 } else {
                     console.log(message);
                 }   
             },
             error: function (data) {
                 console.log(data.responseText);
             }
         })
     }

   
    $("#emptable").on('click',"a.edit_info",function(e){
    let id=$(this).attr("edit_id");
    fech_emp(id);
    })

    function fech_emp(id) {
    let userData = {
    "action": "fetch_emp",
    "id": id
     }
    let html = '';
    $.ajax({
        url: "../api/employe.php",
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
                    $('#Address').val(element['address']);
                    $("#gender").val(element['gender']);
                    $("#salary").val(element['salary']);
                    $("#Phone").val(element['phone']);
                    

                    $("#btnSave").val("Update Info");
                    $("#empmodel").modal('show');
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