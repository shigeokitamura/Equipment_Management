$(window).on('load', () => {
  if ($('#borrowedBy').text() != "") {
    const user = $('#borrowedBy').text();
    $('#borrowedBy').text('');
    $.ajax({
      url: 'users/userid_to_username?userid=' + user,
      type: 'GET',
      timeout: 10000
    }).done(data => {
      //console.log(data);
      $('#borrowedBy').append(data);
    });
  }
  if ($('#returnedBy').text() != "") {
    $.ajax({
        url: 'users/userid_to_username?userid=' + $('#returnedBy').text(),
        type: 'GET',
        timeout: 10000
    }).done(data => {
        //console.log(data);
        $('#returnedBy').text(data);
    });
  }
});

function searchBarcodefromDB() {
  const barcode = $('#barcode').val();
  if (!barcode) {
    alert('バーコードを入力して下さい．');
    return;
  } else if (!$.isNumeric(barcode)) {
    alert('数値で入力して下さい．');
    return;
  }
  window.location.href = 'equipments/checkout?barcode=' + barcode;
}


function setImage() {
  const src = $('#thumbnail').val();
  $('.thumbnail').attr('src', src);
}

function getParam() {
  const url = location.search.substring(1).split('&');
  const val = url[0].split('=');
  if (val[0] == 'isbn') {
    return val[1];
  } else {
    return null;
  }
}

function confirmCheckout(user, barcode) {
  if(window.confirm('この備品を借りますか？')) {
    const form = document.createElement('form');
    const req_user = document.createElement('input');
    const req_code = document.createElement('input');

    form.method = 'POST';
    form.action = 'equipments/checkout';

    req_user.type = 'hidden';
    req_user.name = 'user';
    req_user.value = user;

    req_code.type = 'hidden';
    req_code.name = 'barcode';
    req_code.value = barcode;

    form.appendChild(req_user);
    form.appendChild(req_code);
    document.body.appendChild(form);

    form.submit();
  }
}

function confirmReturn(user, barcode) {
  if(window.confirm('この備品を返却しますか？')) {
    const form = document.createElement('form');
    const req_user = document.createElement('input');
    const req_code = document.createElement('input');

    form.method = 'POST';
    form.action = 'equipments/return';

    req_user.type = 'hidden';
    req_user.name = 'user';
    req_user.value = user;

    req_code.type = 'hidden';
    req_code.name = 'barcode';
    req_code.value = barcode;

    form.appendChild(req_user);
    form.appendChild(req_code);
    document.body.appendChild(form);

    form.submit();
  }
}
