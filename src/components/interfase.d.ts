declare namespace Comp {
  /**
   * 组件类型
   */
  interface EleType {
    id: string;
    type: string;
    name: string;
  }

  /**
   * 组件元素
   */
  interface Element {
    id: string;
    type: string;
    name: string;
    editMode: boolean;
    children?: Array<Element>;
    props?: ElementProps;
    index?: number;
  }

  /**
   * 组件属性配置
   */
  interface ElementProps {
    // 分两层 第一层类型 第二层属性
    style?: { [key: string]: { [key: string]: StyleProps } };
    data?: any;
  }

  /**
   * 组件样式配置项
   */
  interface StyleProps {
    name: string;
    key?: string;
    type: string;
    value: any;
  }
}
