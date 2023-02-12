declare module '*.css' {
  const classes: {readonly [key: string]: string}
  export default classes
}

declare module '*.png' {
  const image: string
  export default image
}

declare module '*.module.css' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}
