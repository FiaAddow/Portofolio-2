import '@/styles/index.css'
import { CustomPortableText } from '@/components/CustomPortableText'
import { Navbar } from '@/components/Navbar'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { homePageQuery, settingsQuery } from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import type { Metadata, Viewport } from 'next'
import { toPlainText, type PortableTextBlock } from 'next-sanity'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { handleError } from './client-functions'
import { DraftModeToast } from './DraftModeToast'
import { SpeedInsights } from '@vercel/speed-insights/next'

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    sanityFetch({ query: settingsQuery, stega: false }),
    sanityFetch({ query: homePageQuery, stega: false }),
  ])

  const ogImage = urlForOpenGraphImage(
    // @ts-expect-error - @TODO update @sanity/image-url types so it's compatible
    settings?.ogImage,
  )
  return {
    title: homePage?.title
      ? {
        template: `%s | ${homePage.title}`,
        default: homePage.title || 'Personal website',
      }
      : undefined,
    description: homePage?.overview ? toPlainText(homePage.overview) : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#a22b2bff',
}

export default async function IndexRoute({ children }: { children: React.ReactNode }) {
  const { data } = await sanityFetch({ query: settingsQuery })
  return (
    <>

      <div className="flex min-h-screen flex-col bg-portfolio-1 text-portfolio-3">
        <Navbar data={data} />
        <div className='m-6 md:m-10 lg:m-16 bg-portfolio-5 lg:pb-12'>
          <div className="mt-20 flex-grow bg-portfolio-5 px-4 md:px-16 lg:px-32 ">{children}</div>
        </div>
        <footer className="w-auto py-4 mb-2 text-center ml-4">
          {data?.footer && (
            <CustomPortableText
              id={data._id}
              type={data._type}
              path={['footer']}
              paragraphClasses="text-md md:text-xl"
              value={data.footer as unknown as PortableTextBlock[]}
            />
          )}
        </footer>
      </div>
      <Toaster />
      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
      <SpeedInsights />
    </>
  )
}
