import React, { memo } from "react";
import PropTypes from "prop-types";

export default memo(RootNode);

function RootNode({ data, selected }) {
  return (
    <>
      <div
        style={{
          height: 17,
          marginLeft: "7%",
          width: "20%",
          fontSize: 8,
          borderRadius: "10px 10px 0px 0px",
          backgroundColor: "#F7C5A3",
          verticalAlign: "middle",
        }}
      >
        <p style={{ padding: "4px" }}>ROOT</p>
      </div>
      <div
        style={{
          border: selected ? "2px solid #FF8A00" : "",
          background: "#F7C5A3",
          minHeight: "100%",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            height: 50,
            padding: 8,
            backgroundColor: "#F3E2D6",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          {data.label}
        </div>
      </div>
    </>
  );
}

RootNode.propTypes = {
  data: PropTypes.object,
  isConnectable: PropTypes.bool,
  selected: PropTypes.bool,
};
