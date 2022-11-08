import React, { memo } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

export default memo(URLNode);

function URLNode({ data, isConnectable, selected }) {
  return (
    <div
      style={{
        border: selected ? "2px solid #FF8A00" : "",
        background: "#AEAEAE",
        minHeight: "100%",
        borderRadius: "10px",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <h1
        style={{
          padding: 4,
          fontSize: 13,
          backgroundColor: "#D8D2D0",
          borderRadius: "10px 10px 0px 0px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        URL Node
      </h1>

      <p
        style={{
          fontSize: 9,
          padding: 4,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {data.label}
      </p>
    </div>
  );
}

URLNode.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
  isConnectable: PropTypes.bool,
};
