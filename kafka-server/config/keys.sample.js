module.exports = {
    redirectUrl:'http://localhost:3000',
    google: {
        clientID: '',
        clientSecret: '',
        callbackUrl:'http://localhost:5000/auth/google/redirect'
    },
    mongodb: {
        dbURI: 'localhost:27017'
    },
    session: {
        cookieKey: 'thisiskafkaapp'
    },
    github:{
     clientId:'',
     clientSecret:'',
     callbackUrl:'/auth/github/redirect'
    },
    facebook:{
        clientId:'',
        clientSecret:'',
        callbackUrl:'/auth/facebook/redirect'
       }
}
