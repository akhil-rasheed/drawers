
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Drawer from '@/models/Drawer';

export async function PATCH(request: Request, context: any) {
  await dbConnect();
  try {
    const params = await context.params;
    const drawer = await Drawer.findByIdAndUpdate(
      params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!drawer) {
      return NextResponse.json({ success: false, error: 'Drawer not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: drawer });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
  }
}
