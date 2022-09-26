/**
 * @ts-check
 */
import test from "tape";
import remark from "remark";
import html from "remark-html";
import imgLinks from "./index.js";

test("remark-img-links", async function (t) {
  t.plan(4);

  remark()
    .use(imgLinks, { absolutePath: "https://cdn.domain.com/" })
    .use(html)
    .process("![Screenshot](images/screenshot.png)", (err, file) => {
      const expectedYield =
        '<p><img src="https://cdn.domain.com/images/screenshot.png" alt="Screenshot"></p>\n';
      t.equal(String(file), expectedYield);
    });

  remark()
    .use(imgLinks, { absolutePath: "https://cdn.domain.com/assets/" })
    .use(html)
    .process("![Screenshot](/images/screenshot.png)", (err, file) => {
      const expectedYield =
        '<p><img src="https://cdn.domain.com/assets/images/screenshot.png" alt="Screenshot"></p>\n';
      t.equal(String(file), expectedYield);
    });

  remark()
    .use(imgLinks, { absolutePath: "https://cdn.domain.com/" })
    .use(html)
    .process(
      "![Screenshot](https:github.com/images/screenshot.png)",
      (err, file) => {
        const expectedYield =
          '<p><img src="https://cdn.domain.com/github.com/images/screenshot.png" alt="Screenshot"></p>\n';
        t.equal(String(file), expectedYield);
      }
    );

  try {
    await remark()
      .use(imgLinks)
      .use(html)
      .process("![Screenshot](https:github.com/images/screenshot.png)");
  } catch (err) {
    const expectedYield = "Missing required `absolutePath` option.";

    if (err) {
      t.equal(err.message, expectedYield);
    }
  }

  t.end();
});
