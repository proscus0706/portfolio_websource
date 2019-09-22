/********************************************
 * This tiny jQuery snippet adds a specific
 * class to the image if a caption is present.
 ********************************************/
$(document).ready(function () {
    $("figure img + figcaption").prev().addClass('hasCaption');
});