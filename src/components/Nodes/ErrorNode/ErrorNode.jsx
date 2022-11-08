import React, { memo } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

export default memo(ErrorNode);

function ErrorNode({ data, isConnectable, selected }) {
  return (
    <div
      style={{
        border: selected ? "2px solid #FF8A00" : "",
        background: "#F9C4B8",
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
          backgroundColor: "#FEE1DA",
          borderRadius: "10px 10px 0px 0px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        Error Node
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
        Default error message
      </p>
    </div>
  );
}

ErrorNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
  selected: PropTypes.bool,
};
