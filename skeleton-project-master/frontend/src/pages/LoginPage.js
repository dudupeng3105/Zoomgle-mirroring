import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import LoginForm from "../containers/auth/LoginForm";


// const LoginPageBlock = styled.div``;

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;