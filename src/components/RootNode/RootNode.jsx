import React, { memo } from "react";
import PropTypes from "prop-types";

export default memo(RootNode);

function RootNode({ data }) {
  return (
    <>
      <br />
      {data.label}
    </>
  );
}

RootNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
};
