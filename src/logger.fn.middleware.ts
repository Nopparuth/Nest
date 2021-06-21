export const loggerFn = (req, res, next) => {
  console.log('req 555 : ');
  next();
};
