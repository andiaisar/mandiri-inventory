import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Save, XCircle } from 'lucide-react';

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    serialNumber: '',
    branchName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Item berhasil ditambahkan!');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Layout 
      activeMenu="add-item"
      title="Tambah Item Baru"
      subtitle="Masukkan detail item inventory"
    >
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        {/* Info Card */}
        <div className="mb-6 p-4 bg-blue-50 border border-mandiri-blue rounded-lg">
          <p className="text-sm text-gray-700">
            <strong className="text-mandiri-blue">Catatan:</strong> Pastikan semua informasi yang dimasukkan sudah benar sebelum menyimpan.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div className="md:col-span-2">
              <label htmlFor="itemName" className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Item <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mandiri-blue focus:border-transparent transition-all"
                placeholder="Misal: Laptop Dell Latitude 5420"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mandiri-blue focus:border-transparent transition-all bg-white"
              >
                <option value="">Pilih Kategori</option>
                <option value="elektronik">Elektronik</option>
                <option value="furniture">Furniture</option>
                <option value="kendaraan">Kendaraan</option>
                <option value="alat-tulis">Alat Tulis</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            {/* Serial Number */}
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor Seri
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mandiri-blue focus:border-transparent transition-all"
                placeholder="SN123456789"
              />
            </div>

            {/* Branch Name */}
            <div className="md:col-span-2">
              <label htmlFor="branchName" className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Cabang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mandiri-blue focus:border-transparent transition-all"
                placeholder="Misal: Cabang Makassar Sudirman"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-mandiri-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              <Save size={20} />
              <span>Simpan Item</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
            >
              <XCircle size={20} />
              <span>Batal</span>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddItem;
