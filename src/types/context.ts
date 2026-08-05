import { Context, SessionFlavor } from "grammy";
import { Conversation, ConversationFlavor } from "@grammyjs/conversations";

export interface SessionData {
  product: {
    photo?: string;
    video?: string;
    name: string;
    description: string;
    price: string;
    sizes: string;
    seasonMaterial: string;
    color: string;
    brandCountry: string;
    promotion: string;
    delivery: string;
    contact: string;
  };
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
