$(document).ready(function() {

    // Get page-content original position
    var contentTop = $('#page-content').offset().top;

    // Show/hide top link on page load
    showHideTopLink(contentTop);

    // Show/hide top link on scroll
    $(window).scroll(function() {
        showHideTopLink(contentTop);
    });

    // Scroll page on click action
    $('#page-top-link').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        return false;
    });

    // Hash button on click action
    $('.file-info-button').click(function(event) {

        // Get the file name and path
        var name = $(this).closest('li').attr('data-name');
        var path = $(this).closest('li').attr('data-href');

        // Set modal title value
        $('#file-info-modal .modal-title').text(name);

        $('#file-info .md5-hash').text('Loading...');
        $('#file-info .sha1-hash').text('Loading...');
        $('#file-info .filesize').text('Loading...');

        $.ajax({
            url:     '?hash=' + path,
            type:    'get',
            success: function(data) {

                // Parse the JSON data
                var obj = jQuery.parseJSON(data);

                // Set modal pop-up hash values
                $('#file-info .md5-hash').text(obj.md5);
                $('#file-info .sha1-hash').text(obj.sha1);
                $('#file-info .filesize').text(obj.size);

            }
        });

        // Show the modal
        $('#file-info-modal').modal('show');

        // Prevent default link action
        event.preventDefault();

    });

});

function showHideTopLink(elTop) {
    if($('#page-navbar').offset().top + $('#page-navbar').height() >= elTop) {
        $('#page-top-nav').show();
    } else {
        $('#page-top-nav').hide();
    }
}

$(function () {
    var elementList = document.querySelectorAll("#directory-listing li");
    for(let i = elementList.length-1; i >= 0 ; i--) {
        elementList[i].onmouseover=function(){
            elementList[i].getElementsByClassName("file-name")[0].classList.add("file-name-hover");
            elementList[i].getElementsByClassName("file-size")[0].classList.add("file-size-hover");
            elementList[i].getElementsByClassName("file-modified")[0].classList.add("file-modified-hover");
        }
        elementList[i].onmouseout=function(){
            elementList[i].getElementsByClassName("file-name")[0].classList.remove("file-name-hover");
            elementList[i].getElementsByClassName("file-size")[0].classList.remove("file-size-hover");
            elementList[i].getElementsByClassName("file-modified")[0].classList.remove("file-modified-hover");
        }
    }
});