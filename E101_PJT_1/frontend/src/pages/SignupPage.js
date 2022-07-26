import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import SignUpForm from "../containers/auth/SignUpForm";

const SignupBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;
`;

const SignupPage = () => {
  return (
    <SignupBlock>
      <AuthTemplate>
        <SignUpForm></SignUpForm>
      </AuthTemplate>
    </SignupBlock>
  );
};

export default SignupPage;