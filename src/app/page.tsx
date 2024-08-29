'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast"


const joinGroupSchema = z.object({
  groupId: z.string().min(1, 'Group ID is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
});

const createGroupSchema = z.object({
  groupName: z.string().min(1, 'Group name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
});

export default function Home() {
  const { toast } = useToast()
  const [activeForm, setActiveForm] = useState<'join' | 'create' | null>(null);

  const {
    register: registerJoin,
    handleSubmit: handleSubmitJoin,
    formState: { errors: errorsJoin },
  } = useForm({
    resolver: zodResolver(joinGroupSchema),
  });

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
  } = useForm({
    resolver: zodResolver(createGroupSchema),
  });

  const handleJoinGroup = async (data: any) => {
    const res = await fetch('/api/group/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
   
    toast({
      title: "Error Ocurred",
      description: result.error,
      variant:'destructive'
    })
  };

  const handleCreateGroup = async (data: any) => {
    const res = await fetch('/api/group/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    toast({
      title: result.groupName,
      description: result.groupId,
      variant:'default'
    })
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">XSplit</h1>
      </header>
      <main className="w-full max-w-lg p-4">
        <Button
          onClick={() => setActiveForm(activeForm === 'join' ? null : 'join')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
        >
          Join Group
        </Button>
        {activeForm === 'join' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 mb-6 bg-white rounded-lg shadow-lg">
              <form onSubmit={handleSubmitJoin(handleJoinGroup)}>
                <div className="mb-4">
                  <label htmlFor="groupId" className="block text-gray-700">Group ID</label>
                  <Input
                    id="groupId"
                    {...registerJoin('groupId')}
                    placeholder="Enter Group ID"
                    className="mt-2"
                  />
                  {errorsJoin.groupId?.message && typeof errorsJoin.groupId.message === 'string' && (
                    <p className="text-red-500">{errorsJoin.groupId.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700">Username</label>
                  <Input
                    id="username"
                    {...registerJoin('username')}
                    placeholder="Enter Username"
                    className="mt-2"
                  />
                  {errorsJoin.username?.message && typeof errorsJoin.username.message === 'string' && (
                    <p className="text-red-500">{errorsJoin.username.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <Input
                    id="email"
                    {...registerJoin('email')}
                    type="email"
                    placeholder="Enter Email"
                    className="mt-2"
                  />
                  {errorsJoin.email?.message && typeof errorsJoin.email.message === 'string' && (
                    <p className="text-red-500">{errorsJoin.email.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Join Group
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        <Button
          onClick={() => setActiveForm(activeForm === 'create' ? null : 'create')}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Create Group
        </Button>
        {activeForm === 'create' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Card className="p-6 bg-white rounded-lg shadow-lg">
              <form onSubmit={handleSubmitCreate(handleCreateGroup)}>
                <div className="mb-4">
                  <label htmlFor="groupName" className="block text-gray-700">Group Name</label>
                  <Input
                    id="groupName"
                    {...registerCreate('groupName')}
                    placeholder="Enter Group Name"
                    className="mt-2"
                  />
                  {errorsCreate.groupName?.message && typeof errorsCreate.groupName.message === 'string' && (
                    <p className="text-red-500">{errorsCreate.groupName.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700">Username</label>
                  <Input
                    id="username"
                    {...registerCreate('username')}
                    placeholder="Enter Username"
                    className="mt-2"
                  />
                  {errorsCreate.username?.message && typeof errorsCreate.username.message === 'string' && (
                    <p className="text-red-500">{errorsCreate.username.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <Input
                    id="email"
                    {...registerCreate('email')}
                    type="email"
                    placeholder="Enter Email"
                    className="mt-2"
                  />
                  {errorsCreate.email?.message && typeof errorsCreate.email.message === 'string' && (
                    <p className="text-red-500">{errorsCreate.email.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  OK
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
