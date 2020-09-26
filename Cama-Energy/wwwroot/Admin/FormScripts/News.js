
let NewsId = 0;
let modalId = $('#image-gallery');

function GetAllNews() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>نوع خبر</th>
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
        url: "/api/News/GetAllNews",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {
             
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
                let newsType = 0;
                if (item.type == 1) {

                    newsType = 'اخبار روز';
                }
                else {
                    newsType = 'اخبار کاما';
                }


                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${newsType}</td>
                            <td>${item.title}</td>
                            <td>${desc}</td>
                            <td>${item.newsImage.length}</td>
                            <td class="tdTextCenter"><span class="UploadImage" NewsId="${item.id}" ><i class="fa fa-upload text text-primary"></i></span></td>
                            <td class="tdTextCenter"><span class="Detail" NewsId="${item.id}" ><i class="fa fa-search text text-success"></i></span></td>
                            <td class="tdTextCenter"><span class="Edit" NewsId="${item.id}" ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" NewsId="${item.id}" ><i class="fa fa-trash text text-danger"></i></span></td>
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

function AddNews() {

    let news = {
        Id: 0,
        Type: parseInt($('#CmbType').val()),
        Title: $('#txtTitle').val(),
        Description: $('#txtTozihat').val()
    }
    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/News/AddNews",
        data: JSON.stringify(news),
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

            GetAllNews();

            $('#txtTitle').val('');
            $('#txtTozihat').val('');
            $('#CmbType').val(1);
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


    var formData = new FormData();



    formData.append('ImageFile', myfile[0].files[0]);


    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: `/api/News/UploadImage?NewsId=${NewsId}&Title=${$('#txtOnvanTasvir').val()}`,
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

            GetAllNews();


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

function DeleteNews() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/News/DeleteNews?NewsId=" + NewsId,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllNews();
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

function GetNewsById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/News/GetNewsById?NewsId=${NewsId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            $('#txtTitle').val(response.title);
            $('#CmbType').val(response.type);
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

function UpdateNews() {

    let news = {
        Id: NewsId,
        Type: parseInt($('#CmbType').val()),
        Title: $('#txtTitle').val(),
        Description: $('#txtTozihat').val()
    }


    jQuery.ajax({
        type: "Put",
        url: "/api/News/UpdateNews",
        data: JSON.stringify(news),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            Swal.fire(
                'بروز رسانی شد !',
                'خبر با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllNews();

            $('#txtTitle').val('');
            $('#CmbType').val(1);
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
        url: `/api/News/GetNewsById?NewsId=${NewsId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            if (response.newsImage.length > 0) {
                $('#RemoveImage').attr('ImageId', response.newsImage[0].id);
                $('.MainImage').attr('src', response.newsImage[0].fileImage);
                $('#imgTitle').text(response.newsImage[0].title);
                $('.ImageList').show();
            }
            else {
                $('#RemoveImage').hide();
                $('.ImageList').hide();
            }


            $('#lbltitle').html(response.title);
            $('#lblTozihat').html(response.description);

            jQuery.each(response.newsImage, function (i, item) {


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


    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/News/DeleteImage?Id=" + ImageId,
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
    GetAllNews();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        NewsId = 0;
        $('#txtTitle').val('');
        $('#txtTozihat').val('');
        $('#InsertModal').modal();
    });

    $(document.body).on('click', '.UploadImage', (e) => {


        NewsId = parseInt($(e.currentTarget).attr('NewsId'));
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


        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (NewsId === 0) {
                AddNews();
            } else {
                UpdateNews();
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

        NewsId = parseInt($(this).attr('NewsId'));

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
                DeleteNews();
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

        NewsId = parseInt($(this).attr('NewsId'));

        GetNewsById();

    });

    $(document.body).on('click', '.Detail', function () {

        NewsId = parseInt($(this).attr('NewsId'));

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

        GetAllNews();
        $('#pnlJoziyat').hide();
        $('#PnlList').show();

    });

    $(document.body).on('click', '#RemoveImage', function () {

        let ImageId = parseInt($(this).attr('ImageId'));
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