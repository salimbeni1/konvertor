import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <title>Online Convertor Images(.png, .jpeg, .exr) to .mp4</title>

          <meta name="description" content="convert images for free of type .png .jpeg .exr to .mp4"/>

          <meta name="keywords" content="exr, images, jpeg, ,jpg ,png, convert, mp4"/>
          <meta name="author" content="Etienne Salimbeni"/>


        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}