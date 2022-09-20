import LoginPage from "src/screens/Login";
import { getProviders, signIn } from "next-auth/react"

const Login = (props) => <LoginPage {...props} />;

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
}

export default Login;
