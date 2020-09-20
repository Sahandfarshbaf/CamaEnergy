
let Id = 0;

function GetAllAbout() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>پیشگفتار</th>
                    <th>چرا کاما</th>
                    <th>منشور اخلاقی</th>
                    <th>رزومه</th>
                    <th>جزئیات</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;


    jQuery.ajax({
        type: "Get",
        url: "/api/AboutUs/GetAllAboutUs",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {

                let pish = '';
                if (item.pishgoftar.length > 150) {

                    for (var j = 150; j < item.pishgoftar.length; j++) {

                        if (item.pishgoftar.charAt(j) === " ") {
                            pish = item.pishgoftar.substr(0, j) + " ...";
                            j = item.pishgoftar.length;
                        }
                    }
                } else {
                    pish = item.pishgoftar;
                }

                let chera = '';
                if (item.cheraCama.length > 150) {

                    for (var j = 150; j < item.cheraCama.length; j++) {

                        if (item.cheraCama.charAt(j) === " ") {
                            chera = item.cheraCama.substr(0, j) + " ...";
                            j = item.cheraCama.length;
                        }
                    }
                } else {
                    chera = item.cheraCama;
                }

                let mansh = '';
                if (item.manshorAkhlagi.length > 150) {

                    for (var j = 150; j < item.manshorAkhlagi.length; j++) {

                        if (item.manshorAkhlagi.charAt(j) === " ") {
                            mansh = item.manshorAkhlagi.substr(0, j) + " ...";
                            j = item.manshorAkhlagi.length;
                        }
                    }
                } else {
                    mansh = item.manshorAkhlagi;
                }

                let resu = '';
                if (item.resume.length > 150) {

                    for (var j = 150; j < item.resume.length; j++) {

                        if (item.resume.charAt(j) === " ") {
                            resu = item.resume.substr(0, j) + " ...";
                            j = item.resume.length;
                        }
                    }
                } else {
                    resu = item.resume;
                }


                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${pish}</td>
                            <td>${chera}</td>
                            <td>${mansh}</td>
                            <td>${resu}</td>
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

function AddAbout() {


    let about = {
        ID: 0,
        Pishgoftar: $('#txtPish').val(),
        CheraCama: $('#txtChera').val(),
        ManshorAkhlagi: $('#txtManshor').val(),
        Resume: $('#txtResume').val()
    }

    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/AboutUs/AddAbout",
        data: JSON.stringify(about),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'درباره ما با موفقیت ثبت شد',
                'success'
            );

            GetAllAbout();


            $('#txtPish').val('');
            $('#txtChera').val('');
            $('#txtManshor').val('');
            $('#txtResume').val('');
            $('#InsertModal').hide();
            $('#PnlList').show();


        },
        error: function (response) {

            console.log(response);
            EndLoader();

        },
        complete: function () {

        }
    });
}

function DeleteAbout() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/AboutUs/DeleteAbout?id=" + Id,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllAbout();
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

function GetAboutById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/AboutUs/GetAboutById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {



            $('#txtPish').val(response.pishgoftar);
            $('#txtChera').val(response.cheraCama);
            $('#txtManshor').val(response.manshorAkhlagi);
            $('#txtResume').val(response.resume);
            $('#InsertModal').show();
            $('#PnlList').hide();

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {
            EndLoader();

        }
    });
}

function UpdateAbout() {


    let about = {
        ID: Id,
        Pishgoftar: $('#txtPish').val(),
        CheraCama: $('#txtChera').val(),
        ManshorAkhlagi: $('#txtManshor').val(),
        Resume: $('#txtResume').val()
    }

    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/AboutUs/UpdateAbout",
        data: JSON.stringify(about),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'درباره ما با موفقیت بروز رسانی شد',
                'success'
            );

            GetAllAbout();


            $('#txtPish').val('');
            $('#txtChera').val('');
            $('#txtManshor').val('');
            $('#txtResume').val('');
            $('#InsertModal').hide();
            $('#PnlList').show();


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

    jQuery.ajax({
        type: "Get",
        url: `/api/AboutUs/GetAboutById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            $('#lblPish').html(response.pishgoftar);
            $('#lblChera').html(response.cheraCama);
            $('#lblManshor').html(response.manshorAkhlagi);
            $('#lblResume').html(response.resume);

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
    GetAllAbout();
    EndLoader();


    $(document.body).on('click', '#btnJadid', () => {

        Id = 0;
        $('#txtPish').val('');
        $('#txtChera').val('');
        $('#txtManshor').val('');
        $('#txtResume').val('');
        $('#InsertModal').show();
        $('#PnlList').hide();
    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        //if ($('#txtTitle').val().length === 0) {
        //    textalert += `عنوان را وارد نمایید`;
        //}
        //else if ($('#exampleInputFile').val().length === 0 && Id === 0) {
        //    textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
        //    Swal.fire({
        //        icon: 'error',
        //        title: 'فیلدهای اجباری را وارد نمایید !',
        //        text: textalert

        //    });
        //}


        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (Id === 0) {
                AddAbout();
            } else {
                UpdateAbout();
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
                DeleteAbout();
            }
        });


    });


    $(document.body).on('click', '.Edit', function () {

        Id = parseInt($(this).attr('ServicesId'));

        GetAboutById();

    });


    $(document.body).on('click', '.Detail', function () {

        Id = parseInt($(this).attr('ServicesId'));

        ViewDetails();
        $('#pnlJoziyat').show();
        $('#PnlList').hide();

    });

    $(document.body).on('click', '.btnClose', function () {

        GetAllAbout();
        $('#pnlJoziyat').hide();
        $('#PnlList').show();

    });
    
    $(document.body).on('click', '#btnEnseraf', function () {

        $('#InsertModal').hide();
        $('#PnlList').show();
    });


});