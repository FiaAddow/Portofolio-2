import { Header } from '@/components/Header'
import { OptimisticSortOrder } from '@/components/OptimisticSortOrder'
import { ProjectListItem } from '@/components/ProjectListItem'
import type { HomePageQueryResult } from '@/sanity.types'
import { studioUrl } from '@/sanity/lib/api'
import { resolveHref } from '@/sanity/lib/utils'
import { createDataAttribute } from 'next-sanity'
import Link from 'next/link'

export interface HomePageProps {
  data: HomePageQueryResult | null
}

export async function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '', coverImage = "" } = data ?? {}

  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
        baseUrl: studioUrl,
        id: data._id,
        type: data._type,
      })
      : null

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && (
        <Header
          id={data?._id || null}
          type={data?._type || null}
          path={['overview']}
          centered
          title={title}
          description={overview}
          coverImage={coverImage as any}
        />
      )}
      {/* Showcase projects */}
      <div className='text-3xl text-portfolio-3 font-bold'>My work</div>
      <div className="mx-auto max-w-[100rem] rounded-md">
        <OptimisticSortOrder id={data?._id} path={'showcaseProjects'}>
          {showcaseProjects &&
            showcaseProjects.length > 0 &&
            showcaseProjects.map((project) => {
              const href = resolveHref(project?._type, project?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  className="flex flex-col m-10 gap-x-8 p-5 transition bg-portfolio-1/50 shadow-md odd:border-b odd:border-t hover:bg-portfolio-4-50/50 xl:flex-row odd:xl:flex-row-reverse"
                  key={project._key}
                  href={href}
                  data-sanity={dataAttribute?.(['showcaseProjects', { _key: project._key }])}
                >
                  <ProjectListItem project={project as any} />
                </Link>
              )
            })}
        </OptimisticSortOrder>
      </div>
    </div>
  )
}