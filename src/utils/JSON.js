exports.parseJSON = stringLikeJSON => new Function(`return ${stringLikeJSON}`)() // eslint-disable-line no-new-func

exports.stringify = jsonObj => JSON.stringify(jsonObj, null, 2)
