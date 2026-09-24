'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, PanelsTopLeft, Package, Inbox, FileText, Images, Settings2, ExternalLink, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { findSection } from '@/lib/admin/sections';
import './admin.css';

const navigation = [
  {label:'Workspace',items:[{label:'Overview',href:'/admin',icon:LayoutDashboard},{label:'Inquiries',href:'/admin/inquiries',icon:Inbox}]},
  {label:'Website',items:[{label:'Homepage & sections',href:'/admin/website',icon:PanelsTopLeft},{label:'Product catalog',href:'/admin/products',icon:Package},{label:'Blog & news',href:'/admin/blogs',icon:FileText},{label:'Gallery',href:'/admin/website/gallery',icon:Images}]},
  {label:'Settings',items:[{label:'Footer & contact',href:'/admin/website/footer',icon:Settings2}]},
];
export default function AdminLayout({children}:{children:React.ReactNode}) {
  const pathname=usePathname(); const router=useRouter();
  const [authorized,setAuthorized]=useState(false); const [checking,setChecking]=useState(true);
  const [menu,setMenu]=useState(false); const [error,setError]=useState('');
  const menuRef=useRef<HTMLButtonElement>(null);
  const login=pathname==='/admin/login';
  useEffect(()=>{
    let active=true; setChecking(true); setMenu(false);
    apiFetch('/api/admin/auth',{cache:'no-store'}).then(res=>{
      if(!active)return;setAuthorized(res.ok);
      if(!res.ok&&!login)router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      setChecking(false);
    }).catch(()=>{if(active){setAuthorized(false);setChecking(false);if(!login)router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);}});
    return()=>{active=false;};
  },[pathname,login,router]);
  useEffect(()=>{
    if(!authorized||login)return;
    let timer:ReturnType<typeof setTimeout>;
    const reset=()=>{clearTimeout(timer);timer=setTimeout(()=>{setAuthorized(false);void apiFetch('/api/admin/auth',{method:'DELETE'});router.replace('/admin/login');},15*60*1000);};
    const events=['pointerdown','keydown','scroll']; reset();events.forEach(event=>window.addEventListener(event,reset));
    return()=>{clearTimeout(timer);events.forEach(event=>window.removeEventListener(event,reset));};
  },[authorized,login,router]);
  useEffect(()=>{
    if(!menu)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenu(false);menuRef.current?.focus();}};
    window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
  },[menu]);
  async function logout(){try{const res=await apiFetch('/api/admin/auth',{method:'DELETE'});if(!res.ok)throw Error();setAuthorized(false);router.replace('/admin/login');}catch{setError('Could not sign out. Please try again.');}}
  if(login)return <div className="admin-shell">{children}</div>;
  if(checking||!authorized)return <div className="admin-shell flex min-h-screen items-center justify-center"><p role="status" className="admin-muted">Checking your session…</p></div>;
  const section=findSection(pathname.split('/')[3]||'');
  const current=section?.title||navigation.flatMap(group=>group.items).find(item=>item.href==='/admin'?pathname===item.href:pathname.startsWith(item.href))?.label||'Workspace';
  return <div className="admin-shell">
    <a href="#admin-content" className="sr-only focus:not-sr-only">Skip to content</a>
    {menu&&<button className="admin-overlay" aria-label="Close navigation" onClick={()=>setMenu(false)}/>}
    <aside className={`admin-sidebar ${menu?'open':''}`} aria-label="Admin navigation" id="admin-navigation">
      <button className="admin-mobile-close" aria-label="Close navigation" onClick={()=>{setMenu(false);menuRef.current?.focus();}}><X size={18}/></button>
      <Link href="/admin" className="admin-brand"><img src="/logo.png" alt=""/><span>Winner Pack<small>Website studio</small></span></Link>
      <nav>{navigation.map(group=><div key={group.label}><div className="admin-nav-heading">{group.label}</div>{group.items.map(item=>{
        const active=item.href==='/admin'?pathname==='/admin':item.href==='/admin/website'?pathname.startsWith(item.href)&&!['gallery','footer'].includes(section?.id||''):pathname.startsWith(item.href);
        return <Link key={item.href} href={item.href} className="admin-nav-link" aria-current={active?'page':undefined}><item.icon/><span>{item.label}</span></Link>;
      })}</div>)}</nav>
      <div className="admin-sidebar-footer"><a href="/" target="_blank" rel="noreferrer" className="admin-nav-link"><ExternalLink/>View website</a><button onClick={logout} className="admin-nav-link w-full"><LogOut/>Sign out</button><p>Winner Pack Technologies<br/>We serve to deserve.</p></div>
    </aside>
    <div className="admin-main"><header className="admin-topbar"><div className="flex items-center gap-3"><button ref={menuRef} className="admin-menu-button" aria-label="Open navigation" aria-expanded={menu} aria-controls="admin-navigation" onClick={()=>setMenu(true)}><Menu size={20}/></button><p className="admin-hide-mobile">Workspace</p><ChevronRight size={13} className="admin-hide-mobile text-gray-400"/><strong>{current}</strong></div><div className="flex items-center gap-3"><span className="admin-badge admin-hide-mobile">Administrator</span><div className="admin-avatar" aria-label="Winner Pack administrator">WP</div></div></header>
      <main id="admin-content" className="admin-content">{error&&<p role="alert" className="admin-notice error">{error}</p>}<div className={pathname.startsWith('/admin/products')||pathname.startsWith('/admin/blogs')||pathname.startsWith('/admin/inquiries')?'admin-legacy':''}>{children}</div></main>
    </div>
  </div>;
}
