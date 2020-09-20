let Id = 0;
let Flag = 0;
let modalId = $('#image-gallery');

function GetAllMenu() {


   

    jQuery.ajax({
        type: "Get",
        url: "/api/Menu/GetAllMenu",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (response) {
            var s = (((response.replace(/'/g, '"')).replace(/,]/g, ']')).replace(/,}/g, '}')).replace(/,,/g, ',');
           
            console.log(s);
            $('#treeview1').treeview({
                data: s
            });

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        
        }
    });
}

function InsertMenu() {


    let menu = {
        ID: 0,
        PID: Id,
        Name: $('#txtName').val(),
        URL: $('#txtURL').val(),
        TableName: '',
        TableID: 0
    }

    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Menu/InsertMenu",
        data: JSON.stringify(menu),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'منو با موفقیت ثبت شد',
                'success'
            );

            setTimeout(() => { window.location.reload(); }, 1000);


        },
        error: function (response) {

            console.log(response);
            EndLoader();

        },
        complete: function () {

        }
    });
}

function DeleteMenu() {

    ShowLoader();

    jQuery.ajax({
        type: "Delete",
        url: "/api/menu/DeleteMenu?id=" + Id,
        data: "",
        success: function (response) {

            Swal.fire(
                'حدف شد !',
                'رکورد مورد نظر حذف شد',
                'success'
            );
            setTimeout(() => { window.location.reload(); }, 1000);
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

function GetMenuById() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Menu/GetMenuById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {



            $('#txtName').val(response.name);
            $('#txtURL').val(response.url);
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

function UpdateMenu() {



    ShowLoader();

    jQuery.ajax({
        type: "Put",
        url: "/api/Menu/UpdateMenu?id=" + Id + "&name=" + $('#txtName').val() + "&url=" + $('#txtURL').val(),
        data: '',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'منو با موفقیت بروز رسانی شد',
                'success'
            );

            setTimeout(() => { window.location.reload(); }, 1000);


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
    GetAllMenu();
    EndLoader();



    $('#treeview1').on('nodeSelected', function (event, data) {

        let node = $('#treeview1').treeview('getSelected');
        if (node.length > 0) {
            Id = node[0].mid;
            $('#lblMenuName').html(node[0].text);
            $('.selectedmenu').show();
        } else {

            Id = 0;
            $('#lblMenuName').html('');
            $('.selectedmenu').hide();
        }

    });

    $('#treeview1').on('nodeUnselected',function (event, node) {

            Id = 0;
            $('#lblMenuName').html('');
            $('.selectedmenu').hide();


    });

    $(document.body).on('click', '#btnAdd', function () {

        $('#exampleModal').modal();
        Flag = 0;

    });
    
    $(document.body).on('click', '#btnSabt', function () {

        let textalert = "";

        if ($('#txtName').val().length === 0) {
            textalert += `نام منو را وارد نمایید`;
        }
        else if ($('#txtURL').val().length === 0) {
            textalert += "URL را وارد نمایید";
        }

        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {
            if (Flag === 0) {
                InsertMenu();
            } else {
                UpdateMenu();
            }

        }

    });

    $(document.body).on('click', '#btnRemove', function () {

       

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
                DeleteMenu();
            }
        });


    });

    $(document.body).on('click', '#btnEdit', function () {

        Flag = 1;
        GetMenuById();

    });
   
   

});