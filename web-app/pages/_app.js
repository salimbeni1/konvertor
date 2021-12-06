import '../styles/globals.css'
import Header from '../components/Header'
import { height } from '@mui/system';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className="bg-image"></div>
    <Header></Header>
    <Component {...pageProps} />
    </>
  );
  
}

export default MyApp
