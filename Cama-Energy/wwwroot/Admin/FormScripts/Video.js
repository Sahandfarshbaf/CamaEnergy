
let Id = 0;
let modalId = $('#image-gallery');

function GetAllVideo() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>نام</th>
                    <th>عنوان</th>
                    <th>توضیحات</th>
                    <th>مشاهده جزئیات</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;


    jQuery.ajax({
        type: "Get",
        url: "/api/Video/GetAllVideo",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {
                debugger;
                let desc = '';
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


                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${item.name}</td>
                            <td>${item.title}</td>
                            <td>${desc}</td>
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

function AddVideo() {



    var myfile = $("#exampleInputFile");
    var formData = new FormData();
    formData.append('ImageFile', myfile[0].files[0]);

    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Video/AddVideo?name=" + $('#txtName').val() + "&title=" + $('#txtTitle').val() + "&desc=" + $('#txtTozihat').val(),
        data: formData,
        async:false,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'ویدئو با موفقیت ثبت شد',
                'success'
            );

            GetAllVideo();


            $('#txtName').val('');
            $('#txtTitle').val('');
            $('#txtTozihat').val('');
            $('#InsertModal').modal('hide');


        },
        error: function (response) {

            let textalert = response.responseText;
            Swal.fire({
                icon: 'error',
                title: 'خطا در ثبت !',
                text: textalert

            });
            EndLoader();

        },
        complete: function () {

        }
    });
}

function DeleteVideo() {

    ShowLoader();

    jQuery.ajax({
        type: "GET",
        url: "/api/Video/DeleteVideo?id=" + Id,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllVideo();
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

function GetVideoById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Video/GetVideoById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $('#txtName').val(response.name);
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

function UpdateVideo() {

    var myfile = $("#exampleInputFile");
    var formData = new FormData();
    formData.append('ImageFile', myfile[0].files[0]);


    jQuery.ajax({
        type: "Post",
        url: "/api/Video/UpdateVideo?id=" + Id + "&name=" + $('#txtName').val() + "&title=" + $('#txtTitle').val() + "&desc=" + $('#txtTozihat').val(),
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            Swal.fire(
                'بروز رسانی شد !',
                'ویدئو با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllVideo();

            Id = 0;
            $('#txtName').val('');
            $('#txtTitle').val('');
            $('#txtTozihat').val('');
            $('#exampleInputFile').val('');
            $('.custom-file-label').text('انتخاب ویدئو');
            $('#InsertModal').modal('hide');


        },
        error: function (response) {

            let textalert = response.responseText;
            Swal.fire({
                icon: 'error',
                title: 'خطا در ثبت !',
                text: textalert

            });

        },
        complete: function () {

        }
    });
}

function ViewDetails() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Video/GetVideoById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {



            $('.btnDownload').attr('srcc', response.fileLocation);
            $('#lblnam').html(response.name);
            $('#lbltitle').html(response.title);
            $('#lblTozihat').html(response.description);
            $('#Video').attr('src', response.fileLocation);

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
    GetAllVideo();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        Id = 0;
        $('#txtName').val('');
        $('#txtTitle').val('');
        $('#txtTozihat').val('');
        $('#exampleInputFile').val('');
        $('.custom-file-label').text('انتخاب ویدئو');
        $('#InsertModal').modal();
    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";
        if ($('#txtName').val().length === 0) {
            textalert += `نام را وارد نمایید`;
        }
        else if ($('#txtTitle').val().length === 0) {
            textalert += `عنوان را وارد نمایید`;
        }
        else if ($('#exampleInputFile').val().length === 0 && Id === 0) {
            textalert += `ویدئو جهت بارگذاری انتخاب نشده است !`;
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
                AddVideo();
            } else {
                UpdateVideo();
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
                DeleteVideo();
            }
        });


    });

    $(document.body).on('change', '#exampleInputFile', function () {


        if ($(this).val() == '') {
            $('.custom-file-label').text('انتخاب ویدئو');
        }
        else {
            var myfile = $("#exampleInputFile");

            $('.custom-file-label').text(myfile[0].files[0].name);

        }


    });

    $(document.body).on('click', '.Edit', function () {

        Id = parseInt($(this).attr('ServicesId'));
        $('.custom-file-label').text('انتخاب ویدئو');

        GetVideoById();

    });


    $(document.body).on('click', '.Detail', function () {

        Id = parseInt($(this).attr('ServicesId'));

        ViewDetails();
        $('#pnlJoziyat').show();
        $('#PnlList').hide();

    });

    $(document.body).on('click', '.btnClose', function () {

        GetAllVideo();
        $('#pnlJoziyat').hide();
        $('#PnlList').show();
        $('#Video').attr('src', '');

    });
    $(document.body).on('click', '.btnDownload', function () {


        let url = $(this).attr('srcc');
        window.open(url);

    });

});
