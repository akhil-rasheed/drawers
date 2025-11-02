
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Drawer from '@/models/Drawer';

export async function GET(request: Request, context: any) {
  await dbConnect();
  try {
    const params = await context.params;
    const drawer = await Drawer.findById(params.id);
    if (!drawer) {
      return NextResponse.json({ success: false, error: 'Drawer not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: drawer });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
