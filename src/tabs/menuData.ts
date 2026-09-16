import {Menu} from './Menu';
import {MenuList} from './MenuList';

const readMenu = (value: string | undefined): Menu[] =>
    (JSON.parse(value || '{"list":[]}') as MenuList).list;

const isNamed = (item: Menu, name: string) => item.name?.trim().toLowerCase() === name;
const hasContent = (item: Menu) => Boolean(item.name || item.description || item.price);
const trimEmptyEdges = (items: Menu[]) => {
    const first = items.findIndex(hasContent);
    if (first < 0) return [];
    const last = items.length - 1 - [...items].reverse().findIndex(hasContent);
    return items.slice(first, last + 1);
};

export function getMenus() {
    const allCocktail = readMenu(process.env.REACT_APP_COCKTAIL_LIST);
    const wineStart = allCocktail.findIndex(item => isNamed(item, 'white wine'));
    const sideDishStart = allCocktail.findIndex(item => isNamed(item, 'side dish'));
    const cocktailEnd = wineStart >= 0 ? wineStart : sideDishStart >= 0 ? sideDishStart : allCocktail.length;

    return {
        cocktail: trimEmptyEdges(allCocktail.slice(0, cocktailEnd)),
        whisky: trimEmptyEdges(readMenu(process.env.REACT_APP_WHISKY_LIST)),
        wine: wineStart >= 0
            ? trimEmptyEdges(allCocktail.slice(wineStart, sideDishStart >= 0 ? sideDishStart : allCocktail.length))
            : [],
        nonAlcohol: trimEmptyEdges(readMenu(process.env.REACT_APP_NON_ALCOHOL_LIST)),
        sideDish: sideDishStart >= 0
            ? trimEmptyEdges(allCocktail.slice(sideDishStart + 1).filter(item => !isNamed(item, 'instagram')))
            : [],
    };
}
