import React from 'react'

export default ({ attributes, children, leaf }) => {
  if (leaf.strong) {
    children = <strong>{children}</strong>
  }

  if (leaf.italics) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  
  if (leaf.strike) {
    children = <strike>{children}</strike>
  }
  
  if (leaf.code) {
    children = <code>{children}</code>
  }

  return <span {...attributes}>{children}</span>
}