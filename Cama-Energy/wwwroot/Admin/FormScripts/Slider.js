
let Id = 0;

function GetAllSlider() {


    let Html = `<table id="example2" class="table table-striped table-bordered table-hover">
               <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>عنوان</th>
                    <th>متن سطر 1</th>
                    <th>متن سطر 2</th>
                    <th>تصویر</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;


    jQuery.ajax({
        type: "Get",
        url: "/api/Slider/GetAllSlider",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {

               

                Html += `<tr>
                            <td>${i + 1}</td>
                            <td>${item.title}</td>
                            <td>${item.subTitle1}</td>
                            <td>${item.subTitle2}</td>
                            <td class="text-center"><img src="${item.imageFile}" class="img-thumbnail" style="width:75px;height:75px;"  /></td>
                            <td class="tdTextCenter"><span class="Trash" SliderId="${item.id}" ><i class="fa fa-trash text text-danger"></i></span></td>
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

function AddSlider() {


    let slider = {
        ID: 0,
        ImageFile:'',
        Title: $('#txtTitle').val(),
        SubTitle1: $('#txtSubTitle1').val(),
        SubTitle2: $('#txtSubTitle12').val(),
        IsActive: true
    }

   

    var myfile = $("#exampleInputFile");
    console.log(myfile);

    var formData = new FormData();



    formData.append('SliderImages', myfile[0].files[0]);
    formData.append('Slider', JSON.stringify(slider))
    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Slider/InsertSlider",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'اسلایدر با موفقیت ثبت شد',
                'success'
            );
            GetAllSlider();
            $('#txtTitle').val('');
            $('#txtSubTitle1').val('');
            $('#txtSubTitle12').val('');
            $('#exampleModal').modal('hide');
           

        },
        error: function (response) {

            console.log(response);
            EndLoader();
        },
        complete: function () {
         
        }
    });
}

function DeleteSlider() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/Slider/DeleteSlider?sliderId=" + Id,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            GetAllSlider();
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
    GetAllSlider();
    EndLoader();

    $(document.body).on('click', '.Trash', function () {

        Id = parseInt($(this).attr('SliderId'));

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
                DeleteSlider();
            }
        });


    });

    $(document.body).on('click', '#btnJadid', function () {

        Id = 0;
        $('#txtTitle').val('');
        $('#txtSubTitle1').val('');
        $('#txtSubTitle12').val('');
        $('.custom-file-label').text('انتخاب تصویر');
        $('#exampleModal').modal();
    });

    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        if ($('#exampleInputFile').val().length === 0) {
            textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        }
        else {

            AddSlider();

        }

       

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


});