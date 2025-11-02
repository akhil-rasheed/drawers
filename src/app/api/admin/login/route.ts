
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const hash = process.env.ADMIN_PASSWORD_HASH;

    if (!hash) {
      throw new Error('ADMIN_PASSWORD_HASH is not set');
    }

    console.log('Password:', password);
    console.log('Hash:', hash);
    const match = await bcrypt.compare(password, hash);

    if (match) {
      // In a real app, you'd set a cookie or token here
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
