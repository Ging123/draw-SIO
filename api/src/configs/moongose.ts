const moongose = require('mongoose');

export default async function connectToMoongo() {
  await moongose.connect(process.env.DB_URL!, {
    useNewUrlParser:true, 
    useUnifiedTopology:true
  });
}