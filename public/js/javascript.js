$(document).ready(function () {
    console.log('test');
    $("#photo").change(function () {
        console.log('test');
        readURL(this);
    });
});



$("#photo").on('change', function () {
    readURL(this);
});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#imgPreview").attr('src', e.target.result).width(100).height(100);
        }

        reader.readAsDataURL(input.files[0]);
    }
}



