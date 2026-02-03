import React, { useState } from 'react';
import PharmacistSidebar from '../../components/PharmacistComponents/PharmacistSidebar';
import PharmacistHeader from '../../components/PharmacistComponents/PharmacistHeader';

const AddMedicine = () => {
    const [formData, setFormData] = useState({
        medicineName: '',
        category: '',
        manufacturer: '',
        stockQuantity: 0,
        price: 0,
        expiryDate: '',
    });
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Medicine Data:', formData);
        alert('Medicine added successfully!');
        // Reset form
        setFormData({
            medicineName: '',
            category: '',
            manufacturer: '',
            stockQuantity: 0,
            price: 0,
            expiryDate: '',
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <PharmacistSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <PharmacistHeader pharmacistName="Dr. Smith" toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Add Medicine</h1>
                        <p className="text-gray-500">Add new medicine to inventory</p>
                    </div>

                    {/* Form Container */}
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="text-2xl">✏️</span>
                            <h2 className="text-2xl font-bold text-gray-800">Medicine Details</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Medicine Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Medicine Name
                                    </label>
                                    <input
                                        type="text"
                                        name="medicineName"
                                        value={formData.medicineName}
                                        onChange={handleChange}
                                        placeholder="Enter medicine name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Antibiotics">Antibiotics</option>
                                        <option value="Pain Relief">Pain Relief</option>
                                        <option value="Vitamins">Vitamins</option>
                                        <option value="Diabetes">Diabetes</option>
                                        <option value="Heart">Heart</option>
                                    </select>
                                </div>

                                {/* Manufacturer */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Manufacturer
                                    </label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        placeholder="Manufacturer name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        required
                                    />
                                </div>

                                {/* Stock Quantity */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="stockQuantity"
                                        value={formData.stockQuantity}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        required
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Price (Rs)
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        required
                                    />
                                </div>

                                {/* Expiry Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Expiry Date
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-400">📅</span>
                                        <input
                                            type="date"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
                                >
                                    Add Medicine
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddMedicine;