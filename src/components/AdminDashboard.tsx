import { useEffect, useMemo, useState } from 'react';
import type { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react';
import { BarChart3, ClipboardList, LayoutDashboard, TrendingUp, Users, IndianRupee, ShoppingBag, ArrowUpRight, Plus, Search, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Tab = 'dashboard' | 'orders' | 'reports';
type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
type Order = { id: string; order_number: string; guest_name: string; order_type: 'Dine In' | 'Takeaway' | 'Delivery'; table_number: string | null; total: number; status: OrderStatus; created_at: string };
type OrderDraft = { guest: string; type: Order['order_type']; table: string; total: string };
type MenuItem = { id: string; name: string; category: string; dish_type: 'Veg' | 'Non-Veg'; price: number; description: string; created_at: string };

function normalizeOrder(order: Order): Order {
  return { ...order, total: Number(order.total) };
}

function normalizeMenuItem(item: MenuItem): MenuItem {
  return { ...item, price: Number(item.price) };
}

const statuses: OrderStatus[] = ['New', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
const filters = ['All', ...statuses];
const statusStyles: Record<OrderStatus, string> = { New: 'bg-sky-50 text-sky-700 border-sky-200', Preparing: 'bg-amber-50 text-amber-700 border-amber-200', Ready: 'bg-emerald-50 text-emerald-700 border-emerald-200', Completed: 'bg-stone-100 text-stone-700 border-[#3b2e1a]', Cancelled: 'bg-red-50 text-red-700 border-red-200' };

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [dashboardError, setDashboardError] = useState('');
  const [orderModal, setOrderModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);
      const { data, error } = await supabase.from('restaurant_orders').select('*').order('created_at', { ascending: false });
      if (error) setDashboardError('Live orders are unavailable. Please try again later.');
      else setOrders((data ?? []).map((order) => normalizeOrder(order as Order)));
      setLoadingOrders(false);
    };
    const loadMenuItems = async () => {
      setLoadingMenu(true);
      const { data, error } = await supabase.from('restaurant_menu_items').select('*').order('created_at', { ascending: false });
      if (error) setDashboardError('Menu items are unavailable. Please try again later.');
      else setMenuItems((data ?? []).map((item) => normalizeMenuItem(item as MenuItem)));
      setLoadingMenu(false);
    };
    void loadOrders();
    void loadMenuItems();
  }, []);

  const addOrder = async (draft: OrderDraft) => {
    const orderNumber = `#AG-${1049 + orders.length}`;
    const { data, error } = await supabase.from('restaurant_orders').insert({ order_number: orderNumber, guest_name: draft.guest, order_type: draft.type, table_number: draft.table || null, total: Number(draft.total), status: 'New' }).select().maybeSingle();
    if (error || !data) { setDashboardError('The new order could not be saved. Please try again.'); return; }
    setOrders((current) => [normalizeOrder(data as Order), ...current]); setOrderModal(false);
  };

  const addMenuItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const { data, error } = await supabase.from('restaurant_menu_items').insert({ name: String(values.get('name')), category: String(values.get('category')), dish_type: String(values.get('dishType')), price: Number(values.get('price')), description: String(values.get('description') || '') }).select().maybeSingle();
    if (error || !data) { setDashboardError('The menu item could not be saved. Please try again.'); return; }
    setMenuItems((current) => [normalizeMenuItem(data as MenuItem), ...current]); setMenuModal(false); setDashboardError('Menu item added successfully.');
  };

  return <section id="dashboard" className="bg-[#0d0b08] py-20 sm:py-24 px-6 border-t border-[#3b2e1a] [background-image:linear-gradient(rgba(224,168,46,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(224,168,46,0.08)_1px,transparent_1px)] [background-size:24px_24px]"><div className="max-w-7xl mx-auto"><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"><div className="flex items-start gap-4"><img src="/images/image%20copy%209.png" alt="Ashivam Technologies company logo" className="w-32 h-20 rounded-lg object-contain bg-white border border-[#3b2e1a] p-1" /><div><p className="text-[#c77819] text-xs uppercase tracking-[0.35em] mb-3">Management</p><h2 className="font-serif text-4xl sm:text-5xl text-[#f3ead7]">Operations Dashboard</h2><p className="text-[#9a8a6c] mt-3">Your restaurant pulse at a glance — menus, orders, tables, and guests.</p></div></div><div className="flex items-center gap-2"><button onClick={() => setActiveTab('orders')} className="px-5 py-3 rounded-full border border-[#0c7461] text-[#0c7461] text-sm font-medium hover:bg-[#0c7461] hover:text-white transition-colors">View Orders</button><button onClick={() => setMenuModal(true)} className="px-5 py-3 rounded-full bg-[#f6a313] text-[#f3ead7] text-sm font-semibold shadow-lg shadow-orange-200 hover:bg-[#e99708] transition-colors"><Plus size={16} className="inline mr-1" /> Add New Item</button></div></div>{dashboardError && <div role="status" className="mb-6 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{dashboardError}<button onClick={() => setDashboardError('')} aria-label="Dismiss message"><X size={16} /></button></div>}<div className="flex gap-2 mb-8 overflow-x-auto">{[{ id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard }, { id: 'orders' as const, label: 'Orders', icon: ClipboardList }, { id: 'reports' as const, label: 'Reports', icon: BarChart3 }].map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs uppercase tracking-[0.12em] whitespace-nowrap ${activeTab === tab.id ? 'bg-[#161616] text-white border-[#161616]' : 'bg-[#17120c] text-[#9a8a6c] border-[#3b2e1a] hover:border-[#c77819]'}`}><tab.icon size={15} />{tab.label}</button>)}</div>{activeTab === 'dashboard' && <DashboardView orders={orders} menuItems={menuItems} loadingMenu={loadingMenu} onViewOrders={() => setActiveTab('orders')} />}{activeTab === 'orders' && <OrdersView orders={orders} setOrders={setOrders} loading={loadingOrders} onNewOrder={() => setOrderModal(true)} />}{activeTab === 'reports' && <ReportsView orders={orders} menuItems={menuItems} />}</div>{orderModal && <OrderModal onClose={() => setOrderModal(false)} onSave={addOrder} />}{menuModal && <MenuModal onClose={() => setMenuModal(false)} onSave={addMenuItem} />}</section>;
}

function DashboardView({ orders, menuItems, loadingMenu, onViewOrders }: { orders: Order[]; menuItems: MenuItem[]; loadingMenu: boolean; onViewOrders: () => void }) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const monthLabels = Array.from({ length: 12 }, (_, index) => new Date(new Date().getFullYear(), index, 1).toLocaleString('en-IN', { month: 'short' }));
  const monthlyRevenue = monthLabels.map((_, monthIndex) => orders.filter((order) => new Date(order.created_at).getMonth() === monthIndex).reduce((sum, order) => sum + order.total, 0));
  const maxRevenue = Math.max(...monthlyRevenue, 1);
  const cards = [{ value: loadingMenu ? '—' : String(menuItems.length), label: 'Total Items' }, { value: loadingMenu ? '—' : String(menuItems.filter((item) => item.dish_type === 'Veg').length), label: 'Veg Dishes' }, { value: loadingMenu ? '—' : String(menuItems.filter((item) => item.dish_type === 'Non-Veg').length), label: 'Non-Veg Dishes' }, { value: loadingMenu ? '—' : String(new Set(menuItems.map((item) => item.category)).size), label: 'Categories' }, { value: String(orders.length), label: 'Orders' }, { value: `₹${totalRevenue.toLocaleString('en-IN')}`, label: 'Revenue' }];
  return <div className="space-y-6"><div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{cards.map((card) => <div key={card.label} className="bg-[#17120c] border border-[#3b2e1a] rounded-2xl p-6 shadow-sm"><div className="text-3xl font-semibold text-[#f3ead7]">{card.value}</div><div className="text-sm text-[#9a8a6c] mt-2">{card.label}</div></div>)}</div><div className="bg-[#17120c] border border-[#3b2e1a] rounded-2xl p-6"><div className="flex justify-between items-center mb-7"><div><h3 className="text-lg font-semibold text-[#f3ead7]">Revenue Overview</h3><p className="text-sm text-[#9a8a6c]">Orders by month</p></div><span className="text-[#0c7461] text-sm flex items-center gap-1"><TrendingUp size={15} /> ₹{totalRevenue.toLocaleString('en-IN')}</span></div><div className="h-44 flex items-end gap-2 sm:gap-4">{monthlyRevenue.map((value, index) => <div key={monthLabels[index]} className="flex-1 h-full flex flex-col justify-end gap-2"><div className="rounded-t-sm bg-[#0c7461] hover:bg-[#f6a313] transition-colors" style={{ height: `${Math.max((value / maxRevenue) * 100, value ? 8 : 2)}%` }} title={`₹${value.toLocaleString('en-IN')}`} /><span className="text-[10px] text-[#75684f] text-center">{monthLabels[index]}</span></div>)}</div>{!orders.length && <p className="text-xs text-[#75684f] text-center mt-4">Revenue will appear here as orders are added.</p>}</div><button onClick={onViewOrders} className="text-sm font-medium text-[#0c7461] hover:text-[#c77819]">Open today’s orders →</button></div>;
}

function OrdersView({ orders, setOrders, loading, onNewOrder }: { orders: Order[]; setOrders: Dispatch<SetStateAction<Order[]>>; loading: boolean; onNewOrder: () => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const visibleOrders = useMemo(() => orders.filter((order) => (filter === 'All' || order.status === filter) && `${order.order_number} ${order.guest_name}`.toLowerCase().includes(query.toLowerCase())), [orders, filter, query]);
  const updateStatus = async (id: string, status: OrderStatus) => { setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order)); await supabase.from('restaurant_orders').update({ status }).eq('id', id); };
  return <div className="bg-[#17120c] border border-[#3b2e1a] rounded-2xl overflow-hidden"><div className="p-6 border-b border-[#3b2e1a] flex flex-col sm:flex-row gap-4 justify-between"><div><h3 className="text-lg font-semibold text-[#f3ead7]">Orders</h3><p className="text-sm text-[#9a8a6c] mt-1">Keep every ticket moving from new to completed.</p></div><button onClick={onNewOrder} className="px-5 py-3 rounded-full bg-[#0c7461] text-white text-sm font-semibold"><Plus size={16} className="inline mr-1" /> New Order</button></div><div className="p-5 border-b border-[#3b2e1a] flex flex-wrap gap-3"><label className="flex items-center gap-2 border border-[#3b2e1a] rounded-lg px-3 py-2 text-[#75684f] text-sm"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order or guest" className="outline-none text-stone-700 w-44" /></label>{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-lg border text-sm ${filter === item ? 'bg-[#161616] text-white border-[#161616]' : 'border-[#3b2e1a] text-[#b7ac94] hover:border-[#0c7461]'}`}>{item}</button>)}</div>{loading && <p className="px-6 py-4 text-sm text-[#9a8a6c]">Loading live orders…</p>}<div className="overflow-x-auto"><table className="w-full text-left min-w-[760px]"><thead><tr className="text-[10px] uppercase tracking-[0.16em] text-[#9a8a6c] border-b border-[#3b2e1a]"><th className="px-6 py-4">Order</th><th>Guest</th><th>Type</th><th>Table</th><th>Total</th><th>Status</th></tr></thead><tbody>{visibleOrders.map((order) => <tr key={order.id} className="border-b border-[#2a241c] text-sm hover:bg-[#1b160e]"><td className="px-6 py-5 font-semibold text-[#f3ead7]">{order.order_number}<span className="block text-xs font-normal text-[#75684f] mt-1">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></td><td className="text-[#f3ead7]">{order.guest_name}</td><td className="text-[#9a8a6c]">{order.order_type}</td><td className="text-[#9a8a6c]">{order.table_number || '—'}</td><td className="font-semibold text-[#f3ead7]">₹{order.total.toLocaleString('en-IN')}</td><td><select value={order.status} onChange={(event) => void updateStatus(order.id, event.target.value as OrderStatus)} className={`px-3 py-1.5 rounded-full border text-xs outline-none ${statusStyles[order.status]}`}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table>{!visibleOrders.length && !loading && <p className="p-8 text-center text-sm text-[#9a8a6c]">No orders match this search.</p>}</div></div>;
}

function ReportsView({ orders, menuItems }: { orders: Order[]; menuItems: MenuItem[] }) {
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrder = orders.length ? revenue / orders.length : 0;
  const uniqueGuests = new Set(orders.map((order) => order.guest_name.trim().toLowerCase())).size;
  const dineInOrders = orders.filter((order) => order.order_type === 'Dine In').length;
  const reports = [{ icon: IndianRupee, title: 'Sales Report', value: `₹${revenue.toLocaleString('en-IN')}`, text: `${orders.length} orders with an average value of ₹${Math.round(averageOrder).toLocaleString('en-IN')}.` }, { icon: ShoppingBag, title: 'Menu Performance', value: menuItems[0]?.name ?? 'No items yet', text: `${menuItems.length} live menu items are available in the dashboard.` }, { icon: Users, title: 'Guest Report', value: String(uniqueGuests), text: 'Unique guests across saved orders.' }, { icon: BarChart3, title: 'Table Report', value: orders.length ? `${Math.round((dineInOrders / orders.length) * 100)}%` : '0%', text: 'Share of saved orders marked as dine-in.' }];
  return <div className="grid lg:grid-cols-2 gap-5">{reports.map((report) => <div key={report.title} className="bg-[#17120c] border border-[#3b2e1a] rounded-2xl p-6"><report.icon size={21} className="text-[#0c7461] mb-5" /><h3 className="text-[#f3ead7] font-semibold">{report.title}</h3><p className="text-[#9a8a6c] text-sm mt-2 mb-7">{report.text}</p><div className="flex items-end justify-between gap-4"><span className="text-2xl text-[#f3ead7] font-semibold truncate">{report.value}</span><ArrowUpRight size={18} className="text-[#c77819] shrink-0" /></div></div>)}</div>;
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) { return <div className="fixed inset-0 z-[60] bg-[#0d0b08]/60 backdrop-blur-sm flex items-center justify-center p-6"><div className="w-full max-w-lg bg-[#17120c] rounded-2xl shadow-2xl"><div className="flex items-center justify-between p-6 border-b border-[#3b2e1a]"><h3 className="font-serif text-2xl text-[#f3ead7]">{title}</h3><button onClick={onClose} aria-label="Close dialog" className="text-[#9a8a6c] hover:text-[#f3ead7]"><X size={20} /></button></div>{children}</div></div>; }
function OrderModal({ onClose, onSave }: { onClose: () => void; onSave: (draft: OrderDraft) => Promise<void> }) { const [draft, setDraft] = useState<OrderDraft>({ guest: '', type: 'Dine In', table: '', total: '' }); const update = (key: keyof OrderDraft, value: string) => setDraft((current) => ({ ...current, [key]: value })); return <Modal title="Create New Order" onClose={onClose}><form onSubmit={(event) => { event.preventDefault(); void onSave(draft); }} className="p-6 space-y-4"><input required value={draft.guest} onChange={(event) => update('guest', event.target.value)} placeholder="Guest name" className="w-full border border-[#3b2e1a] rounded-lg p-3 outline-none focus:border-[#0c7461]" /><div className="grid grid-cols-2 gap-4"><select value={draft.type} onChange={(event) => update('type', event.target.value)} className="border border-[#3b2e1a] rounded-lg p-3"><option>Dine In</option><option>Takeaway</option><option>Delivery</option></select><input value={draft.table} onChange={(event) => update('table', event.target.value)} placeholder="Table number" className="border border-[#3b2e1a] rounded-lg p-3 outline-none focus:border-[#0c7461]" /></div><input required type="number" min="0" step="1" value={draft.total} onChange={(event) => update('total', event.target.value)} placeholder="Order total (₹)" className="w-full border border-[#3b2e1a] rounded-lg p-3 outline-none focus:border-[#0c7461]" /><button className="w-full rounded-lg bg-[#0c7461] text-white py-3 font-semibold">Save Order</button></form></Modal>; }
function MenuModal({ onClose, onSave }: { onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => Promise<void> }) { return <Modal title="Add Menu Item" onClose={onClose}><form onSubmit={(event) => void onSave(event)} className="p-6 space-y-4"><input required name="name" placeholder="Dish name" className="w-full border border-[#3b2e1a] rounded-lg p-3 outline-none focus:border-[#0c7461]" /><div className="grid grid-cols-2 gap-4"><input required name="category" placeholder="Category" className="border border-[#3b2e1a] rounded-lg p-3 outline-none focus:border-[#0c7461]" /><select name="dishType" className="border border-[#3b2e1a] rounded-lg p-3"><option>Veg</option><option>Non-Veg</option></select></div><input required name="price" type="number" min="0" placeholder="Price (₹)" className="w-full border border-[#3b2e1a] rounded-lg p-3 outline-none focus:border-[#0c7461]" /><textarea name="description" placeholder="Short description" rows={3} className="w-full border border-[#3b2e1a] rounded-lg p-3 outline-none focus:border-[#0c7461]" /><button className="w-full rounded-lg bg-[#f6a313] text-[#f3ead7] py-3 font-semibold">Save Menu Item</button></form></Modal>; }
