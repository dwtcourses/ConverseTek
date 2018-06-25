import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import SortableTree from 'react-sortable-tree';

import 'react-sortable-tree/style.css';

import ConverseTekNodeRenderer from './ConverseTekNodeRenderer';
import DialogEditorContextMenu from '../DialogEditorContextMenu';

import './DialogEditor.css';

/* eslint-disable react/no-unused-state */
@observer
class DialogEditor extends Component {
  static buildTreeData(nodeStore, conversationAsset) {
    const data = [{
      title: 'Root',
      id: '0',
      children: nodeStore.getChildrenFromRoots(conversationAsset.Conversation.roots),
      expanded: true,
    }];

    return data;
  }

  constructor(props) {
    super(props);

    const { nodeStore, conversationAsset } = this.props;
    nodeStore.init(conversationAsset);

    this.state = {
      conversationAsset,
      treeData: DialogEditor.buildTreeData(nodeStore, conversationAsset),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { conversationAsset: stateConversationAsset } = this.state;
    const { conversationAsset: propConversationAsset, nodeStore, rebuild } = nextProps;

    const newState = { ...this.state };

    if (propConversationAsset !== stateConversationAsset || rebuild) {
      nodeStore.init(propConversationAsset);
      newState.conversationAsset = propConversationAsset;
      newState.treeData = DialogEditor.buildTreeData(nodeStore, propConversationAsset);
      this.setState(newState);
    }
  }

  render() {
    const { nodeStore } = this.props;
    const { treeData: data } = this.state;
    const activeNodeId = nodeStore.getActiveNodeId();

    return (
      <div className="dialog-editor">
        <div className="dialog-editor__tree">
          <DialogEditorContextMenu id="dialog-context-menu" />
          <SortableTree
            treeData={data}
            onChange={treeData => this.setState({ treeData })}
            getNodeKey={({ node, treeIndex }) => {
              if (!node.id) return treeIndex;
              return node.id;
            }}
            rowHeight={40}
            canDrag={nodeContainer => !(nodeContainer.node.id === 0)}
            canDrop={nodeContainer => !(nodeContainer.nextParent === null)}
            generateNodeProps={() => (
              {
                nodeStore,
                activeNodeId,
              }
            )}
            nodeContentRenderer={ConverseTekNodeRenderer}
            reactVirtualizedListProps={{
              autoHeight: false,
              overscanRowCount: 9999,
              style: {
                minHeight: 10,
                height: 'unset',
                width: 9999,
              },
            }}
          />
        </div>
      </div>
    );
  }
}

DialogEditor.defaultProps = {
  rebuild: false,
};

DialogEditor.propTypes = {
  nodeStore: PropTypes.object.isRequired,
  conversationAsset: PropTypes.object.isRequired,
  rebuild: PropTypes.bool,
};

export default inject('nodeStore')(DialogEditor);
