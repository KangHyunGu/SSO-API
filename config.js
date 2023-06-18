const production = {
    PORT : 3000,
    DB : {
        host : "localhost",
        port : 3306,
        user : 'bnbsso',
        password : 'test1234',
        database : 'bnb_sso_api'
    },
    REDIS : {
        host: 'localhost',
        port: 6379
    },
    JWT : {
        option : {
          algorithm : 'HS256',
          issuer : 'kang'
        },
        SECRET : 'c65d79d6-cbc6-4fcf-92fe-f6cb67d97ddd'
    }
}

const development = {
    PORT : 20200,
    DB : {
        host : "localhost",
        port : 3306,
        user : 'bnbsso',
        password : 'test1234',
        database : 'bnb_sso_api'
    },
    REDIS : {
        host: 'localhost',
        port: 6379
    },
    JWT : {
        option : {
          algorithm : 'HS256',
          issuer : 'kang'
        },
        SECRET : 'c65d79d6-cbc6-4fcf-92fe-f6cb67d97ddd'
    }
}


module.exports = process.env.NODE_ENV !== 'production' 
    ? development
    : production