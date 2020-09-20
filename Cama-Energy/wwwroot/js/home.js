

function GetAllServices() {


    let Html = ``;


    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetAllServices",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {

                Html += ` <article class="col-md-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="500ms">
                                <div class="service-block text-center">
                                    <div class="service-icon text-center">
                                        <i class="fa fa-wordpress fa-5x"></i>
                                    </div>
                                    <h3>${item.name}</h3>
                                    <p>${item.title}</p>
                                </div>
                         </article>`;
            });



            $('.Services').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}

function GetLastNews() {


    let Html = ``;


    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetLastNews",
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
                Html += `<article class="col-md-3 col-sm-6 col-xs-12 clearfix wow fadeInUp" data-wow-duration="500ms">
                            <div class="note">
                                <div class="media-wrapper">
                                    <img src="${item.newsImage[0].fileImage}" alt="amazing caves coverimage" height="150px;" class="img-responsive">
                                </div>

                                <div class="excerpt">
                                    <h3>${item.title}</h3>
                                    <p>${desc}</p>
                                    <a class="btn btn-transparent" href="../../home/SingleNews/${item.id}">جزئیات بیشتر</a>
                                </div>
                            </div>
                        </article>`;
            });



            $('.News').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}

function GetLastProducts() {


    let Html = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetLastProducts",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            let counter = 1;

            jQuery.each(response, function (i, item) {
                debugger;
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

                $(`#ppImage${counter}`).attr('src', item.productsImage[0].fileImage);
                $(`#ppTitle${counter}`).html(item.name);
                $(`#ppDesc${counter}`).html(desc);
                $(`#ppLink${counter}`).attr('href', `../home/SingleProduct?id=${item.id}`);
                counter++;


            });






        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}

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

            jQuery.each(response, function (i, item) {


                Html += `<div class="col-md-6 text-center wow fadeInUp" data-wow-duration="500ms">
                            <div class="wrap-about">
                               <img src="${item.fileImage}" alt=${item.title} width="250px">
                            <div class="about-content text-center">
                                <h3 class="ddd">${item.title}</h3>
                            </div>
                        </div>
                     </div>`;
            });



            $('#CertDiv').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}

function GetLastProjects() {


    let Html = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetLastProjects",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            let counter = 1;

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

                $(`#prjImage${counter}`).attr('src', item.projectsImage[0].fileImage);
                $(`#prjTitle${counter}`).html(item.title);
                $(`#prjSubTitle${counter}`).html(item.brand);
                $(`#prjDesc${counter}`).html(desc);
                $(`#prjLink${counter}`).attr('href', `../home/SingleProject?id=${item.id}`);
                counter++;


            });






        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}

function GetCounter() {




    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetCounter",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $('#prdCount').html(response.product);
            $('#prdCount').attr('data-to', response.product);
            $('#prjCount').html(response.project);
            $('#prjCount').attr('data-to', response.project);
            $('#serCount').html(response.service);
            $('#serCount').attr('data-to', response.service);
            $('#cerCount').html(response.certificate);
            $('#cerCount').attr('data-to', response.certificate);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}



$(document).ready(() => {





    GetCounter();
    GetAllServices();
    GetLastNews();
    GetLastProducts();
    GetCertificate();
    GetLastProjects();
    Grid.init();


});