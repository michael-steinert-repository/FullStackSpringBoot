import React from "react";

const Container = (props) => (
    <div style ={{width: '1000px', margin: '0 auto', textAlign: 'center'}}>
        {props.children}
    </div>
);

export default Container;