
let cid = 0;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};



function GetAllProjects() {

    let Html = "";
    
    let dd = "";
    switch (cid) {

        case "1":
            dd = "مسکونی";
            break;
        case "2":
            dd = "اداری";
            break;
        case "3":
            dd = "تجاری";
            break;
        case "4":
            dd = "هتل";
            break;
        default:
    }
    
    jQuery.ajax({
        type: "Get",
        url: "/api/Home/GetAllProjectsByCid?cid=" + dd,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            console.log(response);
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


                Html += `<div class="col-sm-6 col-md-4">
                            <div class="thumbnail">
                                <img src="${item.projectsImage[0].fileImage}"  width="250px" height="300px">
                                <div class="caption">
                                    <span class="ph1">${item.title}</span>
                                    <p>${desc}</p>
                                    <p><a href="../home/SingleProject?id=${item.id}" class="btn btn-danger" onclick="../home/SingleProject?id=${item.id}" role="button">مشاهده جزئیات</a>
                                </div>
                            </div>
                        </div>`;
            });

            Html += `</tbody></table>`;

            $('#ProjectList').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}






$(document).ready(() => {

    cid = getUrlParameter('cid');
    GetAllProjects();
});