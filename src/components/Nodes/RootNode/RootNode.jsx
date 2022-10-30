import React, { memo } from "react";
import PropTypes from "prop-types";

export default memo(RootNode);

function RootNode({ data }) {
  return (
    <>
      <div style={{ height: 50, backgroundColor: "#F3E2D6" }}>
        <br />
        {data.label}
      </div>
    </>
  );
}

RootNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
};
