/** berisikan pagination yang digunakan server */

//function for using middleware
exports.pagination = (page) => {
  let limit, from;
  let artikelPerPage = 6;
  if (page) {
    if (page == 1) {
      (from = 0), (limit = artikelPerPage);
    } else if (page >= 1) {
      (limit = artikelPerPage), (from = artikelPerPage * (page - 1));
    }
  } else {
    (limit = 20), (from = 0);
  }
  return { limit, from };
};
