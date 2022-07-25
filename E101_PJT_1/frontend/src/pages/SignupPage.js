import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import SignUpForm from "../containers/auth/SignUpForm";

// const SignupBlock = styled.div``;

const SignupPage = () => {
  return (
    <AuthTemplate>
      <SignUpForm></SignUpForm>
    </AuthTemplate>
  );
};

export default SignupPage;