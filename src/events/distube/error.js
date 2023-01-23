const  { DisTube } = require("distube");

module.exports = {
    name: 'error',
    async execute(textChannel, error) {
        textChannel.send(`ERROR!!!!: ${error.toString().slice(0, 1979)}`);
         
    }
}