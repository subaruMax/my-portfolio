import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { THEME_COOKIE_NAME } from '@app/constants/cookies';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const isLightTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = { hello: 'WORLD', id, isLightTheme };

  return NextResponse.json({ data });
}
