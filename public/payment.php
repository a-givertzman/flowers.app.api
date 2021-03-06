<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Оплата</title>
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
    <link rel="icon" href="./public/img/favicon.png">
    <link rel="stylesheet" href="./src/plugins/select2-4.1.0-rc.0/dist/css/select2.min.css">
    <!-- <link rel="stylesheet" href="./src/plugins/busy-indicator/busy.css"> -->
    <link rel="stylesheet" href="./public/css/style.css">
    <script src="./src/payment/payment_app.js" type="module"></script>

</head>
<body>
    <div class="busy-indicator busy-indicator-hide">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <header class="header">
        <div class="header-top">
            <div class="container">
                <div class="header-contacts">
                    <a class="header-phone" href="tel:+7 (555) 555 55 55">+7 (555) 555 55 55</a>
                    <a class="header-email" href="#">our_email@gmail.com</a>
                    <!-- <a class="header-btn" href="#">Бесплатная консультация</a> -->
                </div>
            </div>
        </div>
    </header>
    <section class="purchase-selector">
        <div class="container">
            <div class="purchase-selector-top">
                <div class="purchase-selector-title-box">
                    <div class="purchase-selector-title">
                        Проведение оплаты по закупке
                    </div>
                    <div class="purchase-selector-search">
                        <select multiple="multiple" class="search-purchase-select" name="purchase-selector">
                            <option></option>
                        </select>                    
                    </div>
                </div>
            </div>
            <table class="purchase-items">
            </table>
            <table class="purchase-clients">
            </table>
            <div class="purchase-selector-btn-cover">
                <a id="purchase-selector-btn" href="#" class="default-btn-black disabled">Провести оплату</a>
            </div>
        </div>
    </section>
    <footer class="footer">
        <div class="container">
            <div class="footer-box">
                <div class="footer-box-about">
                    <div class="footer-box-title">
                        Кратко о нас
                    </div>
                    <div class="footer-box-text">
                        Краткая инфа о нас и чем мы полезны
                    </div>
                    <!-- <a class="footer-box-btn" href="#">Бесплатная консультация</a> -->
                </div>
                <div class="footer-box-info">
                    <ul class="footer-box-contacts">
                        <li><a class="footer-box-phone" href="tel:+7 (555) 555 55 55">+7 (555) 555 55 55</a></li>
                        <li><a class="footer-box-email" href="#">our_email@gmail.com</a></li>
                        <li><a class="footer-box-address" href="#">Казань, ул. Гороховая, 111</a></li>
                    </ul>
                    <div class="footer-box-info-map">
                        <div style="position:relative;overflow:hidden;">
                            </iframe>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-copyrights">
            ® 2021 Created by Anton Lobanov. All rights reserved
        </div>
    </footer>
</body>
</html>