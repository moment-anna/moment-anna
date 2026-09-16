import {Tabs} from "antd";
import MenuListView from "./MenuListView";
import {getMenus} from "./menuData";

const Tab = () => {
    const menus = getMenus();

    return <>
    <Tabs
        style={{
            backgroundColor: '#fff',
            fontFamily: 'MaruBuri'
        }}
        defaultActiveKey="1"
        centered
        animated
        items={[
            {label: 'Cocktail', key: '1', children: <MenuListView items={menus.cocktail}/>},
            {label: 'Whisky', key: '2', children: <MenuListView items={menus.whisky}/>},
            {label: 'Wine', key: '3', children: <MenuListView items={menus.wine}/>},
            {label: 'Non-Alcohol', key: '4', children: <MenuListView items={menus.nonAlcohol}/>},
            {label: 'Side Dish', key: '5', children: <MenuListView items={menus.sideDish}/>},
        ]}
    />
</>;
};

export default Tab;
