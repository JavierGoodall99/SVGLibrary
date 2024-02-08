import fs from 'fs';
import path from 'path';
import React from 'react'
import {Embeddable} from "@/components/Embdeddabble/embeddable";
import {theme} from "@/Utils/utils";


interface Icons {
    [key: string]: string;
}

function page({params}: { params: any }) {
    const {tenant} = params;
    const iconsDir = path.join(process.cwd(), 'src', 'resources', 'icons');
    const iconFiles = fs.readdirSync(iconsDir);
    const icons: Icons = {};
    iconFiles.forEach((file) => {
        const iconName = file.replace('.svg', '');
        const iconPath = path.join(iconsDir, file);
        icons[iconName] = fs.readFileSync(iconPath, 'utf-8');
    });


    return <Embeddable theme={theme[tenant]} icons={icons}/>
}

export default page;

