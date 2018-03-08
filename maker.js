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
        sections: docs.slice(1, 3)
    };

    let rendered = pug.renderFile('main.pug', model);
    
    fs.writeFileSync(path.join(__dirname, 'rendered_main.htm'), rendered, 'utf8');

    model = {
        info: docs[0],
        sections: docs.slice(3)
    };

    rendered = pug.renderFile('main.pug', model);
    
    fs.writeFileSync(path.join(__dirname, 'rendered_back.htm'), rendered, 'utf8');

    // console.log(doc);
    console.log('noooice~');

} catch (e) {

    console.log(e);
}
