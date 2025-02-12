import fs from "fs";
import axios from "axios";
import path from "path";

function getImageKey(url) {
  const split = url.split("/");
  const key = split[split.length - 1];
  const imagePrefix = split[split.length - 2];
  const keyItems = key.split("?");
  const imageKey = keyItems[0];
  return `${imagePrefix}/${imageKey}`;
}

function getPathName(url, pathName = "downloads") {
  let reqPath = path.join(__dirname, "..");
  let key = getImageKey(url);
  key = key.replace(/%/g, "");
  const rawPath = `${reqPath}/public/${pathName}/${key}`;
  return rawPath;
}

async function downloadImage(url) {
  console.log("*** DOWNLOAD IMAGE ***");
  console.log("url", url);
  return new Promise(async (resolve, reject) => {
    const path = getPathName(url);
    console.log("path", path);
    const writer = fs.createWriteStream(path);
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

export default downloadImage;
