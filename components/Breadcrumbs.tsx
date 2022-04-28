import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export interface Breadcrumb {
  breadcrumb: string
  href: string
}

interface BreadcrumbProps {
  pageName?: string
}

const convertBreadcrumb = (string: string) => {
  return string.replace(/-/g, ' ').replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
}

const Breadcrumbs = ({ pageName }: BreadcrumbProps) => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>()

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
      linkPath.shift()
      if (pageName) linkPath.splice(linkPath.length - 1, 1, pageName)

      let pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
      })

      pathArray = pathArray.filter((p) => p.breadcrumb != '')
      pathArray.unshift({ breadcrumb: 'home', href: '/' })
      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <div className="text-sm breadcrumbs text-primary">
      <ul>
        {breadcrumbs.map((breadcrumb, i) => (
          <li key={breadcrumb.href} className={i == breadcrumbs.length - 1 ? 'font-bold' : ''}>
            <Link href={breadcrumb.href}>
              <a>{convertBreadcrumb(breadcrumb.breadcrumb)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
