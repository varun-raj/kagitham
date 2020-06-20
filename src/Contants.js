const MARK_BUTTONS = [
  {name: "Bold", format: "strong"},
  {name: "Italics", format: "italics"},
  {name: "Underlined", format: "underline"},
  {name: "Strikethrough", format: "strike"},
  {name: "Code", format: "code"}
];

const BLOCK_BUTTONS = [
  {name: "H1", format: "heading-one"},
  {name: "H2", format: "heading-two"},
  {name: "H3", format: "heading-three"},
  {name: "H4", format: "heading-four"},
  {name: "H5", format: "heading-five"},
  {name: "H6", format: "heading-six"},
  {name: '"', format: "block-quote"},
  {name: "*", format: "bulleted-list"},
  {name: "1.", format: "ordered-list"}
];


const SHORTCUTS = {
  '1.': 'ordered-list-item',
  '*': 'bulleted-list-item',
  '-': 'bulleted-list-item',
  '+': 'bulleted-list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
}

const LISTS = ["bulleted-list", "ordered-list"];
const LIST_ITEMS = ["bulleted-list-item", "ordered-list-item"];

export {
  MARK_BUTTONS,
  BLOCK_BUTTONS,
  SHORTCUTS,
  LISTS,
  LIST_ITEMS
}