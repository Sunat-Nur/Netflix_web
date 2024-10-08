import {MenuItemProps} from "@/types";

//menu-itemni massive sifatida beryabmiz
export const menuItems: MenuItemProps[] = [
    {
        id: 'home',
        title: 'Home',
        path: '/browse'
    },
    {
        id: 'tv',
        title: 'TV Shows',
        path: '/tv'
    },
    {
        id: 'movies',
        title: 'Movies',
        path: '/movies'
    },
    {
        id: 'my-list',
        title: 'My List',
        path: '/mylist'
    },
]