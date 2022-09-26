import { visit } from "unist-util-visit";

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {Object} Options
 * @property {string} absolutePath - Image prefix.
 */

/**
 * Plugin to support to fix relative images.
 *
 * @type {import('unified').Plugin<Options, Root>}
 * @param {Options} options
 */
export default function remarkImageLinks(options) {
  return function transform(tree) {
    if (!options || !options.absolutePath) {
      throw new Error("Missing required `absolutePath` option.");
    }
    visit(tree, "image", (node) => {
      // Sanitize URL by removing leading `/`
      const relativeUrl = node.url.replace(/^\//, "");

      node.url = new URL(relativeUrl, options.absolutePath).href;
    });
  };
}
