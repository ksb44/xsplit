import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IGroup extends Document {
  _id: Types.ObjectId;
  groupName: string;
  groupId: string;
  members: Types.ObjectId[];
  expenses: Types.ObjectId[];
}

const GroupSchema: Schema<IGroup> = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
});

const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);
export default Group;
