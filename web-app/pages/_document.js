import Document, { Head, Html, Main, NextScript } from "next/document";

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

          <title>Images to Video Convertor</title>

          <meta
            name="description"
            content="convert images for free of type .png .jpeg .exr to .mp4"
          />

          <meta
            name="keywords"
            content="exr, images, jpeg, ,jpg ,png, convert, mp4"
          />
          <meta name="author" content="Etienne Salimbeni" />

          <link rel="shortcut icon" href="/favicon_io/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon_io/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon_io/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon_io/favicon-16x16.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2842973901293778"
            crossorigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}
