


function GetVideos() {


    let Html = ``;


    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetAllVideo",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            console.lo
            jQuery.each(response, function (i, item) {


                Html += ` <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="VideoBox">
                                <div>
                                    <h4 class="ph2">${item.title}</h4>
                                </div>
                                <div align="center" class="embed-responsive embed-responsive-16by9">
                                    <video id="Video" src="${item.fileLocation}" class="embed-responsive-item" controls poster="/img/VideoPreview.png">
                                        <source src="/video/video.mp4" type="video/mp4" />
                                        <source src="/video/video.ogv" type="video/ogg" />
                                        <source src="/video/video.webm" type="video/webm" />
                                    </video>
                                </div>
                                <div>
                                    <p align="justify">${item.description}</p>
                                </div>
                            </div>
                        </div>`;
            });

         

            $('.VideoDiv').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {



        }
    });
}


$(document).ready(() => {



    GetVideos();

});