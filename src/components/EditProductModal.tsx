import React from 'react';
import { Edit3, X, Image as ImageIcon, Save } from 'lucide-react';
import { Input } from './Input';
import { Product } from '@/src/types';

interface EditProductModalProps {
  editingProduct: Product;
  setEditingProduct: (p: Product | null) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  editingProduct,
  setEditingProduct,
  onImageUpload,
  onSubmit
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Edit3 size={18} className="text-indigo-600" /> ပစ္စည်းပြင်ဆင်ရန်
          </h3>
          <button onClick={() => setEditingProduct(null)} className="bg-slate-100 p-1.5 rounded-full text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <form id="editProdForm" onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
              {editingProduct.image ? (
                <div className="relative group">
                  <img src={editingProduct.image} className="h-24 w-24 object-cover rounded-xl shadow-sm" />
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, image: '' })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer w-full py-2">
                  <div className="bg-indigo-100 p-2 rounded-full mb-2 text-indigo-600">
                    <ImageIcon size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">ပုံပြောင်းရန် နှိပ်ပါ</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(e, true)} />
                </label>
              )}
            </div>

            <Input
              label="ပစ္စည်းအမည်"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              required
            />
            <Input
              label="Code"
              value={editingProduct.code}
              onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="အရင်းဈေး (Ks)"
                type="number"
                value={editingProduct.cost || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, cost: Number(e.target.value) })}
                required
              />
              <Input
                label="ရောင်းဈေး (Ks)"
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                required
              />
              <div className="col-span-2">
                <Input
                  label="လက်ကျန်"
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 flex gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="editProdForm"
            className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl flex justify-center items-center gap-2"
          >
            <Save size={16} /> သိမ်းမည်
          </button>
        </div>
      </div>
    </div>
  );
};
