"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

const argv = process.argv;

/** Reads the contents of a file at the given path and prints the contents
 * else throws an error
 *
 * @param {*} path
 */

async function cat(path) {
    try {
      const contents = await fsP.readFile(path, "utf8");
      console.log("path contents", contents);
    }
    catch (e) {
      console.error("error", e);
      process.exit(1);
    }
}


/** Reads the contents of a URL using axios and prints the contents
 * else throws an error  */
async function webCat(url) {
  try {
    const contents = await axios.get(url);
    console.log(contents.data);
  }
  catch (e) {
    console.error("error", e);
    process.exit(1);
  }
}

/** Check if argument is a file path or URL,
 *  calls either cat or webCat, respectively.  */
function readDoc(arg) {
  arg.includes("http") ? webCat(arg): cat(arg);
}

readDoc(argv[2]);
