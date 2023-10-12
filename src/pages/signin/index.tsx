import React from 'react';
// Just import the file
import SigninForm from "./SigninForm"

const Signin = React.forwardRef((props, ref) => {
    // And use it after the h1 tag

    return (
        <SigninForm />

    );
})
export default Signin;