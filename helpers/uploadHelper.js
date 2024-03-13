const readFile = (data, api, statusCode) => {
    let originalUrl = data.originalurl
    let statuscode = data.statuscode

    // Check the Api Url and Add that in api Variable
    if(!api.includes(originalUrl)){
        api.push(originalUrl)
    }

    // Check the Status Code and Add that in statusCode variable
    if(!statusCode.includes(statuscode)){
        statusCode.push(statuscode)
    }
}

export { readFile }