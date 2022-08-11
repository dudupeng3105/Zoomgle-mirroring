import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import LoginForm from "../containers/auth/LoginForm";
import Animal from "../../src/media/sounds/animal.wav"


import ReactAudioPlayer from "../components/utils/reactAudioPlayer"

const LoginPageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;
`;

const LoginPage = () => {
  return (

    <LoginPageBlock>
<ReactAudioPlayer/>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </LoginPageBlock>
  );
};

export default LoginPage;