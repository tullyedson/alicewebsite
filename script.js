$(function () {
    $('[data-include]').each(function () {
        var file = '/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
});