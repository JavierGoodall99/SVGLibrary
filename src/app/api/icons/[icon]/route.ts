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

    const icon = url.pathname.split('/').pop();
    const fileName = icon && icon?.charAt(0).toUpperCase() + icon?.slice(1)



    const iconsDir = path.join(process.cwd(), 'src', 'resources', 'icons');


    const iconName = fileName
    const iconPath = path.join(iconsDir, fileName+".svg");
    let iconContent = fs.readFileSync(iconPath, 'utf-8');
    const metadataMatch = iconContent.match(/<metadata>([\s\S]+?)<\/metadata>/);
    const metadata = metadataMatch ? metadataMatch[1] : '';
    const categories = metadata.match(/<category>(.*?)<\/category>/g)?.map((category) =>
        category.replace(/<\/?category>/g, '')
    );

    function replaceSVGStyle(svgString: string, newStyle: string): string {
        const $ = cheerio.load(svgString, { xmlMode: true });
        $("style").text(newStyle);
        return $.xml();
    }
    iconContent = replaceSVGStyle(iconContent,`.cls-1 {fill: #${fill ? fill : "000000"};stroke-miterlimit: ${stroke ? stroke : "3"};}`);


    const iconData ={
        name: iconName,
        category: categories || [],
        icon: iconContent,
    };

    const responseJSON = JSON.stringify(iconData);
    return new Response(responseJSON, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
