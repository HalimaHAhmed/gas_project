var $=jQuery.noConflict();
$(document).ready(function(){   
    $("#addOrders").on('click', function (e) {
        $("#ordersModal").modal('show');
        $("#btnSave").val("Save");
    });
    $("#close_modal").on('click', function (e) {
        $("#ordersModal").modal('hide');
        $("#btnSave").val("Save");
    });
    
                       
     loadOrders();
     fillGas();
    var btnAction = 'insert';
 
    $("#type").on('change',function(){
        let gastype=$("#type").val();
        fetch_gas_price(gastype);
    })
 

    $("#ordersOne").on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData($("#ordersOne")[0]);
        formData.append('action','register_order');
            $.ajax({
                url: "../api/orders.php",
                method: "POST",
                dataType: "JSON",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    let status = data.status;
                    let message = data.Message;  
                        if (status == true) {
                            $("#mediumModal").modal('hide');
                            // $('#ordersTable').DataTable().destroy();
                            loadOrders(); 
                            $("#ordersOne")[0].reset();
                                Swal.fire(
                                    'Successfully',
                                    ' Dalbkaga wuxu ku so gari donaa  Mahadsanid .numberkan ku dir lacagta :061551852 mahadsanid ',
                                    'success',
                                    // showConfirmButton:false,
                                  
                                )              
                            } else {
                                Swal.fire({
                                    title:'Error',
                                    type:'warning',
                                    showConfirmButton:false,
                                    // timer:2500
                                }) 
                            }   
                        },    
                    })       
   });


    $("#ordersForm").on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData($("#ordersForm")[0]);
        formData.append('action','register_order');
        if(btnAction == "insert"){
            $.ajax({
                url: "../api/orders.php",
                method: "POST",
                dataType: "JSON",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    let status = data.status;
                    let message = data.Message;  
                        if (status == true) {
                            $("#ordersModal").modal('hide');
                            $('#ordersTable').DataTable().destroy();
                            loadOrders(); 
                            $("#ordersForm")[0].reset();
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
                    let formData = new FormData($("#ordersForm")[0]);
                    formData.append('action','update_order');
                    $.ajax({ 
                        url: "../api/orders.php",
                        method: "POST",
                        dataType: "JSON",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (formData) {
                            let status = formData.status;
                            let message = formData.Message;
                            if (status == true) {
                                $("#ordersForm")[0].reset();
                                $("#ordersModal").modal('hide');
                                $('#ordersTable').DataTable().destroy();
                                loadOrders(); 
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
            
            

    function loadOrders() {
     $("#ordersTable tbody").html('');
     let userData = {
         "action": "load_orders"
     }
     let tableBody = '';
     let tableHead = '';
     let html = '';
     $.ajax({
         url: "../api/orders.php",
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
                 $("#ordersTable thead").append(tableHead);
                 $("#ordersTable tbody").append(tableBody);
                 $('#ordersTable').DataTable({
                       
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
     function fillGas() {
        let userData = {
            "action": "fill_gas"
        }
        let html = '';
        $.ajax({
            url: "../api/orders.php",
            dataType: "JSON",
            method: "POST",
            data: userData,
            success: function (data) {
                let status = data.status;
                let message = data.Message;
                if (status == true) {
                    html += `<option value="0">Select Gas Type</option>`;
                    message.forEach(function (element) {
                        html += `<option value="${element['type']}">${element['type']}</option>`;
                    });
                    $("#type").html(html);

                } else {
                    console.log(message);
                }
            },
            error: function (data) {
                console.log(data.responseText);
            }
        })
     }
 
    function fetch_gas_price(gastype) {
            let userData = {
            "action": "fetch_gasPrice",
            "type": gastype
             }
            let html = '';
            $.ajax({
                url: "../api/orders.php",
                dataType: "JSON",
                method: "POST",
                data: userData,
                success: function (data) {
                    let status = data.status;
                    let message = data.Message;
                    if (status == true) {
                        message.forEach(function (element) {
                            $("#price").val(element['price']);
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
         

    $("#ordersTable").on('click', "a.delete_info", function (e) {
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
            deleteOrder(id);
           Swal.fire({
            title:'Deleted Successfully',
            type:'success',
            showConfirmButton:false,
            timer:1500
            })     
        }
    })
     });
     function deleteOrder(id) {
         let userData = {
             "action": "delete_order",
             "id": id
         }
         let html = '';
         $.ajax({
             url: "../api/orders.php",
             dataType: "JSON",
             method: "POST",
             data: userData,
             success: function (data) {
                 let status = data.status;
                 let message = data.Message;
                 if (status == true) {   
                        $('#ordersTable').DataTable().destroy();
                        loadOrders();
                 } else {
                     console.log(message);
                 }   
             },
             error: function (data) {
                 console.log(data.responseText);
             }
         })
     }

   
    $("#ordersTable").on('click',"a.edit_info",function(e){
    let id=$(this).attr("edit_id");
    fetchOrders(id);
    })

    function fetchOrders(id) {
    let userData = {
    "action": "fetch_orders",
    "id": id
     }
    let html = '';
    $.ajax({
        url: "../api/orders.php",
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
                    $("#type").val(element['type']);
                    $("#price").val(element['price']);
                    $("#Phone").val(element['phone']);
                    $("#village").val(element['village']);

                    $("#btnSave").val("Update Info");
                    $("#ordersModal").modal('show');
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