


function GetCertificate() {


    let Html = ``;
    let Html1 = ``;
    let Html2 = ``;




    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetCertificate",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            var cer = response.filter(x => x.type == 1);
            var tag = response.filter(x => x.type == 2);
            var eft = response.filter(x => x.type == 3);
            jQuery.each(cer, function (i, item) {


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

            jQuery.each(tag, function (i, item) {


                Html1 += `<div class="col-md-6 text-center wow fadeInUp" data-wow-duration="500ms">
                            <div class="wrap-about">
                               <img src="${item.fileImage}" alt=${item.title} width="400px">
                            <div class="about-content text-center">
                                <h3 class="ddd">${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        </div>
                     </div>`;
            });

            $('.TagdirDiv').html(Html1);

            jQuery.each(eft, function (i, item) {


                Html2 += `<div class="col-md-6 text-center wow fadeInUp" data-wow-duration="500ms">
                            <div class="wrap-about">
                               <img src="${item.fileImage}" alt=${item.title} width="400px">
                            <div class="about-content text-center">
                                <h3 class="ddd">${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        </div>
                     </div>`;
            });

            $('.EfteDiv').html(Html2);

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