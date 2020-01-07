import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function TextInput(props: Props) {
  const { value = '', onChange } = props;

  const [editorState, setEditorState] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(value));
  }, []);

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(value));
  }, [value]);

  function submitContent() {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editorState.toHTML();
    onChange(htmlContent);
  }

  function handleEditorChange(editorState: any) {
    setEditorState(editorState);
  }

  function hancleOpen() {
    setVisible(true);
  }

  function hancleClose() {
    setVisible(false);
  }

  function hancleSure() {
    submitContent();
    hancleClose();
  }

  return (
    <div className="my-component">
      <Button onClick={hancleOpen}>编辑</Button>
      <Modal
        title="编辑内容"
        width="800px"
        visible={visible}
        onOk={hancleSure}
        onCancel={hancleClose}
      >
        <BraftEditor value={editorState} onChange={handleEditorChange} onSave={submitContent} />
      </Modal>
    </div>
  );
}

export default TextInput;
