$(document).ready(() => {
  const isbn = getParam();
  if (isbn) {
    $('#isbn').val(isbn);
  }
});

function getParam() {
  const url = location.search.substring(1).split('&');
  const val = url[0].split('=');
  if (val[0] == 'isbn') {
    return val[1];
  } else {
    return null;
  }
}

function searchISBN() {
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
