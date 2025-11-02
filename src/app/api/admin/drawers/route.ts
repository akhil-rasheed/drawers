
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Drawer from '@/models/Drawer';

export async function GET() {
  await dbConnect();
  try {
    const drawers = await Drawer.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: drawers });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
  }
}
