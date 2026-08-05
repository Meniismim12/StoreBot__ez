import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { config } from "./config";
import { MyContext } from "./types/context";
import { postProduct } from "./conversations/post-product";

const bot = new Bot<MyContext>(config.botToken);

// Session va Conversation-larni ulash
bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

// Mahsulot qo'shish muloqotini ro'yxatdan o'tkazish
bot.use(createConversation(postProduct));

// Faqat admin uchun ruxsat berish middleware
bot.use(async (ctx, next) => {
  if (ctx.from?.id !== config.adminId) {
    return; // Admin bo'lmasa javob bermaydi
  }
  await next();
});

// Buyruqlar
bot.command("start", async (ctx) => {
  await ctx.reply("Assalomu alaykum Admin! Yangi mahsulot qo'shish uchun /post buyrug'ini bering.");
});

bot.command("post", async (ctx) => {
  await ctx.conversation.enter("postProduct");
});

// Botni ishga tushirish
bot.start().then(() => {
  console.log("Bot muvaffaqiyatli ishga tushdi...");
});

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
