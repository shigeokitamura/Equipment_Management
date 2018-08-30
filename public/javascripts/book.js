$(window).on('load', () => {
  if ($('#borrowedBy').text() != "") {
    const users = $('#borrowedBy').text().split(',');
    $('#borrowedBy').text('');
    users.forEach((user, idx) => {
      $.ajax({
          url: '/users/userid_to_username?userid=' + user,
          type: 'GET',
          timeout: 10000
      }).done(data => {
          //console.log(data);
          $('#borrowedBy').append(data);
          if (idx != users.length - 1) {
            $('#borrowedBy').append('，');
          }
      });
    });
  }
  if ($('#returnedBy').text() != "") {
    $.ajax({
        url: '/users/userid_to_username?userid=' + $('#returnedBy').text(),
        type: 'GET',
        timeout: 10000
    }).done(data => {
        //console.log(data);
        $('#returnedBy').text(data);
    });
  }
});

function searchISBNfromGoogle() {
  console.log('ISBNを検索します．');
  const isbn = $('#isbn').val();
  if (!isbn) {
    alert('ISBNを入力して下さい．');
    return;
  } else if (!$.isNumeric(isbn)) {
    alert('数値で入力して下さい．');
    return;
  }
  const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
  $.getJSON(url, data => {
    if (data.totalItems == 0) {
      alert('書籍情報が見つかりませんでした．');
      return;
    }

    //console.log(data.items[0].volumeInfo);
    const item = data.items[0].volumeInfo;

    $('#title').val(item.title);
    $('#authors').val(item.authors);
    $('#description').val(item.description);
    $('#categories').val(item.categories);
    $('#thumbnail').val(item.imageLinks.thumbnail);
    setImage();
  });
}

function searchISBNfromDB() {
  const isbn = $('#isbn').val();
  if (!isbn) {
    alert('ISBNを入力して下さい．');
    return;
  } else if (!$.isNumeric(isbn)) {
    alert('数値で入力して下さい．');
    return;
  }
  window.location.href = '/books/checkout?isbn=' + isbn;
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

function confirmCheckout(user, isbn) {
  if(window.confirm('この本を借りますか？')) {
    const form = document.createElement('form');
    const req_user = document.createElement('input');
    const req_isbn = document.createElement('input');

    form.method = 'POST';
    form.action = '/books/checkout';

    req_user.type = 'hidden';
    req_user.name = 'user';
    req_user.value = user;

    req_isbn.type = 'hidden';
    req_isbn.name = 'isbn';
    req_isbn.value = isbn;

    form.appendChild(req_user);
    form.appendChild(req_isbn);
    document.body.appendChild(form);

    form.submit();
  }
}

function confirmReturn(user, isbn) {
  if(window.confirm('この本を返却しますか？')) {
    const form = document.createElement('form');
    const req_user = document.createElement('input');
    const req_isbn = document.createElement('input');

    form.method = 'POST';
    form.action = '/books/return';

    req_user.type = 'hidden';
    req_user.name = 'user';
    req_user.value = user;

    req_isbn.type = 'hidden';
    req_isbn.name = 'isbn';
    req_isbn.value = isbn;

    form.appendChild(req_user);
    form.appendChild(req_isbn);
    document.body.appendChild(form);

    form.submit();
  }
}
