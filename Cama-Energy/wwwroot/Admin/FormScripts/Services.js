
let ServicesId = 0;
let modalId = $('#image-gallery');

function GetAllServices() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>نام</th>
                    <th>عنوان</th>
                    <th>توضیحات</th>
                    <th>تعداد تصاویر</th>
                    <th>بارگذاری تصویر</th>
                    <th>مشاهده جزئیات</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;


    jQuery.ajax({
        type: "Get",
        url: "/api/Services/GetAllServices",
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
                            <td>${item.servicesImage.length}</td>
                            <td class="tdTextCenter"><span class="UploadImage" ServicesId="${item.id}" ><i class="fa fa-upload text text-primary"></i></span></td>
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

function InsertServices() {

    let Services = {
        Id: 0,
        Name: $('#txtName').val(),
        Title: $('#txtTitle').val(),
        Description: $('#txtTozihat').val()
    }
    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Services/InsertServices",
        data: JSON.stringify(Services),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'خدمت با موفقیت ثبت شد',
                'success'
            );

            GetAllServices();

            $('#txtName').val('');
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

function UploadImage() {


    var myfile = $("#exampleInputFile");
    console.log(myfile);

    var formData = new FormData();



    formData.append('ImageFile', myfile[0].files[0]);


    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: `/api/Services/UploadImage?ServicesId=${ServicesId}&Title=${$('#txtOnvanTasvir').val()}`,
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();
            $('#ImageModal').modal('hide');
            Swal.fire(
                'ثبت شد !',
                'خدمت با موفقیت ثبت شد',
                'success'
            );

            GetAllServices();

            $('#txtName').val('');
            $('#txtTitle').val('');
            $('#txtTozihat').val('');
            $('#InsertModal').modal('hide');


        },
        error: function (response) {


            EndLoader();
            let textalert = response.responseText;
            Swal.fire({
                icon: 'error',
                title: 'خطا در بازگذاری !',
                text: textalert

            });

        },
        complete: function () {

        }
    });
}

function DeleteService() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/Services/DeleteService?ServicesId=" + ServicesId,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllServices();
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

function GetServicesById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Services/GetServicesById?ServicesId=${ServicesId}`,
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

function UpdateService() {

    let Services = {
        Id: ServicesId,
        Name: $('#txtName').val(),
        Title: $('#txtTitle').val(),
        Description: $('#txtTozihat').val()
    }


    jQuery.ajax({
        type: "Put",
        url: "/api/Services/UpdateService",
        data: JSON.stringify(Services),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            Swal.fire(
                'بروز رسانی شد !',
                'خدمت با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllServices();
            $('#txtName').val('');
            $('#txtTitle').val('');
            $('#txtTozihat').val('');
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
    let Html = '';
    jQuery.ajax({
        type: "Get",
        url: `/api/Services/GetServicesById?ServicesId=${ServicesId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

           
            if (response.servicesImage.length > 0) {
                $('#RemoveImage').attr('ImageId', response.servicesImage[0].id);
                $('.MainImage').attr('src', response.servicesImage[0].fileImage);
                $('#imgTitle').text(response.servicesImage[0].title);
                $('.ImageList').show();
            }
            else {
                $('#RemoveImage').hide();
                $('.ImageList').hide();
            }

            $('#lblNam').html(response.name);
            $('#lbltitle').html(response.title);
            $('#lblTozihat').html(response.description);

            jQuery.each(response.servicesImage, function (i, item) {


                Html += `<img src="${item.fileImage}" alt="${item.title} " id="${item.id}" class="img-thumbnail Sahandthumb mx-auto">`;
            });

            jQuery('.ImageContainer').html(Html);
        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {
            EndLoader();

        }
    });
}

function DeleteImage(ImageId) {

    debugger 
    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/Services/DeleteImage?Id=" + ImageId,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'تصویر مورد نظر حذف شد',
                'success'
            );
            ViewDetails();
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


$(document).ready(() => {

    ShowLoader();
    GetAllServices();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        ServicesId = 0;
        $('#txtName').val('');
        $('#txtTitle').val('');
        $('#txtTozihat').val('');
        $('#InsertModal').modal();
    });

    $(document.body).on('click', '.UploadImage', (e) => {


        ServicesId = parseInt($(e.currentTarget).attr('ServicesId'));
        $('#txtOnvanTasvir').val('');
        $('#exampleInputFile').val('');
        $('.custom-file-label').text('انتخاب تصویر');
        $('#ImageModal').modal();


    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        if ($('#txtTitle').val().length === 0) {
            textalert += `عنوان را وارد نمایید`;
        }
        else if ($('#txtName').val().length === 0) {
            textalert += "نام را وارد نمایید";
        }

        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (ServicesId === 0) {
                InsertServices();
            } else {
                UpdateService();
            }

        }


    });

    $(document.body).on('click', '#btnSabtTasvir', (e) => {


        let textalert = "";

        if ($('#exampleInputFile').val().length === 0) {
            textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        }
        else if ($('#txtOnvanTasvir').val().length === 0) {
            textalert += "عنوان تصویر را وارد نمایید";
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {

            UploadImage();
        }

    });

    $(document.body).on('click', '.Trash', function () {

        ServicesId = parseInt($(this).attr('ServicesId'));

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
                DeleteService();
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

        ServicesId = parseInt($(this).attr('ServicesId'));

        GetServicesById();

    });

    $(document.body).on('click', '.Detail', function () {

        ServicesId = parseInt($(this).attr('ServicesId'));

        ViewDetails();
        $('#pnlJoziyat').show();
        $('#PnlList').hide();

    });

    $(document.body).on('click', '.Sahandthumb', function () {

        $('.MainImage').attr('src', $(this).attr('src'));
        $('#imgTitle').text($(this).attr('alt'));
        $('#RemoveImage').attr('ImageId', $(this).attr('ImageId'));

    });
    
    $(document.body).on('click', '.btnClose', function () {

        GetAllServices();
        $('#pnlJoziyat').hide();
        $('#PnlList').show();

    });

    $(document.body).on('click', '#RemoveImage', function () {

        let ImageId =parseInt($(this).attr('ImageId'));
        if (ImageId != NaN) {

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
                    DeleteImage(ImageId);
                }
            });

        }

    });


});
