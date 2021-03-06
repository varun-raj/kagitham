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
  {name: "1.", format: "ordered-list"},
  {name: "Code Block", format: "code-block"}

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

const HOTKEYS = {
  'mod+b': 'strong',
  'mod+i': 'italics',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LISTS = ["bulleted-list", "ordered-list"];
const LIST_ITEMS = ["bulleted-list-item", "ordered-list-item"];

const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'block-quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'ordered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const LEAF_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strike: true }),
  EM: () => ({ italics: true }),
  I: () => ({ italics: true }),
  S: () => ({ strike: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
}

export {
  MARK_BUTTONS,
  BLOCK_BUTTONS,
  SHORTCUTS,
  HOTKEYS,
  LISTS,
  LIST_ITEMS,
  ELEMENT_TAGS,
  LEAF_TAGS
}