
//const Projects = require('./projects/projects-model');

function logger(req, res, next) {
    // DO YOUR MAGIC
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    console.log('request method: ', method);
    console.log('request url: ', url);
    console.log('request timestamp: ', formatted_date);
    next();
}


module.exports = {
    logger,
    
}