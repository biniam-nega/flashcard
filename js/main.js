var elemRot = null;
var flash_counter = 0;
var deg = {};

function rotateCard() {

    var elem_id = $(elemRot).attr('id');
    elemRot.style.transform = 'rotateY(' + deg[elem_id] + 'deg)';
    deg[elem_id]++;
    if ( deg[elem_id] === 90 ||  deg[elem_id] === 270) {
        var id = /^flash-([0-9]+)/.exec(elem_id)[1];
        $('#term-' + id).toggle();
        $('#meaning-' + id).toggle();
        document.getElementById('del-flash-' + id + '-btn').style.transform = 'rotateY(180deg)';
    }
    if ( deg[elem_id] === 180 ||  deg[elem_id] === 360) {
        clearInterval(rotInt);
        if ( deg[$(elemRot).attr('id')] === 360) {
            deg[$(elemRot).attr('id')] = 0;
        }
    }
}

$(document).ready(function () {

    $('#save-flash-btn').click(function () {
        if ($('#term-txt').val() && $('#meaning-txt').val()) {
            $('#my-cards').html(
                '<div class="w3-container w3-center">' +
                '<div class="w3-panel w3-margin-top w3-margin-bottom w3-red w3-center" style="width:70%; height:200px;" id="flash-' + flash_counter + '">' +
                '<div class="w3-container">' +
                '<input type="button" class="w3-button w3-right w3-red" value="&times;" id="del-flash-' + flash_counter + '-btn"/>' +
                '</div>' +
                '<div class="w3-large" id="term-' + flash_counter + '">' +
                $('#term-txt').val().toUpperCase() +
                '</div>' +
                '<div class="w3-margin-bottom" id="meaning-' + flash_counter + '">' +
                $('#meaning-txt').val() +
                '</div>' +
                '</div>' +
                '</div>' + $('#my-cards').html()
            );
            for (var i = 0; i <= flash_counter; i++) {
                (function () {
                    var c = i;
                    $('#flash-' + c).click(function () {
                        elemRot = this;
                        deg['' + $(elemRot).attr('id')] = deg[$(elemRot).attr('id')] || 0;
                        rotInt = setInterval(rotateCard, 10);
                    });
                    $('#del-flash-' + c + '-btn').click(function() {
                        $(this).parent().parent().remove();
                    });
                }());
            }
            // reset the form
            $('#term-txt').val('');
            $('#meaning-txt').val('');
            $('#add-card-form').hide();
            
            flash_counter++;

        }
    });

    $('#add-flash-btn').click(function () {
        $('#add-card-form').show();
    });

    $('#hide-flash-btn').click(function() {
        $('#add-card-form').hide();
    });

});
