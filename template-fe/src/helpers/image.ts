export type Image = {
  src: string
  name: string
}

export function readImage(file: File) {
  return new Promise<Image>((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) =>
      resolve({src: e.target?.result as string, name: file.name})
    reader.readAsDataURL(file)
  })
}
