import {List} from 'antd';
import {Menu} from './Menu';

export default function MenuListView({items}: {items: Menu[]}) {
    return <List
        itemLayout="horizontal"
        dataSource={items}
        style={{paddingLeft: 24, paddingRight: 24, fontFamily: 'MaruBuri'}}
        renderItem={item => (
            <List.Item>
                <List.Item.Meta title={item.name} description={item.description}/>
                <div style={{fontWeight: 'bold'}}>{item.price}</div>
            </List.Item>
        )}
    />;
}
