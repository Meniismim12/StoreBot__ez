import { InlineKeyboard } from "grammy";
import { MyContext, MyConversation } from "../types/context";
import { config } from "../config";

export async function postProduct(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Yaxshi, yangi mahsulot qo'shamiz. Birinchi bo'lib mahsulotning rasmi yoki videosini yuboring:");

  const mediaCtx = await conversation.waitFor([":photo", ":video"]);
  const photo = mediaCtx.message?.photo;
  const video = mediaCtx.message?.video;

  await ctx.reply("Mahsulot nomini kiriting:");
  const productName = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Tavsif (agar yo'q bo'lsa '-'):");
  const description = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Narxi (agar yo'q bo'lsa '-'):");
  const price = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("O'lchamlari (masalan: S, M, L; agar yo'q bo'lsa '-'):");
  const sizes = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Mavsumi va materiali (agar yo'q bo'lsa '-'):");
  const seasonMaterial = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Rangi (agar yo'q bo'lsa '-'):");
  const color = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Brend va ishlab chiqarilgan davlat (agar yo'q bo'lsa '-'):");
  const brandCountry = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Aksiya yoki chegirma (agar yo'q bo'lsa '-'):");
  const promotion = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Yetkazib berish shartlari (agar yo'q bo'lsa '-'):");
  const delivery = (await conversation.waitFor(":text")).message!.text!;

  await ctx.reply("Buyurtma uchun kontakt (link yoki username; agar yo'q bo'lsa '-'):");
  const contact = (await conversation.waitFor(":text")).message!.text!;

  const caption = `🛍 **${productName}**
${description !== "-" ? `\n📝 ${description}` : ""}
${price !== "-" ? `\n💰 **Narxi:** ${price}` : ""}
${sizes !== "-" ? `\n📏 **O'lchamlari:** ${sizes}` : ""}
${seasonMaterial !== "-" ? `\n🍂/🧵 **Mavsumi/Material:** ${seasonMaterial}` : ""}
${color !== "-" ? `\n🎨 **Rangi:** ${color}` : ""}
${brandCountry !== "-" ? `\n🏢 **Brend/Davlat:** ${brandCountry}` : ""}
${promotion !== "-" ? `\n🎁 **Aksiya:** ${promotion}` : ""}
${delivery !== "-" ? `\n🚚 **Yetkazib berish:** ${delivery}` : ""}
${contact !== "-" ? `\n📲 **Buyurtma:** ${contact}` : ""}`;

  await ctx.reply("Mahsulot tayyor! Uni kanalga joylaymizmi?", {
    reply_markup: new InlineKeyboard()
      .text("✅ Tasdiqlash", "confirm_post")
      .text("❌ Bekor qilish", "cancel_post"),
  });

  const { callbackQuery } = await conversation.waitFor("callback_query:data");

  if (callbackQuery.data === "confirm_post") {
    if (photo) {
      await ctx.api.sendPhoto(config.channelId, photo[photo.length - 1].file_id, { caption, parse_mode: "Markdown" });
    } else if (video) {
      await ctx.api.sendVideo(config.channelId, video.file_id, { caption, parse_mode: "Markdown" });
    }
    await ctx.answerCallbackQuery("Kanalga joylandi!");
    await ctx.reply("✅ Mahsulot muvaffaqiyatli kanalga joylandi!");
  } else {
    await ctx.answerCallbackQuery("Bekor qilindi");
    await ctx.reply("❌ Amaliyot bekor qilindi.");
  }
}
