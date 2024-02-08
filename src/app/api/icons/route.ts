import fs from 'fs';
import path from 'path';
import cheerio from "cheerio";

interface Icons {
  [key: string]: {
    name: string;
    category: string[];
    icon: string;
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


  iconFiles.forEach((file) => {
    const iconName = file.replace('.svg', '');
    const iconPath = path.join(iconsDir, file);
    const iconContent = fs.readFileSync(iconPath, 'utf-8');

    const metadataMatch = iconContent.match(/<metadata>([\s\S]+?)<\/metadata>/);
    const metadata = metadataMatch ? metadataMatch[1] : '';
    const categories = metadata.match(/<category>(.*?)<\/category>/g)?.map((category) =>
      category.replace(/<\/?category>/g, '')
    );


    icons[iconName] = {
      name: iconName,
      category: categories || [],
      icon: iconContent,
    };
  });
  function replaceSVGStyle(svgString: string, newStyle: string): string {
    const $ = cheerio.load(svgString, { xmlMode: true });
    $("style").text(newStyle);
    return $.xml();
  }

  const iconJSON = Object.keys(icons).map((key) => {
    let iconString = icons[key].icon;

    if (stroke !== null || fill !== null) {
      iconString = replaceSVGStyle(iconString,`.cls-1 {fill: #${fill ? fill : "000000"};stroke-miterlimit: ${stroke ? stroke : "3"};}`);
    }

    return {
      name: icons[key].name,
      category: icons[key].category,
      icon: iconString,
    };
  });

  const responseJSON = JSON.stringify(iconJSON);
  return new Response(responseJSON, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
