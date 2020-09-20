


function GetCertificate() {


    let Html = ``;


    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetCertificate",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            console.lo
            jQuery.each(response, function (i, item) {


                Html += `<div class="col-md-6 text-center wow fadeInUp" data-wow-duration="500ms">
                            <div class="wrap-about">
                               <img src="${item.fileImage}" alt=${item.title} width="400px">
                            <div class="about-content text-center">
                                <h3 class="ddd">${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        </div>
                     </div>`;
            });



            $('.CertDiv').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}


$(document).ready(() => {



    GetCertificate();

});