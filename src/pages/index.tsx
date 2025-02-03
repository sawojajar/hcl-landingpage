import { Layout } from '@/components/layout';
import { HomeScreen } from '@/screen/HomeScreen'

const Home = () => {
  return <Layout navbarBackground='green.700'>
    <HomeScreen />
  </Layout>
}

export default Home;
export async function getServerSideProps() {
  return {
    props: {},
  };
}