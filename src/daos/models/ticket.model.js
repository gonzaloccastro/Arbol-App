import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { 
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    },
});

export const TicketModel = mongoose.model(ticketCollection,ticketSchema);