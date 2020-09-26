let albumId = 0;

function GetAllAlbums() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>عنوان آلبوم</th>
                    <th>فعال / غیرفعال</th>
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
        url: "/api/Album/GetAllAlbums",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
        

            jQuery.each(response, function (i, item) {


                let checked = '';
                if (item.isActive) {

                    checked = 'checked';
                }
                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${item.title}</td>
                            <td><input type="checkbox" ${checked} id="CheckAlbum${item.albumId}" onclick="ChangeStatus(${item.albumId})" ></td>
                            <td>${item.albumImage.length}</td>
                            <td class="tdTextCenter"><span class="UploadImage" albumId="${item.albumId}" ><i class="fa fa-upload text text-primary"></i></span></td>
                            <td class="tdTextCenter"><span class="Detail" albumId="${item.albumId}" ><i class="fa fa-search text text-success"></i></span></td>
                            <td class="tdTextCenter"><span class="Edit" albumId="${item.albumId}" ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" albumId="${item.albumId}" ><i class="fa fa-trash text text-danger"></i></span></td>
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

function AddAlbum() {


    var myfile = $("#CoverInputFile");

    var formData = new FormData();



    formData.append('ImageFile', myfile[0].files[0]);


    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: `/api/Album/AddAlbum?title=${$('#txtTitle').val()}`,
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();
            GetAllAlbums();
            $('#txtTitle').val('');
            $('#InsertModal').modal('hide');

            Swal.fire(
                'ثبت شد !',
                'آلبوم با موفقیت ثبت شد',
                'success'
            );
            $('#CoverInputFile').val('');
            $('.custom-file-label').text('انتخاب تصویر');
            GetAllAlbums();
            $('#txtTitle').val('');
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

function ChangeStatus(albumId) {


    jQuery.ajax({
        type: "Put",
        url: "/api/Album/ChangAlbumStatus?albumId=" + albumId,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            Swal.fire(
                'ثبت شد !',
                'وضعیت آلبوم با موفقیت تغییر یافت',
                'success'
            );
            GetAllAlbums();
        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}

function UploadImage() {


    var SmallFile = $("#SmallInputFile");
    var BigFile = $("#BigInputFile");



    var formData = new FormData();



    formData.append('SmallFile', SmallFile[0].files[0]);
    formData.append('BigFile', BigFile[0].files[0]);


    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: `/api/Album/UploadImage?albumId=${albumId}&Title=${$('#txtOnvanZirTasvir').val()}&Desc=${$('#txtTozihatTasvir').val()}`,
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();
            $('#ImageModal').modal('hide');
            Swal.fire(
                'ثبت شد !',
                'تصویر با موفقیت ثبت شد',
                'success'
            );

            GetAllAlbums();


            $('#txtZirOnvanTasvir').val('');
            $('#txtTozihatTasvir').val('');
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

function DeleteAlbum() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/Album/DeleteAlbum?albumId=" + albumId,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'آلبوم مورد نظر حذف شد',
                'success'
            );
            GetAllAlbums();
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

function ViewDetails() {

    ShowLoader();
    let Html = '';
    jQuery.ajax({
        type: "Get",
        url: `/api/Album/GetAlbumById?albumId=${albumId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            if (response.albumImage.length > 0) {
                $('#RemoveImage').attr('ImageId', response.albumImage[0].albumImageId);
                $('.MainImage').attr('src', response.albumImage[0].bigImageFile);
                $('#imgTitle').text(response.albumImage[0].title);
                $('.ImageList').show();
            }
            else {
                $('#RemoveImage').hide();
                $('.ImageList').hide();
            }


            $('#lbltitle').html(response.title);
            $('#CoverImage').attr('src', response.coverImage);

            jQuery.each(response.albumImage, function (i, item) {


                Html += `<img src="${item.bigImageFile}" alt="${item.title} " id="${item.albumImageId}" class="img-thumbnail Sahandthumb mx-auto">`;
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
        url: "/api/Album/DeleteImage?albumImageId=" + ImageId,
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
    GetAllAlbums();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        NewsId = 0;
        $('#txtTitle').val('');
        $('#InsertModal').modal();
    });

    $(document.body).on('click', '#btnSabt', (e) => {


        let textalert = "";

        if ($('#CoverInputFile').val().length === 0) {
            textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        }
        else if ($('#txtTitle').val().length === 0) {
            textalert += "عنوان آلبوم را وارد نمایید";
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {

            AddAlbum();
        }

    });

    $(document.body).on('click', '.UploadImage', (e) => {


        albumId = parseInt($(e.currentTarget).attr('albumId'));
        $('#txtOnvanZirTasvir').val('');
        $('#txtTozihatTasvir').val('');
        $('#SmallInputFile').val('');
        $('#BigInputFile').val('');
        $('.custom-file-label').text('انتخاب تصویر');
        $('#ImageModal').modal();


    });

    $(document.body).on('click', '#btnSabtTasvir', (e) => {


        let textalert = "";

        if ($('#BigInputFile').val().length === 0) {
            textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        }
        else if ($('#SmallInputFile').val().length === 0) {
            textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        }
        else if ($('#txtOnvanZirTasvir').val().length === 0) {
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

        albumId = parseInt($(this).attr('albumId'));

        Swal.fire({
            title: 'آیا اطمینان دارید؟',
            text: "بعد از حذف امکان بازگردانی وجود ندارد و کلیه عکس های آلبوم حذف خواهد شد!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'خیر',
            confirmButtonText: 'بله !'
        }).then((result) => {
            if (result.value) {
                DeleteAlbum();
            }
        });


    });

    $(document.body).on('click', '.Detail', function () {

        albumId = parseInt($(this).attr('albumId'));

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

        GetAllAlbums();
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