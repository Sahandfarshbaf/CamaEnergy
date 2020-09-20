
let EmployeId = 0;

function GetAllEmploye() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>نام</th>
                    <th>مهارت</th>
                    <th>درجه</th>
                    <th>توضیحات</th>
                    <th>تصویر</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;


    jQuery.ajax({
        type: "Get",
        url: "/api/Employe/GetAllEmploye",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {
                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${item.name}</td>
                            <td>${item.skills}</td>
                            <td>${item.degree}</td>
                            <td>${item.description}</td>
                            <td class="text-center"><img src="${item.imageFile}" class="img-thumbnail" style="width:75px;height:75px;"  /></td>
                            <td class="tdTextCenter"><span class="Edit" EmployeId="${item.id}" ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" EmployeId="${item.id}" ><i class="fa fa-trash text text-danger"></i></span></td>
                       </tr>`;
            });

            Html += `</tbody></table>`;

            $('.TblList').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

            $("#example2").DataTable({
                "language": {
                    "decimal": "",
                    "emptyTable": "رکوردی برای نمایش وجود ندارد.",
                    "info": "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
                    "infoEmpty": "نمایش 0 تا 0 از 0 رکورد",
                    "infoFiltered": "(فیلتر شده از _MAX_ رکورد)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "نمایش _MENU_ رکورد",
                    "loadingRecords": "Loading...",
                    "processing": "Processing...",
                    "search": "جستجو:",
                    "zeroRecords": "رکوردی یافت نشد",
                    "paginate": {
                        "next": "بعدی",
                        "previous": "قبلی"
                    }
                },
                "info": false,
                "lengthChange": false
            });


        }
    });
}

function DeleteEmploye() {


    jQuery.ajax({
        type: "Delete",
        url: "/api/Employe/DeleteEmploye?EmployeId=" + EmployeId,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllEmploye();
        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}

function InsertEmploye() {

    let Employe = {
        Id: 0,
        Name: $('#txtName').val(),
        Skills: $('#txtSkill').val(),
        Degree: $('#txtDegree').val(),
        Description: $('#txtTozihat').val()
    }

    var myfile = $("#exampleInputFile");
    console.log(myfile);

    var formData = new FormData();



    formData.append('ImageFile', myfile[0].files[0]);
    formData.append('Employee', JSON.stringify(Employe))


    jQuery.ajax({
        type: "Post",
        url: "/api/Employe/InsertEmploye",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            Swal.fire(
                'ثبت شد !',
                'همکار با موفقیت ثبت شد',
                'success'
            );
            GetAllEmploye();
            $('#txtName').val('');
            $('#txtSkill').val('');
            $('#txtDegree').val('');
            $('#txtTozihat').val('');
            $('#exampleModal').modal('hide');


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}

function GetEmployeById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Employe/GetEmployeById?EmployeId=${EmployeId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            $('#txtName').val(response.name);
            $('#txtSkill').val(response.skills);
            $('#txtDegree').val(response.degree);
            $('#txtTozihat').val(response.description);
            $('#exampleModal').modal();

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {
            EndLoader();

        }
    });
}

function UpdateEmploye() {



    let Employe = {
        Id: EmployeId,
        Name: $('#txtName').val(),
        Skills: $('#txtSkill').val(),
        Degree: $('#txtDegree').val(),
        Description: $('#txtTozihat').val()
    }

    var myfile = $("#exampleInputFile");

    var formData = new FormData();



    formData.append('ImageFile', myfile[0].files[0]);
    formData.append('Employee', JSON.stringify(Employe))


    jQuery.ajax({
        type: "Put",
        url: "/api/Employe/UpdateEmploye",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            Swal.fire(
                'بروز رسانی شد !',
                'همکار با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllEmploye();
            $('#txtName').val('');
            $('#txtSkill').val('');
            $('#txtDegree').val('');
            $('#txtTozihat').val('');
            $('#exampleModal').modal('hide');


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}


$(document).ready(() => {

    ShowLoader();
    GetAllEmploye();
    EndLoader();

    $(document.body).on('click', '.Trash', function () {

        EmployeId = parseInt($(this).attr('EmployeId'));

        Swal.fire({
            title: 'آیا اطمینان دارید؟',
            text: "بعد از حذف امکان بازگردانی وجود ندارد!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'خیر',
            confirmButtonText: 'بله !'
        }).then((result) => {
            if (result.value) {
                DeleteEmploye();
            }
        });


    });

    $(document.body).on('click', '#btnJadid', function () {

        EmployeId = 0;
        $('#txtName').val('');
        $('#txtSkill').val('');
        $('#txtDegree').val('');
        $('#txtTozihat').val('');
        $('#exampleModal').modal();
    });

    $(document.body).on('click', '.Edit', function () {

        EmployeId = parseInt($(this).attr('EmployeId'));

        GetEmployeById();

    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        if ($('#txtName').val().length === 0) {
            textalert += `نام را وارد نمایید`;
        }
        else if ($('#txtSkill').val().length === 0) {
            textalert += "مهارت را وارد نمایید";
        }
        else if ($('#txtDegree').val().length === 0) {
            textalert += "درجه را وارد نمایید";
        };

        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (EmployeId === 0) {
                InsertEmploye();
            } else {
                UpdateEmploye();
            }

        }


    });


});


