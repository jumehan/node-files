"use strict";

const fsP = require("fs/promises");

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

cat(argv[2]);