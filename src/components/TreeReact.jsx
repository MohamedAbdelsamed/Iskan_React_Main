import React, { useState } from 'react';
import Tree, { withStyles } from 'react-vertical-tree';
import TreeD3 from './TreeD3';

// Initial tree data
const initialData = [
  {
    id: 1,
    name: 'Company',
    children: [
      {
        id: 2,
        name: 'Department A',
        children: [
          { id: 4, name: 'Team A1', children: [] },
          { id: 5, name: 'Team A2', children: [] },
        ],
      },
      {
        id: 3,
        name: 'Department B',
        children: [],
      },
    ],
  },
];

// Collapse/expand toggle helper
const toggleNodeById = (nodes, id) =>
  nodes.map(node => {
    if (node.id === id) {
      return { ...node, collapsed: !node.collapsed };
    }
    if (node.children) {
      return { ...node, children: toggleNodeById(node.children, id) };
    }
    return node;
  });

// Return only visible (non-collapsed) children
const getVisibleData = (nodes) =>
  nodes.map(node => ({
    ...node,
    children: node.collapsed ? [] : getVisibleData(node.children || []),
  }));

// Base styles
const baseStyles = {
  lines: { color: '#bbb', height: '40px' },
};
const StyledTree = withStyles(baseStyles)(Tree);

const CollapsibleStyledTree = () => {
  const [treeData, setTreeData] = useState(initialData);

  const handleClick = (node) => {
    setTreeData(prev => toggleNodeById(prev, node.id));
  };

  // Render node with custom style based on whether it's a leaf
  const renderNode = (node) => {
    const isLeaf = !node.children || node.children.length === 0;

    const nodeStyle = {
      padding: '10px 15px',
      borderRadius: '8px',
      border: '1px solid',
      borderColor: isLeaf ? '#4caf50' : '#2196f3',
      backgroundColor: isLeaf ? '#e8f5e9' : '#e3f2fd',
      color: isLeaf ? '#2e7d32' : '#0d47a1',
      fontWeight: 500,
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
    };

    return (
      <div style={nodeStyle}>
        {node.children?.length > 0 || node.collapsed !== undefined ? (
          <span>{node.collapsed ? '➕ ' : '➖ '}</span>
        ) : '🌿 '}
        {node.name}
      </div>
    );
  };

  return (
    <>
      <TreeD3 />
      <StyledTree
      data={getVisibleData(treeData)}
      direction
      render={renderNode}
      onClick={handleClick}
    />
    </>
  
  );
};

export default CollapsibleStyledTree;

