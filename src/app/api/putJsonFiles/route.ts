import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    try {
        const profilesFolderPath = join(process.cwd(), 'src', 'Utils', 'Profiles');
        const { fileName, fileContent } = await request.json();
        const filePath = join(profilesFolderPath, `${fileName}.json`);
        const existingContent = await readFile(filePath, 'utf-8');
        const parsedContent = JSON.parse(existingContent);
        const updatedContent = { ...parsedContent, ...fileContent };

        await writeFile(filePath, JSON.stringify(updatedContent, null, 2), { encoding: 'utf-8' });

        return NextResponse.json({ success: true, message: 'File updated successfully' });
    } catch (error) {
        console.error('Error updating JSON file:', error);
        return NextResponse.json({ error: 'Failed to update JSON file' }, { status: 500 });
    }
}

