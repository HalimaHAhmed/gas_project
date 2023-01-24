<?php
include("header.php");
include("sidebar.php");

?>
<div class="breadcrumbs">
    <div class="col-sm-4">
        <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Users</h1>
                    </div>
        </div>
    </div>
    <div class="col-sm-8">
        <div class="page-header float-right">
            <div class="page-title">
                <ol class="breadcrumb text-right">
                    <button type="button" class="btn btn-secondary " id="adduser" data-toggle="modal" data-target="#mediumModal">
                        <i class="fa fa-user"></i>&nbsp; Add User
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
                                <table id="userstable" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Full name</th>
                                        <th>Usename</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Date</th>
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
<div class="modal fade" id="usersModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel"         aria-hidden="true">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="mediumModalLabel">Users Modal</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form action="" id="usersForm" enctype="multipart/form-data">
                                <input type="hidden"name="update_id"id="update_id">
                                <input type="text" id="name" name="name" placeholder="Fullname" class="form-control"><br>
                                   <input type="text" id="username" name="username" placeholder="Username" class="form-control"><br>
                                    <input type="password" id="password" name="password" placeholder="Password" class="form-control"><br>
                                    <input type="text" id="Phone" name="Phone" placeholder="Phone" class="form-control"><br>
                                    <select name="gender" id="gender" required="" class="form-control">
                                                        <option value="0">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                         <option value="Female">Female</option>
                                                     </select><br>
                                    <input type="date" id="date" name="date" placeholder="Date" class="form-control"><br>
                                    <div class="custom-file">
                                        <input type="file" class="form-control" id="customFile" name="image" required=true >
                                        <label class="custom-file-label" for="customFile">Choose Image</label>
                                    </div>
                                                 
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
 <script src="../js/users.js"></script>

