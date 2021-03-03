const httpStatus = require('http-status-codes');

 exports.send = async (response, data, success, fail) => {
  let isSuccess = (data && data.status) || (data && data.success)
  let message = (data && data.message) || (data && data.msg)
  let theData = (data && data.data) || data
  let dataTotal = data && data.total
  
     return response.status(isSuccess ? httpStatus[success] : httpStatus[fail]).send({
     status: isSuccess ? 'success' : 'error',
     message: message,
     data: theData,
     total: dataTotal
    })
  
}
