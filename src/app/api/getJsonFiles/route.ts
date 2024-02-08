import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const profilesFolderPath = './src/Utils/Profiles';

    const files = await readdir(profilesFolderPath);

    const jsonFiles = await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = join(profilesFolderPath, file);
          const fileContent = await readFile(filePath, 'utf-8');
          return { name: file, content: JSON.parse(fileContent) };
        })
    );

    return NextResponse.json({ jsonFiles });
  } catch (error) {
    console.error('Error reading JSON files:', error);
    return NextResponse.json({ error: 'Failed to retrieve JSON files' }, { status: 500 });
  }
}
