const fs = require('fs');
const path = require('path');

function getDirectories(baseDir) {
    let directories = [];

    fs.readdirSync(baseDir).forEach(file => {
        // Skip files starting with a dot
        if (file.startsWith('.')) {
            return;
        }

        let fullPath = path.join(baseDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            let indexPath = path.join(fullPath, 'index.html');
            if (fs.existsSync(indexPath)) {
                directories.push(fullPath);
            }
        }
    });

    return directories;
}

function createIndexFile(baseDir) {
    let directories = getDirectories(baseDir);
    let iframes = directories.map((dir, index) => `
        <div id="iframe${index}" class="iframe">
            <iframe src="${path.relative(baseDir, dir)}/index.html" width="100%" height="100%" "></iframe>
            <button class="prev">&larr;</button>
            <button class="next">&rarr;</button>
        </div>
    `);

let html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        .iframe-grid {
            position: relative;
        }
        .iframe {
            position: relative;
            width: 100%;
            height: 900px;
            opacity: 0;
            transition: opacity 1s;
            pointer-events: none;
            display: none;
        }
        .iframe.active {
            opacity: 1;
            animation: slideIn 1s ease-in-out, fadeIn 1s;
            pointer-events: auto;
            display: block;
        }
        .prev, .next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: #fff;
            border: none;
            cursor: pointer;
        }
        .prev {
            left: 10px;
        }
        .next {
            right: 10px;
        }
        .overlay {
            position: absolute;
            bottom: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            text-align: center;
        }
        .caption {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            padding: 10px 0;
        }
    </style>
</head>
<body>
    <div class="iframe-grid">
        ${iframes.join('\n        ')}
    </div>
    <script>
        var currentIframe = 0;
        var iframes = document.getElementsByClassName('iframe');
        iframes[currentIframe].classList.add('active');

        setInterval(function() {
            iframes[currentIframe].classList.remove('active');
            currentIframe = (currentIframe + 1) % iframes.length;
            iframes[currentIframe].classList.add('active');
        }, 3000);

        Array.from(document.getElementsByClassName('prev')).forEach((button, index) => {
            button.addEventListener('click', function() {
                iframes[currentIframe].classList.remove('active');
                currentIframe = (currentIframe - 1 + iframes.length) % iframes.length;
                iframes[currentIframe].classList.add('active');
            });
        });

        Array.from(document.getElementsByClassName('next')).forEach((button, index) => {
            button.addEventListener('click', function() {
                iframes[currentIframe].classList.remove('active');
                currentIframe = (currentIframe + 1) % iframes.length;
                iframes[currentIframe].classList.add('active');
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(baseDir, 'index.html'), html);
}

createIndexFile('./');  // replace './' with your root directory
