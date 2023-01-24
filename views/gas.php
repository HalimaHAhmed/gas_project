<?php
include("header.php");
include("sidebar.php");

?>
<div class="breadcrumbs">
    <div class="col-sm-4">
        <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Gas</h1>
                    </div>
        </div>
    </div>
    <div class="col-sm-8">
        <div class="page-header float-right">
            <div class="page-title">
                <ol class="breadcrumb text-right">
                    <button type="button" class="btn btn-secondary " id="addgas" data-toggle="modal" data-target="#mediumModal">
                        <i class="fa fa-user"></i>&nbsp; Add Gas
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
                                <table id="gastable" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Price</th>
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
<div class="modal fade" id="gasModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel"         aria-hidden="true">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="mediumModalLabel">Gas Modal</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form action="" id="gasForm">
                                <input type="hidden"name="update_id"id="update_id">
                                <input type="text" id="type" name="type" placeholder="Gas Type" class="form-control"><br>
                                   <input type="text" id="price" name="price" placeholder="Price" class="form-control"><br>
                                                 
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
 <script src="../js/gas.js"></script>

