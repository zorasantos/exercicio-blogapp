if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: 'mongodb://blogdozora:a12345@ds233167.mlab.com:33167/blogapp-zora'}
}else{
    module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}    