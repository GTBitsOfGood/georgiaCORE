import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";

export default memo(OptionNode);

function OptionNode({ data }) {
  return (
    <>
      {data.label}
      <Handle type="source" position={Position.Right} />
    </>
  );
}

OptionNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
};
