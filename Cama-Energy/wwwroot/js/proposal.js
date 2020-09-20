

function GetDownloadByType() {


    let Html = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetDownloadByType?typeId=1",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {

                Html += ` <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <i class="fa fa-file-text"></i>&nbsp;
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse${item.id}">
                                        ${item.title}
                                    </a>
                                </h4>
                            </div>
                            <div id="collapse${item.id}" class="panel-collapse collapse">
                                <div class="panel-body" style="background-color: #2b2c30 !important;">
                                    <div class="row">

                                        <div class="col-lg-3 col-md-3 col-sm-3 " align="left">
                                             <a class="btn btn-danger" target="_blank" href="${item.fileLocation}"  >دانلود&nbsp;&nbsp;<i class="fa fa-download"></i></a>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-9">
                                            <p>
                                                    ${item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

            });



            $('#accordion').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}

$(document).ready(() => {


    GetDownloadByType();

});