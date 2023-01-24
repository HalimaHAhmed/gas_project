var $=jQuery.noConflict();
$(document).ready(function(){   
    $("#addgas").on('click', function (e) {
        $("#gasModal").modal('show');
        $("#btnSave").val("Save");
    });
    $("#close_modal").on('click', function (e) {
        $("#gasModal").modal('hide');
        $("#btnSave").val("Save");
    });
    
                       
     loadGas();
    var btnAction = 'insert';
 
 
    $("#gasForm").on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData($("#gasForm")[0]);
        formData.append('action','register_gas');
        if(btnAction == "insert"){
            $.ajax({
                url: "../api/gas.php",
                method: "POST",
                dataType: "JSON",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    let status = data.status;
                    let message = data.Message;  
                        if (status == true) {
                            $("#gasModal").modal('hide');
                            $('#gastable').DataTable().destroy();
                            loadGas(); 
                            $("#gasForm")[0].reset();
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
                    let formData = new FormData($("#gasForm")[0]);
                    formData.append('action','update_gas');
                    $.ajax({ 
                        url: "../api/gas.php",
                        method: "POST",
                        dataType: "JSON",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (formData) {
                            let status = formData.status;
                            let message = formData.Message;
                            if (status == true) {
                                $("#gasForm")[0].reset();
                                $("#gasModal").modal('hide');
                                $('#gastable').DataTable().destroy();
                                loadGas(); 
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
            
            
            

   function loadGas() {
    $('#gastable').DataTable().destroy();
    $("#gastable tbody").html('');
    let userData = {
        "action": "load_gas"
    }
    let tableBody = '';
    let tableHead = '';
    let html = '';
    $.ajax({
        url: "../api/gas.php",
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
                            tableBody += `<td>${element[singleElement]}</td>`;
                         }
                    tableBody += `<td><a class=" btn-round btn-sm btn-info  edit_info" title="Edit" edit_id ="${element.id}"><i class="fa fa-edit text-white"></i></a> <a class="btn btn-round btn-sm btn-danger delete_info" delete_id ="${element.id}" ><i class="fa fa-trash text-white"></i></a></td>`;

                    tableBody += '</tr>';

                });


                $("#gastable thead").append(tableHead);
                $("#gastable tbody").append(tableBody);
                $('#gastable').DataTable({
                      
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
 
    $("#gastable").on('click', "a.delete_info", function (e) {
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
            deleteGAs(id);
           Swal.fire({
            title:'Deleted Successfully',
            type:'success',
            showConfirmButton:false,
            timer:1500
            })     
        }
    })
     });
     function deleteGAs(id) {
         let userData = {
             "action": "delete_gas",
             "id": id
         }
         let html = '';
         $.ajax({
             url: "../api/gas.php",
             dataType: "JSON",
             method: "POST",
             data: userData,
             success: function (data) {
                 let status = data.status;
                 let message = data.Message;
                 if (status == true) {   
                        $('#gastable').DataTable().destroy();
                        loadGas();
                 } else {
                     console.log(message);
                 }   
             },
             error: function (data) {
                 console.log(data.responseText);
             }
         })
     }

   
    $("#gastable").on('click',"a.edit_info",function(e){
    let id=$(this).attr("edit_id");
    fetchGas(id);
    })

    function fetchGas(id) {
    let userData = {
    "action": "fetch_gas",
    "id": id
     }
    let html = '';
    $.ajax({
        url: "../api/gas.php",
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
                    $('#type').val(element['type']);
                    $('#price').val(element['price']);

                    $("#btnSave").val("Update Info");
                    $("#gasModal").modal('show');
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