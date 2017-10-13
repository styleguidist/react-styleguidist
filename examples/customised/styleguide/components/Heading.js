import React from "react";

import Header from "../../src/components/Header/Header";

function Heading({ depth, id, children }) {
  return (
    <Header level={`h${depth}`} id={id}>
      {children}
    </Header>
  );
}

export default Heading;
