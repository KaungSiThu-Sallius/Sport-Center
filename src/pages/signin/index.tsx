import React from 'react';
import SigninForm from './SigninForm';

type SigninProps = {
    active: boolean;
};

const Signin = React.forwardRef<HTMLElement, SigninProps>((props, ref) => {
    const { active } = props; // Destructure the 'active' prop


    return (
        <SigninForm active={active} ref={ref} />
    );
});

export default Signin;