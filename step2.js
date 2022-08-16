"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
const { readFile } = require("fs");

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
    console.log(contents);
  }
  catch (e) {
    console.error("error", e.code)
    process.exit(1)
  }
}

/** Check if argument is a file path or URL,
 *  calls either cat or webCat, respectively.  */
async function readDoc(arg) {
  arg = argv[2]
  if (arg.includes("http")){
    await webCat(arg)
  }
  else {
    await cat(arg)
  }
}

readDoc()
