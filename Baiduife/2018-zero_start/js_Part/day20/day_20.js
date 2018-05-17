
$('label').on('click', function () {
    var id="."+this.id+'-select';
    console.log(id);
    $(id).show();
});