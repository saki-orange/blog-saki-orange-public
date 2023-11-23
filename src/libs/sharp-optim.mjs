import fs from "fs";
import path from "path";
import sharp from "sharp";

let dirName = `contents/images`;

/**
 * @param {string} file
 * @returns {string}
 */
function getExtension(file) {
  let ext = path.extname(file || "").split(".");
  return ext[ext.length - 1];
}

/**
 *
 * @param {string} folderPath
 * @param {(items: string[]) => void} finishFunc
 */
const readSubDir = (folderPath, finishFunc) => {
  let result = [];
  let execCounter = 0;

  /**
   *
   * @param {string} folderPath
   */
  const readTopDir = (folderPath) => {
    execCounter += 1;
    fs.readdir(folderPath, (err, items) => {
      if (err) {
        console.log(err);
      }

      items = items.map((itemName) => {
        return path.join(folderPath, itemName);
      });

      items.forEach((itemPath) => {
        if (fs.statSync(itemPath).isFile()) {
          result.push(itemPath);
        }
        if (fs.statSync(itemPath).isDirectory()) {
          readTopDir(itemPath);
        }
      });

      execCounter -= 1;

      if (execCounter === 0) {
        if (finishFunc) {
          finishFunc(result);
        }
      }
    });
  };

  readTopDir(folderPath);
};

readSubDir(dirName, (items) => {
  items.forEach((item) => {
    const pathName = path.dirname(item);
    const fileName = path.basename(item);
    const fileFormat = getExtension(fileName);

    let outPutDir = `${pathName.replace("contents/images", "public/images/posts")}`;

    if (!fs.existsSync(outPutDir)) {
      fs.mkdirSync(outPutDir);
    }

    if (fileFormat === "") {
      console.log(`\u001b[1;31m 対応していないファイルです。-> ${fileName}`);
      return;
    } else if (fileFormat === "svg" || fileFormat === "gif") {
      fs.copyFile(item, `${outPutDir}/${fileName}`, (err) => {
        if (err) {
          return;
        }
        console.log(`\u001b[1;32m ${fileName}を${outPutDir}に複製しました。`);
      });
      return;
    }

    let webp = sharp(`${pathName}/${path.basename(item)}`);

    if (fileFormat === "jpg" || fileFormat === "jpeg") {
      webp = webp.webp({ quality: 70 });
    } else if (fileFormat === "png") {
      webp = webp.webp({ quality: 70 });
    } else {
      console.log(`\u001b[1;31m 対応していないファイルです。-> ${fileName}`);
      return;
    }

    webp.toFile(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, ".webp")}`, (err, info) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`\u001b[1;32m ${fileName}をwebpに変換しました。 ${info.size / 1000}KB`);
    });
  });
});
