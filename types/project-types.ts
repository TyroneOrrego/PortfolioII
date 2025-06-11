export interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
  blurDataURL?: string
}

export interface ProjectProps {
  id: string
  title: string
  description: string
  image: ProjectImage
  tags: string[]
  links: {
    demo?: string
    github?: string
    case?: string
  }
  featured?: boolean
}
