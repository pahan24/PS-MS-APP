import system from '../../lib/system.js';
import config from '../../config.js';

export default [
  {
    name: 'system',
    category: 'tools',
    description: 'Show bot system information.',
    usage: 'system',
    cooldown: 10,
    async execute({ sock, msg, jid }) {
      await sock.sendMessage(jid, { text: system.getSystemInfo(), quoted: msg });
    },
  },

  {
    name: 'owner',
    category: 'tools',
    description: 'Show owner contact information.',
    usage: 'owner',
    cooldown: 30,
    async execute({ sock, msg, jid }) {
      await sock.sendMessage(jid, {
        text: `👑 *Bot Owner*\n\n📛 *Name:* ${config.ownerName}\n📞 *Number:* +${config.ownerNumber}`,
        quoted: msg,
      });
    },
  },

  {
    name: 'bot',
    category: 'tools',
    description: 'Show bot information.',
    usage: 'bot',
    cooldown: 10,
    async execute({ sock, msg, jid, commands, settings }) {
      const prefix = settings.prefix || config.prefix;
      await sock.sendMessage(jid, {
        text: [
          `🤖 *${config.botName}*`,
          `👑 Owner: ${config.ownerName}`,
          `📌 Version: v${config.botVersion}`,
          `⌨️ Prefix: ${prefix}`,
          `🌐 Mode: ${(settings.mode || config.mode).toUpperCase()}`,
          `📦 Commands: ${commands.size}`,
          `⏱️ Uptime: ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m`, 
          `🟢 Node.js: ${process.version}`,
        ].join('\n'),
        quoted: msg,
      });
    },
  },
];
