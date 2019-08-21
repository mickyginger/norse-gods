export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item._id] = item
    return obj
  }, {})

export const objectToArray = (obj) =>
  Object.keys(obj).reduce((array, id) => {
    return array.concat(obj[id])
  }, [])
