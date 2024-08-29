import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IExpense extends Document {
  _id: Types.ObjectId;
  description: string;
  amount: number;
  date: Date;
  paidBy: Types.ObjectId;
  group: Types.ObjectId;
  splitAmong: Types.ObjectId[];
}

const ExpenseSchema: Schema<IExpense> = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  splitAmong: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;
