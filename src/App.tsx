import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { supabase } from './lib/supabase';
import { Product, CartItem, Record as AppRecord, PaymentAccount } from './types';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { HomeScreen } from './components/HomeScreen';
import { PosScreen } from './components/PosScreen';
import { AddProductScreen } from './components/AddProductScreen';
import { ViewProductsScreen } from './components/ViewProductsScreen';
import { DeliveryScreen } from './components/DeliveryScreen';
import { RecordsScreen } from './components/RecordsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { EditProductModal } from './components/EditProductModal';
import { SellModal } from './components/SellModal';
import { VoucherModal } from './components/VoucherModal';
import { PosCheckoutModal } from './components/PosCheckoutModal';
import { DebtPaymentModal } from './components/DebtPaymentModal';
import { CancelOrderModal } from './components/CancelOrderModal';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isInstallable, setIsInstallable] = useState(false);
  const deferredPrompt = useRef<any>(null);

  const [activeScreen, setActiveScreen] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [homeFilter, setHomeFilter] = useState('monthly');

  const prodClickTimer = useRef(0);
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [records, setRecords] = useState<AppRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentAccounts, setPaymentAccounts] = useState<PaymentAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dailyDate, setDailyDate] = useState(getTodayDate());
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [shopName, setShopName] = useState('SOKO App');
  const [shopPhone, setShopPhone] = useState('');
  const [shopAddress, setShopAddress] = useState('');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [isPosCheckoutOpen, setIsPosCheckoutOpen] = useState(false);
  const [posTenderedAmount, setPosTenderedAmount] = useState('');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [debtPaymentRecord, setDebtPaymentRecord] = useState<AppRecord | null>(null);
  const [debtPaymentDate, setDebtPaymentDate] = useState(getTodayDate());
  const [debtPaymentMethod, setDebtPaymentMethod] = useState('Cash');
  const [cancelOrderModal, setCancelOrderModal] = useState<AppRecord | null>(null);
  const [voucherData, setVoucherData] = useState<AppRecord | null>(null);

  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCost, setProductCost] = useState('');
  const [productStock, setProductStock] = useState('');

  const [sellModal, setSellModal] = useState<Product | null>(null);
  const [sellQty, setSellQty] = useState(1);
  const [sellCustName, setSellCustName] = useState('');
  const [sellIsDelivery, setSellIsDelivery] = useState(false);
  const [sellPhone, setSellPhone] = useState('');
  const [sellAddress, setSellAddress] = useState('');
  const [sellCity, setSellCity] = useState('');
  const [sellReceived, setSellReceived] = useState('');
  const [sellRemark, setSellRemark] = useState('');
  const [sellPaymentMethod, setSellPaymentMethod] = useState('Cash');

  const [newAccProvider, setNewAccProvider] = useState('KBZ Pay');
  const [newAccName, setNewAccName] = useState('');
  const [newAccNumber, setNewAccNumber] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === 'accepted') setIsInstallable(false);
      deferredPrompt.current = null;
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 overflow-hidden animate-pulse border border-slate-100">
          <img src="./logo.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    );
  }

  if (!session) {
        setProducts([]); setRecords([]); setPaymentAccounts([]); setCart([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) alert("Google ဖြင့် ချိတ်ဆက်ရာတွင် အခက်အခဲရှိပါသည်။: " + error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchSupabaseData = async () => {
    if (!session?.user?.id) return;
    const userId = session.user.id;
    try {
      const { data: setObj } = await supabase.from('user_settings').select('*').eq('user_id', userId).single();
      if (setObj && setObj.payment_accounts) setPaymentAccounts(setObj.payment_accounts);

      const { data: prodData } = await supabase.from('products').select('*').eq('user_id', userId);
      if (prodData) {
        const formattedProds = prodData.map(d => ({ id: Number(d.id), ...d.data })).sort((a, b) => b.id - a.id);
        setProducts(formattedProds);
      }

      const { data: recData } = await supabase.from('records').select('*').eq('user_id', userId);
      if (recData) {
        const formattedRecs = recData.map(d => ({ id: Number(d.id), ...d.data })).sort((a, b) => b.id - a.id);
        setRecords(formattedRecs);
      }
    } catch (e) { console.error("Error fetching data: ", e); }
  };

  useEffect(() => {
    if (session?.user?.id) {
      const localShop = localStorage.getItem(`soko_shopinfo_${session.user.id}`);
      if (localShop) {
        const s = JSON.parse(localShop);
        setShopName(s.name || 'SOKO App');
        setShopPhone(s.phone || '');
        setShopAddress(s.address || '');
      }
      fetchSupabaseData();
    }
  }, [session]);

  const showSuccessMessage = (msg: string) => {
    setSuccessMsg(msg); setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const saveProduct = async (id: number, data: any) => {
    if (!session?.user?.id) return;
    const dataToSave = { ...data, user_id: session.user.id };
    await supabase.from('products').upsert({ id: id.toString(), user_id: session.user.id, data: dataToSave });
    fetchSupabaseData();
  };

  const deleteProd = async (id: number) => {
    if (!session?.user?.id) return;
    await supabase.from('products').delete().eq('id', id.toString());
    setProducts(products.filter(p => p.id !== id));
    showSuccessMessage('ပစ္စည်းစာရင်း ဖျက်ပြီးပါပြီ');
  };

  const saveRecord = async (id: number, data: any) => {
    if (!session?.user?.id) return;
    const dataToSave = { ...data, user_id: session.user.id };
    await supabase.from('records').upsert({ id: id.toString(), user_id: session.user.id, data: dataToSave });
    fetchSupabaseData();
  };

  const deleteRec = async (id: number) => {
    if (!session?.user?.id) return;
    await supabase.from('records').delete().eq('id', id.toString());
    setRecords(records.filter(r => r.id !== id));
    showSuccessMessage('မှတ်တမ်း ဖျက်ပြီးပါပြီ');
  };

  const saveSettings = async (accounts: PaymentAccount[]) => {
    if (!session?.user?.id) return;
    await supabase.from('user_settings').upsert({ user_id: session.user.id, payment_accounts: accounts, updated_at: new Date().toISOString() });
    setPaymentAccounts(accounts);
    showSuccessMessage('ဆက်တင် သိမ်းဆည်းပြီးပါပြီ');
  };

  const saveShopInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    localStorage.setItem(`soko_shopinfo_${session.user.id}`, JSON.stringify({ name: shopName, phone: shopPhone, address: shopAddress }));
    showSuccessMessage('ဆိုင်အချက်အလက် သိမ်းဆည်းပြီးပါပြီ');
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productCode || !productPrice) return;
    const id = Date.now();
    const newProduct = {
      id, image: productImage, name: productName, code: productCode,
      price: Number(productPrice), cost: Number(productCost) || 0, stock: Number(productStock) || 0
    };
    setProducts([newProduct, ...products]);
    setProductImage(''); setProductName(''); setProductCode(''); setProductPrice(''); setProductCost(''); setProductStock('');
    showSuccessMessage('ပစ္စည်းစာရင်း သွင်းပြီးပါပြီ');
    setActiveScreen('viewProducts');
    await saveProduct(id, newProduct);
  };

  const handleEditProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.code || !editingProduct.price) return;
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    const prodToSave = editingProduct;
    setEditingProduct(null);
    showSuccessMessage('ပစ္စည်းအချက်အလက် ပြင်ဆင်ပြီးပါပြီ');
    await saveProduct(prodToSave.id, prodToSave);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          if (isEditing && editingProduct) setEditingProduct({ ...editingProduct, image: resizedBase64 });
          else setProductImage(resizedBase64);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductClick = (product: Product) => {
    const now = new Date().getTime();
    if (now - prodClickTimer.current < 400) {
      setSellModal(product); setSellQty(1); setSellCustName(''); setSellIsDelivery(false);
      setSellPhone(''); setSellAddress(''); setSellCity(''); setSellReceived(''); setSellRemark('');
      setSellPaymentMethod('Cash');
    }
    prodClickTimer.current = now;
  };

  const handleConfirmSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellModal) return;
    if (sellQty > sellModal.stock) { alert("လက်ကျန်မလောက်ပါ! ကျေးဇူးပြု၍ အရေအတွက် ပြန်စစ်ပါ။"); return; }

    const updatedProduct = { ...sellModal, stock: sellModal.stock - sellQty };
    setProducts(products.map(p => p.id === sellModal.id ? updatedProduct : p));

    const totalAmount = sellModal.price * sellQty;
    const rcv = Number(sellReceived) || 0;
    const bal = totalAmount > rcv ? totalAmount - rcv : 0;
    const costPrice = sellModal.cost || 0;
    const profitAmount = totalAmount - (costPrice * sellQty);
    const id = Date.now();

    const newOrder: AppRecord = {
      id, date: getTodayDate(), name: sellCustName || 'Customer', code: sellModal.code,
      productName: sellModal.name, city: sellIsDelivery ? sellCity : '-', quantity: sellQty,
      amount: totalAmount, received: rcv, change: rcv > totalAmount ? rcv - totalAmount : 0, balance: bal,
      profit: profitAmount, needsDelivery: sellIsDelivery, customerPhone: sellPhone, deliveryAddress: sellAddress,
      deliveryStatus: sellIsDelivery ? 'pending' : 'n/a', remark: sellRemark,
      paymentMethod: rcv > 0 ? sellPaymentMethod : '-', paidDate: bal === 0 ? getTodayDate() : null
    };

    setRecords([newOrder, ...records]);
    setSellModal(null);
    setVoucherData(newOrder);
    showSuccessMessage('ရောင်းချခြင်း အောင်မြင်ပါသည်');
    await saveProduct(sellModal.id, updatedProduct);
    await saveRecord(id, newOrder);
  };

  const confirmCancelOrder = async () => {
    if (!cancelOrderModal) return;
    const record = cancelOrderModal;
    if (record.cartItems && record.cartItems.length > 0) {
      const updatedProducts = [...products];
      for (const item of record.cartItems) {
        const pIndex = updatedProducts.findIndex(p => p.id === item.id);
        if (pIndex !== -1) {
          updatedProducts[pIndex] = { ...updatedProducts[pIndex], stock: updatedProducts[pIndex].stock + item.qty };
          await saveProduct(item.id, updatedProducts[pIndex]);
        }
      }
      setProducts(updatedProducts);
    } else {
      const relatedProduct = products.find(p => p.code === record.code);
      if (relatedProduct) {
        const restoredProduct = { ...relatedProduct, stock: relatedProduct.stock + record.quantity };
        setProducts(products.map(p => p.id === restoredProduct.id ? restoredProduct : p));
        await saveProduct(restoredProduct.id, restoredProduct);
      }
    }
    setRecords(records.filter(r => r.id !== record.id));
    setCancelOrderModal(null);
    showSuccessMessage('အော်ဒါကို ဖျက်သိမ်း (Cancel) လုပ်ပြီးပါပြီ');
    await deleteRec(record.id);
  };

  const handleDebtPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtPaymentRecord) return;
    const existing = records.find(r => r.id === debtPaymentRecord.id);
    if (!existing) return;
    const updatedRec: AppRecord = {
      ...existing, received: existing.amount, balance: 0, change: 0,
      paidDate: debtPaymentDate, paymentMethod: debtPaymentMethod
    };
    setRecords(records.map(r => r.id === debtPaymentRecord.id ? updatedRec : r));
    setDebtPaymentRecord(null);
    showSuccessMessage('အကြွေးပေးချေမှု မှတ်တမ်းတင်ပြီးပါပြီ');
    await saveRecord(existing.id, updatedRec);
  };

  const toggleDeliveryStatus = async (id: number, currentStatus: string) => {
    const existing = records.find(r => r.id === id);
    if (!existing) return;
    const updated: AppRecord = { ...existing, deliveryStatus: currentStatus === 'delivered' ? 'pending' : 'delivered' as any };
    setRecords(records.map(r => r.id === id ? updated : r));
    await saveRecord(id, updated);
  };

  const handleAddPaymentAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccName || !newAccNumber) return;
    const newAcc = { id: Date.now(), provider: newAccProvider, name: newAccName, number: newAccNumber };
    const newAccounts = [...paymentAccounts, newAcc];
    setPaymentAccounts(newAccounts);
    setNewAccName(''); setNewAccNumber('');
    saveSettings(newAccounts);
  };

  const handleRemovePaymentAccount = (id: number) => {
    if (window.confirm('ဒီအကောင့်ကို ဖျက်ရန် သေချာပါသလား?')) {
      const newAccounts = paymentAccounts.filter(a => a.id !== id);
      setPaymentAccounts(newAccounts);
      saveSettings(newAccounts);
    }
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return alert("လက်ကျန်မရှိတော့ပါ!");
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) return alert("လက်ကျန်မလောက်ပါ!");
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        if (newQty > 0 && newQty <= item.stock) return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const posTotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  const openPosCheckout = () => {
    setSellCustName(''); setSellIsDelivery(false); setSellPhone(''); setSellAddress('');
    setSellCity(''); setPosTenderedAmount(''); setSellRemark(''); setSellPaymentMethod('Cash');
    setIsPosCheckoutOpen(true);
  };

  const handlePosCheckoutComplete = async () => {
    if (cart.length === 0) return;
    const rcv = Number(posTenderedAmount) || 0;
    const bal = posTotal > rcv ? posTotal - rcv : 0;
    const change = rcv > posTotal ? rcv - posTotal : 0;
    const updatedProducts = [...products];
    let totalCost = 0;
    for (const item of cart) {
      const pIndex = updatedProducts.findIndex(p => p.id === item.id);
      if (pIndex !== -1) {
        updatedProducts[pIndex] = { ...updatedProducts[pIndex], stock: updatedProducts[pIndex].stock - item.qty };
        await saveProduct(item.id, updatedProducts[pIndex]);
      }
      totalCost += ((item.cost || 0) * item.qty);
    }
    const profitAmount = posTotal - totalCost;
    const id = Date.now();
    const newOrder: AppRecord = {
      id, date: getTodayDate(), name: sellCustName || 'Customer', code: 'POS-' + id.toString().slice(-4),
      productName: cart.length > 1 ? `${cart[0].name} (+${cart.length - 1})` : cart[0].name,
      cartItems: cart, city: sellIsDelivery ? sellCity : '-',
      quantity: cart.reduce((sum, item) => sum + item.qty, 0),
      amount: posTotal, received: rcv, change: change, balance: bal,
      profit: profitAmount, needsDelivery: sellIsDelivery,
      customerPhone: sellPhone, deliveryAddress: sellAddress,
      deliveryStatus: sellIsDelivery ? 'pending' : 'n/a', remark: sellRemark,
      paymentMethod: rcv > 0 ? sellPaymentMethod : '-', paidDate: bal === 0 ? getTodayDate() : null
    };
    setProducts(updatedProducts);
    setRecords([newOrder, ...records]);
    setCart([]);
    setIsPosCheckoutOpen(false);
    setVoucherData(newOrder);
    showSuccessMessage('အရောင်းစာရင်း ရှင်းလင်းပြီးပါပြီ');
    await saveRecord(id, newOrder);
  };

  const downloadVoucher = () => {
    const element = document.getElementById('receipt-box');
    if (element) {
      html2canvas(element, { scale: 3, backgroundColor: '#ffffff', useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = `SOKO_Receipt_${voucherData?.id.toString().slice(-6)}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      });
    }
  };

  const generatePDF = () => {
    const element = document.getElementById('record-table-container');
    if (element) {
      const actionCols = element.querySelectorAll('th:last-child, td:last-child');
      actionCols.forEach(col => (col as HTMLElement).style.display = 'none');
      html2canvas(element, { scale: 2 }).then(canvas => {
        actionCols.forEach(col => (col as HTMLElement).style.display = '');
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFontSize(16);
        pdf.text("SOKO App - Sales Report", 14, 15);
        pdf.setFontSize(10);
        pdf.text(`Period: ${filterOptions[homeFilter]}`, 14, 22);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 28;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 14, 30, pdfWidth, pdfHeight);
        pdf.save(`SOKO_Report_${homeFilter}.pdf`);
      });
    }
  };

  const deleteRecordData = async (id: number) => {
    if (window.confirm('ဒီမှတ်တမ်းကို ဖျက်ရန် သေချာပါသလား?')) {
      await deleteRec(id);
    }
  };

  const filteredRecords = records.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.code.toLowerCase().includes(searchTerm.toLowerCase()));
  const dailyRecords = records.filter(r => r.date === dailyDate);
  const deliveryRecords = records.filter(r => r.needsDelivery);
  const lowStockProducts = products.filter(p => p.stock <= 3);

  const getFilterDates = () => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const currYear = todayStr.slice(0, 4);
    const currMonth = todayStr.slice(0, 7);
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(now.setDate(diff));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { currYear, currMonth, startOfWeekStr: startOfWeek.toISOString().split('T')[0], endOfWeekStr: endOfWeek.toISOString().split('T')[0] };
  };

  const { currYear, currMonth, startOfWeekStr, endOfWeekStr } = getFilterDates();
  const homeFilteredRecords = records.filter(r => {
    if (homeFilter === 'weekly') return r.date >= startOfWeekStr && r.date <= endOfWeekStr;
    else if (homeFilter === 'monthly') return r.date.startsWith(currMonth);
    else if (homeFilter === 'yearly') return r.date.startsWith(currYear);
    return true;
  });

  const homeStats = {
    orders: homeFilteredRecords.length,
    sales: homeFilteredRecords.reduce((sum, r) => sum + r.amount, 0),
    income: homeFilteredRecords.reduce((sum, r) => sum + r.received, 0),
    expense: homeFilteredRecords.reduce((sum, r) => sum + r.change, 0),
    balance: homeFilteredRecords.reduce((sum, r) => sum + r.balance, 0),
    profit: homeFilteredRecords.reduce((sum, r) => sum + (r.profit || 0), 0),
  };

  const filterOptions: Record<string, string> = { weekly: 'ယခုအပတ်', monthly: 'ယခုလ', yearly: 'ယခုနှစ်', all: 'အားလုံး' };
  const titles: Record<string, string> = { home: 'ပင်မစာမျက်နှာ', pos: 'POS (လက်လီအရောင်း)', addProduct: 'ပစ္စည်း သွင်းမည်', viewProducts: 'ကုန်ပစ္စည်း စာရင်း', view: 'မှတ်တမ်းအားလုံး', daily: 'နေ့စဉ်အရောင်း', delivery: 'Delivery စာရင်း', settings: 'ဆက်တင်များ' };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 overflow-hidden animate-pulse border border-slate-100">
          <img src="./logo.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    );
  }
  if (!session) return <Login handleGoogleLogin={handleGoogleLogin} isInstallable={isInstallable} handleInstallClick={handleInstallClick} />;

  return (
    <Layout
      activeScreen={activeScreen}
      setActiveScreen={setActiveScreen}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      isInstallable={isInstallable}
      handleInstallClick={handleInstallClick}
      titles={titles}
      productsCount={products.length}
      recordsCount={records.length}
      deliveryCount={deliveryRecords.length}
      user={session.user}
      handleLogout={handleLogout}
    >
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-5 shadow-lg z-50 font-bold whitespace-nowrap">
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {activeScreen === 'home' && <HomeScreen lowStockProducts={lowStockProducts} homeFilter={homeFilter} setHomeFilter={setHomeFilter} homeStats={homeStats} filterOptions={filterOptions} />}
      {activeScreen === 'pos' && (
        <PosScreen
          products={products}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cart={cart}
          addToCart={addToCart}
          updateCartQty={updateCartQty}
          removeFromCart={removeFromCart}
          showMobileCart={showMobileCart}
          setShowMobileCart={setShowMobileCart}
          posTotal={posTotal}
          openPosCheckout={openPosCheckout}
          setCart={setCart}
        />
      )}
      {activeScreen === 'addProduct' && (
        <AddProductScreen
          productImage={productImage}
          setProductImage={setProductImage}
          productName={productName}
          setProductName={setProductName}
          productCode={productCode}
          setProductCode={setProductCode}
          productCost={productCost}
          setProductCost={setProductCost}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          productStock={productStock}
          setProductStock={setProductStock}
          handleImageUpload={handleImageUpload}
          handleAddProduct={handleAddProduct}
        />
      )}
      {activeScreen === 'viewProducts' && <ViewProductsScreen products={products} handleProductClick={handleProductClick} setEditingProduct={setEditingProduct} onDelete={deleteProd} />}
      {activeScreen === 'delivery' && <DeliveryScreen deliveryRecords={deliveryRecords} toggleDeliveryStatus={toggleDeliveryStatus} />}
      {activeScreen === 'settings' && (
        <SettingsScreen
          shopName={shopName}
          setShopName={setShopName}
          shopPhone={shopPhone}
          setShopPhone={setShopPhone}
          shopAddress={shopAddress}
          setShopAddress={setShopAddress}
          saveShopInfo={saveShopInfo}
          paymentAccounts={paymentAccounts}
          handleRemovePaymentAccount={handleRemovePaymentAccount}
          newAccProvider={newAccProvider}
          setNewAccProvider={setNewAccProvider}
          newAccName={newAccName}
          setNewAccName={setNewAccName}
          newAccNumber={newAccNumber}
          setNewAccNumber={setNewAccNumber}
          handleAddPaymentAccount={handleAddPaymentAccount}
        />
      )}
      {(activeScreen === 'daily' || activeScreen === 'view') && (
        <RecordsScreen
          activeScreen={activeScreen}
          dailyDate={dailyDate}
          setDailyDate={setDailyDate}
          homeFilter={homeFilter}
          setHomeFilter={setHomeFilter}
          filterOptions={filterOptions}
          generatePDF={generatePDF}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          data={activeScreen === 'daily' ? dailyRecords : filteredRecords}
          onDebtPayment={setDebtPaymentRecord}
          onCancelOrder={setCancelOrderModal}
          onDelete={deleteRecordData}
        />
      )}

      {editingProduct && <EditProductModal editingProduct={editingProduct} setEditingProduct={setEditingProduct} onImageUpload={handleImageUpload} onSubmit={handleEditProductSubmit} />}
      {sellModal && (
        <SellModal
          product={sellModal}
          sellQty={sellQty}
          setSellQty={setSellQty}
          sellCustName={sellCustName}
          setSellCustName={setSellCustName}
          sellReceived={sellReceived}
          setSellReceived={setSellReceived}
          sellPaymentMethod={sellPaymentMethod}
          setSellPaymentMethod={setSellPaymentMethod}
          sellIsDelivery={sellIsDelivery}
          setSellIsDelivery={setSellIsDelivery}
          sellPhone={sellPhone}
          setSellPhone={setSellPhone}
          sellCity={sellCity}
          setSellCity={setSellCity}
          sellAddress={sellAddress}
          setSellAddress={setSellAddress}
          sellRemark={sellRemark}
          setSellRemark={setSellRemark}
          paymentAccounts={paymentAccounts}
          onClose={() => setSellModal(null)}
          onConfirm={handleConfirmSale}
        />
      )}
      {voucherData && <VoucherModal voucherData={voucherData} shopName={shopName} shopPhone={shopPhone} shopAddress={shopAddress} onClose={() => setVoucherData(null)} onDownload={downloadVoucher} />}
      {isPosCheckoutOpen && (
        <PosCheckoutModal
          posTotal={posTotal}
          posTenderedAmount={posTenderedAmount}
          setPosTenderedAmount={setPosTenderedAmount}
          sellCustName={sellCustName}
          setSellCustName={setSellCustName}
          sellPhone={sellPhone}
          setSellPhone={setSellPhone}
          sellIsDelivery={sellIsDelivery}
          setSellIsDelivery={setSellIsDelivery}
          sellCity={sellCity}
          setSellCity={setSellCity}
          sellAddress={sellAddress}
          setSellAddress={setSellAddress}
          sellRemark={sellRemark}
          setSellRemark={setSellRemark}
          sellPaymentMethod={sellPaymentMethod}
          setSellPaymentMethod={setSellPaymentMethod}
          paymentAccounts={paymentAccounts}
          onClose={() => setIsPosCheckoutOpen(false)}
          onConfirm={handlePosCheckoutComplete}
        />
      )}
      {debtPaymentRecord && (
        <DebtPaymentModal
          debtPaymentRecord={debtPaymentRecord}
          debtPaymentDate={debtPaymentDate}
          setDebtPaymentDate={setDebtPaymentDate}
          debtPaymentMethod={debtPaymentMethod}
          setDebtPaymentMethod={setDebtPaymentMethod}
          paymentAccounts={paymentAccounts}
          onClose={() => setDebtPaymentRecord(null)}
          onSubmit={handleDebtPaymentSubmit}
        />
      )}
      {cancelOrderModal && <CancelOrderModal cancelOrderModal={cancelOrderModal} onClose={() => setCancelOrderModal(null)} onConfirm={confirmCancelOrder} />}
    </Layout>
  );
}
