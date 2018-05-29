const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

// Logging
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

let hasDorpped = false;

// Setup
bot.on('ready', function(event) {
  logger.info('Connected');
  logger.info(`Logged in as ${bot.user.username}`);
});

// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.

bot.on('message', message => {
  if (message.content.toLowerCase().includes('dorp')) {
    logger.warn(hasDorpped);
    logger.info(message.author.username);
    // logger.info(channelID);
    logger.info(message.content);
    // logger.info(message.mentions.users);

    if (!hasDorpped) {
      if (message.content.toLowerCase().includes('goodnight, dorp bear')) {
        message.channel.send('Goodnight. Sleep well. I still won\'t care in the morning.', { files: ["http://scottelfstrom.com/stuff/dorp-bear.png"] });
      } else if (message.content.toLowerCase().includes('lame')) {
        message.channel.send("Lame? Don't care. You're lame, " + message.author.username + ".", { files: ["http://scottelfstrom.com/stuff/dorp-bear.png"] });
      } else if (message.content.toLowerCase().includes('bear needs killing')) {
        message.channel.send("I still love you, " + message.author.username + ".", { files: ["http://scottelfstrom.com/stuff/dorp-bear.png"] });
      } else if (message.content.toLowerCase().includes('dorp')) {
        message.channel.send("Don't care.", { files: ["http://scottelfstrom.com/stuff/dorp-bear.png"] });
      }

      hasDorpped = true;

      setTimeout(() => {
        logger.info('!hasDorpped');
        hasDorpped = false;
      }, 10000);
    }
  }

  });

bot.login(auth.token);
