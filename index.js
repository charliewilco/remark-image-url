import { visit } from "unist-util-visit";

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {Object} Options
 * @property {string} absolutePath - Image prefix.
 */

/**
 * Plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkImageLinks(options) {
  return function transform(tree) {
    if (options && options.absolutePath) {
      visit(tree, "image", (node) => {
        // Sanitize URL by removing leading `/`
        const relativeUrl = node.url.replace(/^\//, "");

        node.url = new URL(relativeUrl, options.absolutePath).href;
      });
    } else {
      throw Error("Missing required `absolutePath` option.");
    }
  };
}
