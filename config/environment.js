const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/norse-gods-${env}`
const secret = process.env.SECRET || 'TgsAj/L,&^Lpsjt$p'

module.exports = { port, env, dbURI, secret }
