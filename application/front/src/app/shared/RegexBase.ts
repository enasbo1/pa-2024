export const RegexBase = {
  all:new RegExp('.*'),
  tel:new RegExp("^[0-9]{10}$"),
  code_postal: new RegExp("^[0-9]{5}$"),
  email:new RegExp('^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
}
