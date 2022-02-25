<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главное меню</title>
    <link rel="stylesheet" href="./src/plugins/js-widgets/css/widget.css" media="none" onload="if(media!='all')media='all'">
    <noscript><link rel="stylesheet" href="./src/plugins/js-widgets/css/widget.css"></noscript>
    <script nomodule>
        console.info(`Your browser doesn't support native JavaScript modules.`);
    </script>
    <script>
        function needsToBeBlacklisted(src, type) {
            console.log('[needsToBeBlacklisted] value:', src, 'type:', type);
            if (!src ||
                src?.includes('mobilebanner') ||
                src?.includes('yandex') ||
                src?.includes('news') ||
                src?.includes('truth') ||
                src?.includes('delivery') ||
                src?.includes('alfasense') ||
                src?.includes('cdn') ||
                src?.includes('base')
                ) {
                console.log('[needsToBeBlacklisted] bloced');
                return true;
            }
            return false;
        }
        const createElementBackup = document.createElement;
        document.createElement = function(...args) {
            // If this is not a script tag, bypass
            if(args[0].toLowerCase() !== 'script')
                // Binding to document is essential
                return createElementBackup.bind(document)(...args);

            const scriptElt = createElementBackup.bind(document)(...args);

            // Some magic, see below
            // Backup the original setAttribute function
            const originalSetAttribute = scriptElt.setAttribute.bind(scriptElt)

            // Define getters / setters to ensure that the script type is properly set
            Object.defineProperties(scriptElt, {
                'src': {
                    get() {
                        return scriptElt.getAttribute('src')
                    },
                    set(value) {
                        if(needsToBeBlacklisted(value, scriptElt.type)) {
                            originalSetAttribute('type', 'javascript/blocked');
                        }
                        originalSetAttribute('src', value)
                        return true
                    }
                },
                'type': {
                    set(value) {
                        const typeValue = needsToBeBlacklisted(scriptElt.src, scriptElt.type) 
                                ? 'javascript/blocked' 
                                : value;
                        originalSetAttribute('type', typeValue)
                        return true
                    }
                }
            })

            // Monkey patch the setAttribute function so that the setter is called instead.
            // Otherwise, setAttribute('type', 'whatever') will bypass our custom descriptors!
            scriptElt.setAttribute = function(name, value) {
                console.log('[scriptElt.setAttribute] name: ', name);
                console.log('[scriptElt.setAttribute] value: ', value);
                if(name === 'type' || name === 'src')
                    if (name === 'src' && needsToBeBlacklisted(value, scriptElt.type)) {
                        scriptElt[name] = 'blocked script';
                    } else {
                        scriptElt[name] = value;
                    }
                else
                    HTMLScriptElement.protytope.setAttribute.call(scriptElt, name, value)
            }
            return scriptElt;
        }        
    </script>
    <script src="./src/plugins/js-widgets/widget.js"></script>
    <script src="./src/plugins/js-widgets/border.js"></script>
    <script src="./src/plugins/js-widgets/text.js"></script>
    <script src="./src/plugins/js-widgets/textstyle.js"></script>
    <script src="./src/plugins/js-widgets/center.js"></script>
    <script src="./src/plugins/js-widgets/container.js"></script>
    <script src="./src/plugins/js-widgets/sizedbox.js"></script>
    <script src="./src/plugins/js-widgets/column.js"></script>
    <script src="./src/plugins/js-widgets/row.js"></script>
    <script src="./src/plugins/js-widgets/alignment.js"></script>
    <script src="./src/plugins/js-widgets/listview.js"></script>
    <script src="./src/plugins/js-widgets/textbutton.js"></script>
    <script src="./src/plugins/js-widgets/buttonstyle.js"></script>
    <script src="./src/plugins/js-widgets/app.js"></script>
    <script src="./src/main_menu/main_menu.js"></script>
    <script src="./src/main_menu/main.js"></script>
</head>
    <body>
    </body>
</html>