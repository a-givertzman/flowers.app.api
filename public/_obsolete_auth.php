<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Авторизация</title>
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
    <!-- For IE 9 and below. ICO should be 32x32 pixels in size -->
    <!--[if IE]><link rel="shortcut icon" href="path/to/favicon.ico"><![endif]-->

    <!-- Touch Icons - iOS and Android 2.1+ 180x180 pixels in size. --> 
    <!-- <link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png"> -->

    <!-- Firefox, Chrome, Safari, IE 11+ and Opera. 196x196 pixels in size. -->
    <link rel="icon" href="./public/img/favicon.png">
    <link rel="stylesheet" href="./src/plugins/js-widgets/css/widget.css" media="none" onload="if(media!='all')media='all'">
    <noscript><link rel="stylesheet" href="./src/plugins/js-widgets/css/widget.css"></noscript>
    <script nomodule>
        console.info(`Your browser doesn't support native JavaScript modules.`);
    </script>
    <script src="./src/auth/main.js" type="module"></script>
</head>
    <body>
    </body>
</html>