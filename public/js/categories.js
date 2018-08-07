var tid = setInterval(function () {
    if (document.readyState !== "complete") {
        return;
    }
    clearInterval(tid);

    var editSections = document.getElementsByClassName('edit');
    var i = 0;
    for (i = 0; i < editSections.length; i++) {
        editSections[i].firstElementChild.firstElementChild.children[1].firstChild.addEventListener('click', startEdit);
        editSections[i].firstElementChild.firstElementChild.children[2].firstChild.addEventListener('click', startDelete);
    }
}, 100);

document.getElementsByClassName('btn')[0].addEventListener('click', createNewCategory);

function createNewCategory(event) {
    event.preventDefault();
    var name = event.target.previousElementSibling.value;
    if (name.length === 0) {
        alert("Please enter a valid Category name!");
        return;
    }
    ajax("POST", "/admin/blog/category/create", "name=" + name, newCategoryCreated, [name]);
}

function newCategoryCreated(params, success, responseObj) {
    var name = params[0];
    location.reload();
}

function ajax(method, url, params, callback, callbackParams) {
    var http;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        http = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE ) {
            if(http.status == 200){
                var obj = JSON.parse(http.responseText);
                console.log(obj);
                callback(callbackParams, true, obj);
            }
            else if(http.status == 400) {
                alert("Category could not be saved. Please try again!");
                callback(callbackParams, false);

            }
            else {
                var obj = JSON.parse(http.responseText);
                if (obj.message) {
                    alert(obj.message);
                } else {
                    alert("Please check the name");
                }
                callback(callbackParams, false);
            }
        }
    };

    http.open(method, baseUrl + url, true);
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.send(params + "&_token=" + token);
}
