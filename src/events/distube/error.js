const  { DisTube } = require("distube");

module.exports = {
    name: 'error',
    async execute(textChannel, error) {
        textChannel.send(`ERROR!!!!: ${error.slice(0, 1979)}`);
         
    }
}