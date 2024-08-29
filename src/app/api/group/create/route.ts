import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import Group from '@/models/Group';
import User from '@/models/User';
import mongoose from 'mongoose';
import { db } from '@/utils/dbConnect';

export async function POST(req: Request) {
  await db();
  const { groupName, username, email } = await req.json();
  const groupId = uuidv4();

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username, email });
      await user.save();
    }

    const group = new Group({ groupName, groupId });
    group.members.push(user._id as mongoose.Types.ObjectId);  // Ensure correct typing
    user.groups.push(group._id as mongoose.Types.ObjectId);   // Ensure correct typing

    await group.save();
    await user.save();

    return Response.json({ groupId, groupName });
  } catch (error) {
    return Response.json({ error: 'Error creating group' }, { status: 500 });
  }
}
