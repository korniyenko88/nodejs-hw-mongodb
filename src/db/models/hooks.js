export const hendelSaveError = (error, doc, next) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.option.new = true;
  this.option.runValidators = true;
  next()
};

// export const setUpdateSettings = function (next) {
//   if (!this.option) {
//     this.option = {};
//   }
//   this.option.new = true;
//   this.option.runValidators = true;

//   if (next && typeof next === 'function') {
//     next();
//   }
// };
