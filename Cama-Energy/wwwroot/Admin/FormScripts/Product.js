
let ProductId = 0;
let modalId = $('#image-gallery');

function GetAllProducts() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>دسته بندی محصول</th>
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
        url: "/api/Products/GetAllProducts",
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

                var cat = "";
                switch (item.productCategoryId) {
                    case 11:
                        cat = "Vimar";
                        break;
                    case 12:
                        cat = "ABB";
                        break;
                    case 13:
                        cat = "Interra";
                        break;
                    case 14:
                        cat = "Orvibo";
                        break;
                    case 21:
                        cat = "GFR";
                        break;
                    case 22:
                        cat = "Netix";
                        break;
                    case 23:
                        cat = "Belimo";
                        break;
                    case 31:
                        cat = "Crestron";
                        break;
                    case 41:
                        cat = "Kef";
                        break;
                    case 42:
                        cat = "Yamaha";
                        break;
                    case 43:
                        cat = "B&W";
                        break;
                    case 44:
                        cat = "Epson";
                        break;

                }

                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${cat}</td>
                            <td>${item.name}</td>
                            <td>${desc}</td>
                            <td>${item.productsImage.length}</td>
                            <td class="tdTextCenter"><span class="UploadImage" ProductId="${item.id}" ><i class="fa fa-upload text text-primary"></i></span></td>
                            <td class="tdTextCenter"><span class="Detail" ProductId="${item.id}" ><i class="fa fa-search text text-success"></i></span></td>
                            <td class="tdTextCenter"><span class="Edit" ProductId="${item.id}" ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" ProductId="${item.id}" ><i class="fa fa-trash text text-danger"></i></span></td>
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

function InsertProducts() {

        let Products = {
        Id: 0,
        ProductCategoryId: parseInt($('#CmbType').val()),
        Name: $('#txtName').val(),
        Title: $('#txtTitle').val(),
        Description: $('#txtTozihat').val()
    }
    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Products/InsertProducts",
        data: JSON.stringify(Products),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'محصول با موفقیت ثبت شد',
                'success'
            );

            GetAllProducts();

            $('#txtName').val('');
            $('#CmbType').val(1);
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


    var formData = new FormData();



    formData.append('ImageFile', myfile[0].files[0]);


    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: `/api/Products/UploadImage?ProductId=${ProductId}&Title=${$('#txtOnvanTasvir').val()}`,
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

            GetAllProducts();

            $('#txtName').val('');
            $('#CmbType').val(1);

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

function DeleteProducts() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/Products/DeleteProducts?ProductId=" + ProductId,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllProducts();
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

function GetProductsById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Products/GetProductsById?ProductId=${ProductId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            $('#txtName').val(response.name);
            //  $('#txtTitle').val(response.title);
            $('#CmbType').val(response.productCategoryId);
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

function UpdateProducts() {


    let Products = {
        Id: ProductId,
        ProductCategoryId: parseInt($('#CmbType').val()),
        Name: $('#txtName').val(),
        Title: $('#txtTitle').val(),
        Description: $('#txtTozihat').val()
    }


    jQuery.ajax({
        type: "Put",
        url: "/api/Products/UpdateProducts",
        data: JSON.stringify(Products),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            Swal.fire(
                'بروز رسانی شد !',
                'محصول با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllProducts();
            $('#txtName').val('');
            $('#CmbType').val(1);

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
        url: `/api/Products/GetProductsById?ProductId=${ProductId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            if (response.productsImage.length > 0) {
                $('#RemoveImage').attr('ImageId', response.productsImage[0].id);
                $('.MainImage').attr('src', response.productsImage[0].fileImage);
                $('#imgTitle').text(response.productsImage[0].title);
                $('.ImageList').show();
            }
            else {
                $('#RemoveImage').hide();
                $('.ImageList').hide();
            }

            $('#lblNam').html(response.name);
            
            var cat = "";
            switch (response.productCategoryId) {
                case 11:
                    cat = "Vimar";
                    break;
                case 12:
                    cat = "ABB";
                    break;
                case 13:
                    cat = "Interra";
                    break;
                case 14:
                    cat = "Orvibo";
                    break;
                case 21:
                    cat = "GFR";
                    break;
                case 22:
                    cat = "Netix";
                    break;
                case 23:
                    cat = "Belimo";
                    break;
                case 31:
                    cat = "Crestron";
                    break;
                case 41:
                    cat = "Kef";
                    break;
                case 42:
                    cat = "Yamaha";
                    break;
                case 43:
                    cat = "B&W";
                    break;
                case 44:
                    cat = "Epson";
                    break;

            }

            $('#lbltitle').html(cat);
            $('#lblTozihat').html(response.description);

            jQuery.each(response.productsImage, function (i, item) {


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
        url: "/api/Products/DeleteImage?Id=" + ImageId,
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
    GetAllProducts();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        ProductId = 0;
        $('#txtName').val('');
        $('#CmbType').val(1);

        $('#txtTozihat').val('');
        $('#InsertModal').modal();
    });

    $(document.body).on('click', '.UploadImage', (e) => {


        ProductId = parseInt($(e.currentTarget).attr('ProductId'));
        $('#txtOnvanTasvir').val('');
        $('#exampleInputFile').val('');
        $('.custom-file-label').text('انتخاب تصویر');
        $('#ImageModal').modal();


    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        if ($('#txtName').val().length === 0) {
            textalert += "نام را وارد نمایید";
        }

        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (ProductId === 0) {
                InsertProducts();
            } else {
                UpdateProducts();
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

        ProductId = parseInt($(this).attr('ProductId'));

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
                DeleteProducts();
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

        ProductId = parseInt($(this).attr('ProductId'));

        GetProductsById();

    });

    $(document.body).on('click', '.Detail', function () {

        ProductId = parseInt($(this).attr('ProductId'));

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

        GetAllProducts();
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
