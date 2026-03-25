import React from 'react';
import { PackagePlus, Plus, Image as ImageIcon, X } from 'lucide-react';
import { Input } from './Input';

interface AddProductScreenProps {
  productImage: string;
  setProductImage: (val: string) => void;
  productName: string;
  setProductName: (val: string) => void;
  productCode: string;
  setProductCode: (val: string) => void;
  productCost: string;
  setProductCost: (val: string) => void;
  productPrice: string;
  setProductPrice: (val: string) => void;
  productStock: string;
  setProductStock: (val: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => void;
  handleAddProduct: (e: React.FormEvent) => void;
}

export const AddProductScreen: React.FC<AddProductScreenProps> = ({
  productImage,
  setProductImage,
  productName,
  setProductName,
  productCode,
  setProductCode,
  productCost,
  setProductCost,
  productPrice,
  setProductPrice,
  productStock,
  setProductStock,
  handleImageUpload,
  handleAddProduct
}) => {
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-300 mt-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-3">ကုန်ပစ္စည်းအသစ် ဖြည့်သွင်းရန်</h2>
        <form onSubmit={handleAddProduct} className="space-y-5">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100">
            {productImage ? (
              <div className="relative group">
                <img src={productImage} className="h-32 w-32 object-cover rounded-xl shadow-sm" />
                <button type="button" onClick={() => setProductImage('')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"><X size={14} /></button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-600"><ImageIcon size={24} /></div>
                <span className="text-sm font-bold text-slate-700">ပစ္စည်းပုံထည့်ရန် နှိပ်ပါ</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
              </label>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="ပစ္စည်းအမည်" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            <Input label="Code" value={productCode} onChange={(e) => setProductCode(e.target.value)} required />
            <Input label="အရင်းဈေး (Ks)" type="number" value={productCost} onChange={(e) => setProductCost(e.target.value)} required placeholder="အမြတ်တွက်ရန်" />
            <Input label="ရောင်းဈေး (Ks)" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
            <div className="md:col-span-2">
              <Input label="လက်ကျန်အရေအတွက်" type="number" value={productStock} onChange={(e) => setProductStock(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm">
            <Plus size={18} /> မှတ်တမ်းတင်မည်
          </button>
        </form>
      </div>
    </div>
  );
};
