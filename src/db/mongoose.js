const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/movietime-api', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })

mongoose.connect(`mongodb://${process.env.MONGO_PW}@ds125381.mlab.com:25381/movietime-api`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})