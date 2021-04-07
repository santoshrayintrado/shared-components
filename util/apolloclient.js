import { ApolloClient, InMemoryCache} from '@apollo/client';

const apolloclient = new ApolloClient({
    uri: "https://apollogateway-dot-ec-hoot-back-office-dev-01.uc.r.appspot.com/",
    cache: new InMemoryCache()
  });
export default apolloclient; 
