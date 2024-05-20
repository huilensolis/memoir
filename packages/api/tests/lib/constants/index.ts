const title = "title";

export const EXAMPLE_DOCUMENT_CONTENT = {
  title,

  // we define an empty document with a heading of level 1 that has the text of the title parameter
  content: {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: title,
          },
        ],
      },
    ],
  },
  word_count: title.length,
};
