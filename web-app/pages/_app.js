import '../styles/globals.scss'
import Header from '../components/Header'
import BlurryMovingBG from '../components/BlurryMovingBG'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <BlurryMovingBG/>
    <Header/>
    <Component {...pageProps} />
    </>
  );
  
}

export default MyApp
