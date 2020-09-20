
let Id = 0;
let modalId = $('#image-gallery');

function GetAllCertificate() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>عنوان</th>
                    <th>توضیحات</th>
                    <th>تصویر</th>
                    <th>مشاهده جزئیات</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;


    jQuery.ajax({
        type: "Get",
        url: "/api/Certificate/GetAllCertificate",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {
                debugger;
                let desc = '';
                if (item.description != null) {
                if (item.description.length > 200) {

                    for (var j = 200; j < item.description.length; j++) {

                        if (item.description.charAt(j) === " ") {
                            desc = item.description.substr(0, j) + " ...";
                            j = item.description.length;
                        }
                    }
                } else {
                    desc = item.description;
                    }
                }


                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${item.title}</td>
                            <td>${desc}</td>
                            <td style="min-width: 100px;"><img src = "${item.fileImage}" alt = "${item.title} " id = "${item.id}" class="img-thumbnail Sahandthumb mx-auto" /></td>
                            <td class="tdTextCenter"><span class="Detail" ServicesId="${item.id}" ><i class="fa fa-search text text-success"></i></span></td>
                            <td class="tdTextCenter"><span class="Edit" ServicesId="${item.id}" ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" ServicesId="${item.id}" ><i class="fa fa-trash text text-danger"></i></span></td>
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

function AddCertificate() {



    var myfile = $("#exampleInputFile");
    var formData = new FormData();
    formData.append('ImageFile', myfile[0].files[0]);

    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Certificate/AddCertificate?title=" + $('#txtTitle').val() + "&desc=" + $('#txtTozihat').val(),
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'گواهینامه با موفقیت ثبت شد',
                'success'
            );

            GetAllCertificate();


            $('#txtTitle').val('');
            $('#txtTozihat').val('');
            $('#InsertModal').modal('hide');


        },
        error: function (response) {

            console.log(response);
            EndLoader();

        },
        complete: function () {

        }
    });
}

function DeleteCertificate() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/Certificate/DeleteCertificate?id=" + Id,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllCertificate();
            EndLoader();
        },
        error: function (response) {

            console.log(response);
            EndLoader();

        },
        complete: function () {



        }
    });
}

function GetCertificateById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Certificate/GetCertificateById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            $('#txtTitle').val(response.title);
            $('#txtTozihat').val(response.description);
            $('#InsertModal').modal();

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {
            EndLoader();

        }
    });
}

function UpdateCertificate() {

    var myfile = $("#exampleInputFile");
    var formData = new FormData();
    formData.append('ImageFile', myfile[0].files[0]);


    jQuery.ajax({
        type: "Post",
        url: "/api/Certificate/UpdateCertificate?id=" + Id + "&title=" + $('#txtTitle').val() + "&desc=" + $('#txtTozihat').val(),
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            Swal.fire(
                'بروز رسانی شد !',
                'گواهینامه با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllCertificate();

            Id = 0;
            $('#txtTitle').val('');
            $('#txtTozihat').val('');
            $('#exampleInputFile').val('');
            $('.custom-file-label').text('انتخاب تصویر');
            $('#InsertModal').modal('hide');


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}

function ViewDetails() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Certificate/GetCertificateById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            if (response.fileImage.length > 0) {
                $('.MainImage').attr('src', response.fileImage);
                $('.ImageList').show();
                $('#RemoveImage').hide();
            }
            else {

                $('.ImageList').hide();
            }

            $('#lbltitle').html(response.title);
            $('#lblTozihat').html(response.description);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {
            EndLoader();

        }
    });
}



$(document).ready(() => {

    ShowLoader();
    GetAllCertificate();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        Id = 0;
        $('#txtTitle').val('');
        $('#txtTozihat').val('');
        $('#exampleInputFile').val('');
        $('.custom-file-label').text('انتخاب تصویر');
        $('#InsertModal').modal();
    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        if ($('#txtTitle').val().length === 0) {
            textalert += `عنوان را وارد نمایید`;
        }
        else if ($('#exampleInputFile').val().length === 0 && Id === 0) {
            textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        }


        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (Id === 0) {
                AddCertificate();
            } else {
                UpdateCertificate();
            }

        }


    });

    $(document.body).on('click', '.Trash', function () {

        Id = parseInt($(this).attr('ServicesId'));

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
                DeleteCertificate();
            }
        });


    });

    $(document.body).on('change', '#exampleInputFile', function () {


        if ($(this).val() == '') {
            $('.custom-file-label').text('انتخاب تصویر');
        }
        else {
            var myfile = $("#exampleInputFile");

            $('.custom-file-label').text(myfile[0].files[0].name);

        }


    });

    $(document.body).on('click', '.Edit', function () {

        Id = parseInt($(this).attr('ServicesId'));

        GetCertificateById();

    });


    $(document.body).on('click', '.Detail', function () {

        Id = parseInt($(this).attr('ServicesId'));

        ViewDetails();
        $('#pnlJoziyat').show();
        $('#PnlList').hide();

    });

    $(document.body).on('click', '.btnClose', function () {

        GetAllCertificate();
        $('#pnlJoziyat').hide();
        $('#PnlList').show();

    });


});
