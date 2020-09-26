
let ProjectId = 0;
let modalId = $('#image-gallery');

function GetAllProjects() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>نوع</th>
                    <th>عنوان</th>
                    <th>مالک</th>
                    <th>تاریخ</th>
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
        url: "/api/Projects/GetAllProjects",
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
                var azday = new persianDate(item.fromDate).format('YYYY/MM/DD')
                var taday = new persianDate(item.toDate).format('YYYY/MM/DD')
          

                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${item.projectCategory}</td>
                            <td>${item.title}</td>
                            <td>${item.owner}</td>
                            <td>${azday + " - " + taday}</td>
                            <td>${desc}</td>
                            <td>${item.projectsImage.length}</td>
                            <td class="tdTextCenter"><span class="UploadImage" ProjectId="${item.id}" ><i class="fa fa-upload text text-primary"></i></span></td>
                            <td class="tdTextCenter"><span class="Detail" ProjectId="${item.id}" ><i class="fa fa-search text text-success"></i></span></td>
                            <td class="tdTextCenter"><span class="Edit" ProjectId="${item.id}" ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" ProjectId="${item.id}" ><i class="fa fa-trash text text-danger"></i></span></td>
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

function InsertProjects() {

    let project = {
        Id: 0,
        projectCategory: $('#CmbType').val(),
        Karfarma: $('#txtKarfarma').val(),
        ModirAmel: $('#txtModir').val(),
        Brand: $('#txtBrand').val(),
        Emkanat: $('#txtEmkanat').val(),
        ControlBy: $('#txtNazer').val(),
        TarikhTahvil: parseInt($('#TarikhTahvilObserver').val()),
        Title: $('#txtName').val(),
        Description: $('#txtTozihat').val(),
        FromDate: parseInt($('#AzTarikhObserver').val()),
        ToDate: parseInt($('#TaTarikhObserver').val()),
        Owner: $('#txtMalek').val()

    }


    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Projects/InsertProjects",
        data: JSON.stringify(project),
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


            $('#CmbType').val('مسکونی'),
                $('#txtKarfarma').val('');
            $('#txtModir').val('');
            $('#txtBrand').val('');
            $('#txtEmkanat').val('');
            $('#txtNazer').val('');
            $('#TarikhTahvilObserver').val('');
            $('#txtName').val('');
            $('#txtTozihat').val('');
            $('#AzTarikhObserver').val('');
            $('#TaTarikhObserver').val('');
            $('#txtMalek').val('');
            $('#InsertModal').modal('hide');


        },
        error: function (response) {

            console.log(response);
            EndLoader();

        },
        complete: function () {
            GetAllProjects();
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
        url: `/api/Projects/UploadImage?ProjectId=${ProjectId}&Title=${$('#txtOnvanTasvir').val()}`,
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();
            $('#ImageModal').modal('hide');
            Swal.fire(
                'ثبت شد !',
                'پروژه با موفقیت ثبت شد',
                'success'
            );



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
            GetAllProjects()
        }
    });
}

function DeleteProjects() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/Projects/DeleteProjects?ProjectId=" + ProjectId,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            EndLoader();
        },
        error: function (response) {

            console.log(response);
            EndLoader();

        },
        complete: function () {

            GetAllProjects();

        }
    });
}

function GetProjectsById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Projects/GetProjectsById?ProjectId=${ProjectId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            let azday = new persianDate(response.fromDate).format('YYYY/MM/DD');
            let taday = new persianDate(response.toDate).format('YYYY/MM/DD');
            let tarikhTahvil = new persianDate(response.tarikhTahvil).format('YYYY/MM/DD');
            $('#CmbType').val(response.projectCategory);
            $('#txtKarfarma').val(response.karfarma);
            $('#txtModir').val(response.modirAmel);
            $('#txtBrand').val(response.brand);
            $('#txtEmkanat').val(response.emkanat);
            $('#txtNazer').val(response.controlBy);
            $('#txtName').val(response.title);
            $('#txtAzTarikh').val(azday);
            $('#txtTaTarikh').val(taday);
            $('#txtMalek').val(response.owner);
            $('#txtTarikhTahvil').val(tarikhTahvil);
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

function UpdateProjects() {

    let project = {
        Id: ProjectId,
        ProjectCategory: $('CmbType').val(),
        Karfarma: $('#txtKarfarma').val(),
        ModirAmel: $('#txtModir').val(),
        Brand: $('#txtBrand').val(),
        Emkanat: $('#txtEmkanat').val(),
        ControlBy: $('#txtNazer').val(),
        TarikhTahvil: parseInt($('#TarikhTahvilObserver').val()),
        Title: $('#txtName').val(),
        Description: $('#txtTozihat').val(),
        FromDate: parseInt($('#AzTarikhObserver').val()),
        ToDate: parseInt($('#TaTarikhObserver').val()),
        Owner: $('#txtMalek').val()
    }


    jQuery.ajax({
        type: "Put",
        url: "/api/Projects/UpdateProjects",
        data: JSON.stringify(project),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            Swal.fire(
                'بروز رسانی شد !',
                'پروژه با موفقیت بروز رسانی شد',
                'success'
            );
            $('CmbType').val('مسکونی')
            $('#txtKarfarma').val('');
            $('#txtModir').val('');
            $('#txtBrand').val('');
            $('#txtEmkanat').val('');
            $('#txtNazer').val('');
            $('#TarikhTahvilObserver').val('');
            $('#txtName').val('');
            $('#txtTozihat').val('');
            $('#AzTarikhObserver').val('');
            $('#TaTarikhObserver').val('');
            $('#txtMalek').val('');
            $('#InsertModal').modal('hide');


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {
            GetAllProjects()
        }
    });
}

function ViewDetails() {

    ShowLoader();
    let Html = '';
    jQuery.ajax({
        type: "Get",
        url: `/api/Projects/GetProjectsById?ProjectId=${ProjectId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            if (response.projectsImage.length > 0) {
                $('#RemoveImage').attr('ImageId', response.projectsImage[0].id);
                $('.MainImage').attr('src', response.projectsImage[0].fileImage);
                $('#imgTitle').text(response.projectsImage[0].title);
                $('.ImageList').show();
            }
            else {
                $('#RemoveImage').hide();
                $('.ImageList').hide();
            }

            let azday = new persianDate(response.fromDate).format('YYYY/MM/DD');
            let taday = new persianDate(response.toDate).format('YYYY/MM/DD');
            let tarikhTahvil = new persianDate(response.tarikhTahvil).format('YYYY/MM/DD');

            $('#lblCategory').html(response.projectCategory);
            $('#lblKarfarma').html(response.karfarma);
            $('#lblModir').html(response.modirAmel);
            $('#lblBarnd').html(response.brand);
            $('#lblNazer').html(response.controlBy);
            $('#lblEmkanat').html(response.emkanat);
            $('#lblOnvan').html(response.title);
            $('#lblAzTarikh').html(azday);
            $('#lblTaTarikh').html(taday);
            $('#lblMalek').html(response.owner);
            $('#lblTarikhTahvil').html(tarikhTahvil);
            $('#lblTozihat').html(response.description);




            jQuery.each(response.projectsImage, function (i, item) {


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
        url: "/api/Projects/DeleteImage?Id=" + ImageId,
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
    GetAllProjects();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        ProjectId = 0;
        $('#txtKarfarma').val('');
        $('#txtModir').val('');
        $('#txtBrand').val('');
        $('#txtEmkanat').val('');
        $('#txtNazer').val('');
        $('#TarikhTahvilObserver').val('');
        $('#txtName').val('');
        $('#txtTozihat').val('');
        $('#AzTarikhObserver').val('');
        $('#TaTarikhObserver').val('');
        $('#txtMalek').val('');
        $('#InsertModal').modal();
    });

    $(document.body).on('click', '.UploadImage', (e) => {


        ProjectId = parseInt($(e.currentTarget).attr('ProjectId'));
        $('#txtOnvanTasvir').val('');
        $('#exampleInputFile').val('');
        $('.custom-file-label').text('انتخاب تصویر');
        $('#ImageModal').modal();


    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        if ($('#txtName').val().length === 0) {
            textalert += `عنوان را وارد نمایید`;
        }

        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (ProjectId === 0) {
                InsertProjects();
            } else {
                UpdateProjects();
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

        ProjectId = parseInt($(this).attr('ProjectId'));

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
                DeleteProjects();
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

        ProjectId = parseInt($(this).attr('ProjectId'));

        GetProjectsById();

    });

    $(document.body).on('click', '.Detail', function () {

        ProjectId = parseInt($(this).attr('ProjectId'));

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

        GetAllProjects();
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


    $('#txtAzTarikh').persianDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
        altField: '#AzTarikhObserver',
        autoClose: true

    });

    $('#txtTaTarikh').persianDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
        altField: '#TaTarikhObserver',
        autoClose: true

    });

    $('#txtTarikhTahvil').persianDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
        altField: '#TarikhTahvilObserver',
        autoClose: true

    });






});
