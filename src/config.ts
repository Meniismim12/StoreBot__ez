import 'dotenv/config';

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in .env file');
}

if (!process.env.ADMIN_ID) {
  throw new Error('ADMIN_ID is missing in .env file');
}

if (!process.env.CHANNEL_ID) {
  throw new Error('CHANNEL_ID is missing in .env file');
}

export const config = {
  botToken: process.env.BOT_TOKEN,
  adminId: parseInt(process.env.ADMIN_ID, 10),
  channelId: process.env.CHANNEL_ID,
};
