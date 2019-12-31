import React, { useContext } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { Tabs, Button, Collapse, Icon } from 'antd';
import { context } from '../../components/context';
import ItemInput from '@/components/ItemInput';

const { TabPane } = Tabs;
const { Panel } = Collapse;

function SideBar() {
  const { currtntElement, visibleSideBar, setVisibleSideBar } = useContext(context);
  if (currtntElement && currtntElement.props) {
    const styleData = [];
    if (currtntElement.props.style) {
      const styleConfig = currtntElement.props.style;
      for (let blockKey in styleConfig) {
        const propConfig = styleConfig[blockKey];
        const propData: Array<Comp.StyleProps> = [];
        for (let propKey in propConfig) {
          propData.push({
            ...propConfig[propKey],
            key: `${blockKey}.${propKey}`,
          });
        }
        styleData.push({
          title: formatMessage({ id: `style.${blockKey}` }),
          data: propData,
        });
      }
    }

    function handleVisible() {
      setVisibleSideBar(!visibleSideBar);
    }

    return (
      <section id="sideBarContainer" className={`sideBar ${visibleSideBar ? 'show' : ''}`}>
        <section className="toolBar">
          <span>
            {formatMessage({ id: 'section.id' })}: {currtntElement.id}
          </span>
          <Button
            icon={visibleSideBar ? 'double-right' : 'double-left'}
            onClick={handleVisible}
            type="link"
          />
        </section>

        <Tabs type="card">
          {styleData.length > 0 && (
            <TabPane tab={formatMessage({ id: 'style' })} key="style">
              <Collapse
                bordered={false}
                defaultActiveKey={['item_0']}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                {styleData.map((item, index) => (
                  <Panel header={item.title} key={`item_${index}`}>
                    {item.data.map((prop, j) => (
                      <ItemInput data={prop} key={j} />
                    ))}
                  </Panel>
                ))}
              </Collapse>
            </TabPane>
          )}
        </Tabs>
      </section>
    );
  }
  return <></>;
}

export default SideBar;
