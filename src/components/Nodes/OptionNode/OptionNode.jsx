import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";

import icons from "src/utils/icons";
import { Box, HStack, Text } from "@chakra-ui/react";

export default memo(OptionNode);

function OptionNode({ data, selected }) {
  return (
    <>
      <HStack
        style={{
          border: selected ? "2px solid #FF8A00" : "",
        }}
      >
        <Text
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {data.label}
        </Text>
        <Box style={{ marginLeft: "auto" }}>{icons[data.icon]}</Box>
      </HStack>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

OptionNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
  selected: PropTypes.bool,
};
