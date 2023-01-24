<?php
include("header.php");
include("sidebar.php");

?>
<div class="breadcrumbs">
    <div class="col-sm-4">
        <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Customers</h1>
                    </div>
        </div>
    </div>
    <div class="col-sm-8">
        <div class="page-header float-right">
            <div class="page-title">
                <ol class="breadcrumb text-right">
                    <button type="button" class="btn btn-secondary " id="addcustomer" data-toggle="modal" data-target="#mediumModal">
                        <i class="fa fa-user"></i>&nbsp; Add Customer
                    </button>
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Data Table</strong>
                            </div>
                            <div class="card-body">
                                <table id="customerstable" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Full name</th>
                                        <th>District</th>
                                        <th>VIllage</th>
                                        <th>Date</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div><!-- .animated -->
</div><!-- .content -->


<!-- modal -->
<div class="modal fade" id="customersModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel"         aria-hidden="true">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="mediumModalLabel">Customers Modal</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form action="" id="customersForm">
                                <input type="hidden"name="update_id"id="update_id">
                                <input type="text" id="name" name="name" placeholder="Fullname" class="form-control"><br>
                                   <input type="text" id="District" name="District" placeholder="District" class="form-control"><br>
                                   <input type="text" id="village" name="village" placeholder="Village" class="form-control"><br>
                                    <input type="text" id="Phone" name="Phone" placeholder="Phone" class="form-control"><br>
                                    <select name="gender" id="gender" required="" class="form-control">
                                                        <option value="0">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                         <option value="Female">Female</option>
                                    </select><br>
                                    <input type="email" id="email" name="email" placeholder="Email" class="form-control"><br>
                                                 
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <input type="submit" value="Save" class="btn btn-success" id="btnSave">
                            </div>
                        </form>  
                        </div>
                    </div>
                </div>



               
<?php

include("footer.php");
?>
 <script src="../js/customers.js"></script>

