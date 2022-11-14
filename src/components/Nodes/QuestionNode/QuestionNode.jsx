import React, { memo } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import { Text } from "@chakra-ui/react";

export default memo(QuestionNode);

function QuestionNode({ data, selected }) {
  return (
    <>
      <div
        style={{
          border: selected ? "2px solid #FF8A00" : "",
          background: "#AFB9A5",
          minHeight: "100%",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            height: 50,
            padding: 8,
            backgroundColor: "#E0E2DA",
            borderRadius: "10px 10px 0px 0px",
            fontSize: 13,
          }}
        >
          <Handle type="target" position={Position.Left} />
          <Text
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {data.label}
          </Text>
        </div>
      </div>
    </>
  );
}

QuestionNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
  selected: PropTypes.bool,
};
