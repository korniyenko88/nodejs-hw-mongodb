export const hendelSaveError = (error, doc, next) => {
    error.status = 400;
    next();
};

export const setUpdateSettings = function (next) {
    this.option.new = true;
    this.option.runValidators = true;
};