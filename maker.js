const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
const pug  = require('pug');

try {
    
    const docs =
        yaml.safeLoadAll(
            fs.readFileSync(
                path.join(__dirname, 'cv.yml'), 'utf8'));
    
    const sections = docs.slice(1);
    const pagesObj = {};

    sections.forEach(section => {

        if (!(section.page in pagesObj))
            pagesObj[section.page] = [];
        
        pagesObj[section.page].push(section);
    });
    
    let pageIdx = 1;
    const pages = [];

    do {

        pages.push({ sections: pagesObj[pageIdx] });

    } while (++pageIdx in pagesObj);

    const model = {
        info: docs[0],
        pages: pages
    };

    const rendered = pug.renderFile('main.pug', model);
    
    fs.writeFileSync(path.join(__dirname, 'rendered.htm'), rendered, 'utf8');

    console.log('Done');

} catch (e) {

    console.error(e);
}
