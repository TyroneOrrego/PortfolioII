import type { ProjectProps } from "@/types/project-types"

export const projects: ProjectProps[] = [
  {
    id: "mam-viewer",
    title: "MAM Viewer",
    description:
      "Complete the design and drafting of WEB API documentation and manuals for a financial services platform. Implemented a private approach to make it an interactive documentation.",
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "MAM Viewer project screenshot showing API documentation interface",
      width: 2070,
      height: 1380,
    },
    tags: ["API", "Postman/Swagger", "Technical Writing", "Information Architecture"],
    links: {
      demo: "https://mamviewer.tradeviewforex.com/?fbclid=IwY2xjawI0MNVleHRuA2FlbQIxMAABHXTsOs6WQvPKu8gmCejg3xuBWEZh-bMD_HVZGi_jKXr448zNTzCc3dhP3A_aem_Slnyll-vl47K3FRPD7wn8Q",
    },
    featured: true,
  },
  {
    id: "communitraders",
    title: "Communitraders",
    description:
      "Complete the design and writing of guides and documentation for a financial services platform's Web API. Used a confidential method to create an interactive document.",
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Communitraders project screenshot showing documentation interface",
      width: 2015,
      height: 1343,
    },
    tags: ["Developer Documentation", "Manual", "Information Architecture", "User Guides"],
    links: {
      demo: "https://communitraders.tradeviewforex.com/login",
    },
    featured: true,
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base Management",
    description:
      "Developed, maintained, and managed an entire knowledge repository for Tradeview Markets on Confluence to shorten the times of documentation requests and sharing with other developers and managers.",
    image: {
      src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Knowledge Base Management project showing organized documentation",
      width: 2070,
      height: 1380,
    },
    tags: ["Confluence", "Knowledge Base", "Information Architecture", "Agile", "SaaS", "Localization"],
    links: {},
    featured: true,
  },
  {
    id: "api-docs",
    title: "API Documentation",
    description: "Developed, maintained, and managed the whole entire API Docs for Tradeview Markets on Confluence.",
    image: {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "API Documentation project showing code and documentation interface",
      width: 2070,
      height: 1380,
    },
    tags: ["Confluence", "Knowledge Base", "Information Architecture", "API Docs", "Swagger", "Postman", "SaaS"],
    links: {},
    featured: true,
  },
]
