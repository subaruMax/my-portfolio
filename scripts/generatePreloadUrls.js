const path = require('path');
const fs = require('fs');

const files = [];
const mediaPath = path.resolve(__dirname, '../public', 'media');

function getFilesInDirectories(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      return getFilesInDirectories(filePath);
    } else {
      return files.push(filePath);
    }
  });
}

function removePrefix(str, keyWord) {
  if (!str.includes(keyWord)) {
    throw new Error(`${keyWord} does not exist!`);
  }

  const result = str.split(keyWord);

  return keyWord + result[1];
}

const normalizePaths = (urlsArray, splitKey) => {
  return urlsArray.map(url => removePrefix(url, splitKey));
};

const buildFilesList = urlsArray => {
  const images = urlsArray.filter(url =>
    url.match(/\.(png)?(svg)?(jpg)?(jpeg)?(gif)?(webp)?$/gi)
  );

  const videos = urlsArray.filter(url => url.match(/\.(mp4)/gi));

  return { images, videos };
};

getFilesInDirectories(mediaPath);

const normalized = normalizePaths(files, '/media/');

const filesList = JSON.stringify(buildFilesList(normalized));

fs.writeFileSync(path.resolve(mediaPath, 'media-preload-urls.json'), filesList);
console.log(
  `\x1b[40m\x1b[32m----- ✅ Generated preload media urls list ✅ -----`
);
