import React, { useState } from "react";
import Tree from "react-d3-tree";
// import TreeReact from './TreeReact'

// Recursive function to assign collapsed flag to all nodes
const withCollapseFlag = (node) => {
  const updated = { ...node, collapsed: false };
  if (updated.children) {
    updated.children = updated.children.map(withCollapseFlag);
  }
  return updated;
};

const initialData = [
  withCollapseFlag({
    name: "CEO",
    children: [
      {
        name: "Manager",
        attributes: { department: "Production" },
        children: [
          {
            name: "Foreman (Fabrication)",
            attributes: { department: "Fabrication" },
            children: [{ name: "Worker" }],
          },
          {
            name: "Foreman (Assembly)",
            attributes: { department: "Assembly" },
            children: [{ name: "Worker" }],
          },
        ],
      },
    ],
  }),
];

export default function OrgChartTree() {
  const [treeData, setTreeData] = useState(initialData);

  const toggleNode = (clickedNode) => {
    const toggleRecursive = (node) => {
      if (node.__rd3t?.id === clickedNode.__rd3t?.id) {
        return { ...node, collapsed: !node.collapsed };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(toggleRecursive),
        };
      }
      return node;
    };

    const newData = treeData.map(toggleRecursive);
    setTreeData(newData);
  };

  return (
    <>
    
    <br /><br />
    <div id="treeWrapper" style={{ width: "100%", height: "500px" }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 400, y: 100 }}
        collapsible={false} // Turn off built-in toggle
        onNodeClick={toggleNode} // Use custom toggle
      />
    </div>
    </>
    
  );
}
