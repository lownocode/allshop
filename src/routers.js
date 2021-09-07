import { Page, Router } from '@happysanta/router';

/* pages */
export const PAGE_HOME = '/';
export const PAGE_ADMIN = '/admin';
export const PAGE_BOTS = '/bots';
export const PAGE_APPS = '/apps';
export const PAGE_HISTORY = '/history';
export const PAGE_MY_PURCHASES = '/my_purchases';
export const PAGE_SUGGEST_SCRIPT = '/suggest_script';
/* panels */
export const PANEL_HOME = 'home';
export const PANEL_ADMIN = 'admin';
export const PANEL_BOTS = 'bots';
export const PANEL_APPS = 'apps';
export const PANEL_HISTORY = 'history';
export const PANEL_MY_PURCHASES = 'my_purchases';
export const PANEL_SUGGEST_SCRIPT = 'suggest_script';
/* views */
export const VIEW_MAIN = 'view_main';
/* modals */
export const MODAL_ACTIVATE_PROMOCODE = 'activae_promocode';
export const MODAL_BALANCE = 'balance';
export const MODAL_WITHDRAW = 'withdraw';

const routes = {
    [PAGE_HOME]: new Page(PANEL_HOME, VIEW_MAIN),
    [PAGE_ADMIN]: new Page(PANEL_ADMIN, VIEW_MAIN),
	[PAGE_BOTS]: new Page(PANEL_BOTS, VIEW_MAIN),
	[PAGE_HISTORY]: new Page(PANEL_HISTORY, VIEW_MAIN),
    [PAGE_MY_PURCHASES]: new Page(PANEL_MY_PURCHASES, VIEW_MAIN),
    [PAGE_SUGGEST_SCRIPT]: new Page(PANEL_SUGGEST_SCRIPT, VIEW_MAIN),
    [PAGE_APPS]: new Page(PANEL_APPS, VIEW_MAIN),
};

export const router = new Router(routes);

router.start();