import { NextResponse } from 'next/server';
import Group from '@/models/Group';
import User from '@/models/User';
import mongoose from 'mongoose';
import { db } from '@/utils/dbConnect';

export async function POST(req: Request) {
  await db();
  const { groupId, username, email } = await req.json();
  
  try {
    const group = await Group.findOne({ groupId });
    if (!group) {
      return Response.json({ error: 'Group not found' }, { status: 404 });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username, email });
    }

    group.members.push(user._id as mongoose.Types.ObjectId);  // Ensure correct typing
    user.groups.push(group._id as mongoose.Types.ObjectId);   // Ensure correct typing

    await group.save();
    await user.save();

    return Response.json({ message: 'Joined successfully!' });
  } catch (error) {
    return Response.json({ error: 'Error joining group' }, { status: 500 });
  }
}
