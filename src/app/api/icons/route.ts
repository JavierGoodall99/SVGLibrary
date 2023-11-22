import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Icons {
  [key: string]: {
    name: string;
    category: string[];
    icon: string;
    style: string;
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const fill = queryParams.get('fill');
  const stroke = queryParams.get('stroke');

  const iconsDir = path.join(process.cwd(), 'src', 'resources', 'icons');
  const iconFiles = fs.readdirSync(iconsDir);

  const icons: Icons = {};

  console.log(fill, stroke);

  iconFiles.forEach((file) => {
    const iconName = file.replace('.svg', '');
    const iconPath = path.join(iconsDir, file);
    const iconContent = fs.readFileSync(iconPath, 'utf-8');

    const metadataMatch = iconContent.match(/<metadata>([\s\S]+?)<\/metadata>/);
    const metadata = metadataMatch ? metadataMatch[1] : '';
    const categories = metadata.match(/<category>(.*?)<\/category>/g)?.map((category) =>
      category.replace(/<\/?category>/g, '')
    );

    const styleMatch = iconContent.match(/<style>([\s\S]+?)<\/style>/);
    const style = styleMatch ? styleMatch[1] : '';

    icons[iconName] = {
      name: iconName,
      category: categories || [],
      icon: iconContent,
      style: style,
    };
  });

  const iconJSON = Object.keys(icons).map((key) => {
    let iconString = icons[key].icon;
    if (stroke !== null && fill !== null) {
      // Apply your stroke and fill logic here
    }

    return {
      name: icons[key].name,
      category: icons[key].category,
      icon: iconString,
      style: icons[key].style,
    };
  });

  const responseJSON = JSON.stringify(iconJSON);
  return new Response(responseJSON, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
