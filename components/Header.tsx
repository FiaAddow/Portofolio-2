import { CustomPortableText } from '@/components/CustomPortableText'
import type { PathSegment } from 'sanity'
import ImageBox from './ImageBox'
import { Image } from 'sanity'

interface HeaderProps {
  id: string | null
  type: string | null
  path: PathSegment[]
  centered?: boolean
  description?: null | any[]
  title?: string | null
  coverImage?: Image | undefined
}
export function Header(props: HeaderProps) {
  const { id, type, path, title, description, centered = false, coverImage } = props
  if (!description && !title) {
    return null
  }
  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'} grid grid-cols-1 gap-x-20 md:grid-cols-2 items-center`}>
      <div className='col-span-2 md:col-span-1'>
        {/* Title */}
        {title && <div className='text-3xl font-extrabold tracking-tight md:text-5xl'>{title}</div>}
        {/* Description */}
        {description && (
          <div className="mt-4 text-pretty font-serif text-xl text-gray-600 md:text-2xl">
            <CustomPortableText id={id} type={type} path={path} value={description} />
          </div>
        )}
      </div>

      {coverImage && (
        <div className='p-4 col-span-2 md:col-span-1 max-w-2xl'>
          <ImageBox
            image={coverImage as any}
            alt={`Cover image for header`}
            width={1024}
            height={1536}
            classesWrapper="relative aspect-[9/16]" />
        </div>
      )}
    </div>
  )
}
