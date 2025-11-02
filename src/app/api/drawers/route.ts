
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Drawer from '@/models/Drawer';

export async function GET() {
  await dbConnect();
  try {
    const drawers = await Drawer.find({ status: 'approved' }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: drawers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const drawer = await Drawer.create(body);
    return NextResponse.json({ success: true, data: drawer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
