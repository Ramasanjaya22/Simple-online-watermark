import { WatermarkToolComponent } from "@/components/watermark-tool"
import Head from "next/head"

export default function Page() {
  return (
    <div>
      <Head>
        <title>Free Online Watermark Tool | by Rama Sanjaya</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "SoftwareApplication",
              "name": "Free Online Watermark Tool",
              "description": "Add watermarks to images for free online.",
              "url": "https://simple-online-watermark.vercel.app/"
            })
          }}
        />

        <meta name="description" content="Add watermarks to images for free with our online tool. Secure, fast, and easy to use." />
      </Head>
      <WatermarkToolComponent />
    </div>
  )
}