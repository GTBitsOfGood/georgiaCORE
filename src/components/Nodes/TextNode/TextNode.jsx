import React, { memo } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

export default memo(TextNode);

function TextNode({ data, isConnectable }) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <h1>{data.heading}</h1>
      <p>{data.bodyText}</p>
    </>
  );
}

TextNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
};
