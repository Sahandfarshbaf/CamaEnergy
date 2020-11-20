


function GetContact() {

    ShowLoader();

    jQuery.ajax({
        type: "Get",
        url: `/api/Contact/GetContact`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {



            $('#txtPhone1').val(response.phone1);
            $('#txtPhone2').val(response.phone2);
            $('#txtWhats').val(response.whatsApp);
            $('#txtTele').val(response.telegram);
            $('#txtEmail').val(response.email);
            $('#txtAddress').val(response.address);


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {
            EndLoader();

        }
    });
}

function UpdateContact() {


    let contact = {
        id: 1,
        phone1: $('#txtPhone1').val(),
        phone2: $('#txtPhone2').val(),
        whatsApp: $('#txtWhats').val(),
        telegram: $('#txtTele').val(),
        email: $('#txtEmail').val(),
        address: $('#txtAddress').val()
    }

    ShowLoader();

    jQuery.ajax({
        type: "Post",
        url: "/api/Contact/UpdateContact",
        data: JSON.stringify(contact),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            EndLoader();
            Swal.fire(
                'ثبت شد !',
                'اطلاعات تماس با موفقیت بروز رسانی شد',
                'success'
            );

            GetContact();



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
    GetContact();
    EndLoader();




    $(document.body).on('click', '#btnSabt', function () {

        UpdateContact();


    });
});