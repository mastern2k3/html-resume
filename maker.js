const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
const pug  = require('pug');

try {
    
    const docs =
        yaml.safeLoadAll(
            fs.readFileSync(
                path.join(__dirname, 'cv.yml'), 'utf8'));
    
    let model = {
        info: docs[0],
        pages: [
            { sections: docs.slice(1, 3) },
            { sections: docs.slice(3) }
        ]
    };

    let rendered = pug.renderFile('main.pug', model);
    
    fs.writeFileSync(path.join(__dirname, 'rendered.htm'), rendered, 'utf8');

    console.log('Done');

} catch (e) {

    console.error(e);
}
