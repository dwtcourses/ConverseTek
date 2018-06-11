import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { observer, inject } from 'mobx-react';

import './GlobalModal.css';

@observer
class GlobalModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmLoading: false,
    };
  }

  render() {
    const { modalStore } = this.props;
    const {
      isVisible,
      ModalContent,
      onOk,
      okLabel,
      onCancel,
    } = modalStore;
    const { confirmLoading } = this.state;

    const content = (ModalContent) ? <ModalContent modalStore={modalStore} /> : undefined;

    return (
      <Modal
        title="Select a conversation directory"
        visible={isVisible}
        onOk={onOk}
        okText={okLabel}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        wrapClassName="global-modal"
        width="70vw"
      >
        {content}
      </Modal>
    );
  }
}

GlobalModal.propTypes = {
  modalStore: PropTypes.object.isRequired,
};

export default inject('modalStore')(GlobalModal);
