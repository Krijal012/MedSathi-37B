import React, { useState } from 'react';
import PharmacistSidebar from '../../components/PharmacistComponents/PharmacistSidebar';
import PharmacistHeader from '../../components/PharmacistComponents/PharmacistHeader';

const PharmacyBilling = () => {
    const [patientName, setPatientName] = useState('');
    const [billItems, setBillItems] = useState([
        {
            id: 1,
            medicine: 'Amoxicillin 500mg',
            quantity: 2,
            price: 1200,
            total: 2400,
        },
    ]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleAddItem = () => {
        const newItem = {
            id: billItems.length + 1,
            medicine: '',
            quantity: 1,
            price: 0,
            total: 0,
        };
        setBillItems([...billItems, newItem]);
    };

    const handleRemoveItem = (id) => {
        const updatedItems = billItems.filter(item => item.id !== id);
        setBillItems(updatedItems);
    }

    const handleItemChange = (id, field, value) => {
        const updatedItems = billItems.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                // Calculate total if quantity or price changes
                if (field === 'quantity' || field === 'price') {
                    updatedItem.total = updatedItem.quantity * updatedItem.price;
                }
                return updatedItem;
            }
            return item;
        });
        setBillItems(updatedItems);
    };

    const calculateGrandTotal = () => {
        return billItems.reduce((sum, item) => sum + item.total, 0);
    };    

    const handleGenerateBill = () => {
        console.log('Bill Details:', {
            patientName,
            items: billItems,
            total: calculateGrandTotal(),
        });
        alert('Bill generated successfully!');
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
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Pharmacy Billing</h1>
                        <p className="text-gray-500">Create and manage pharmacy bills</p>
                    </div>

                    {/* Billing Form Container */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="text-2xl">📄</span>
                            <h2 className="text-2xl font-bold text-gray-800">New Bill</h2>
                        </div>

                        {/* Patient Name */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Patient Name
                            </label>
                            <input
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                placeholder="Enter patient name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        {/* Bill Items */}
                        <div className="mb-6">
                            <div className="hidden md:grid grid-cols-12 gap-4 mb-3 font-semibold text-gray-700 text-sm">
                                <div className="col-span-5">Medicine</div>
                                <div className="col-span-2 text-center">Qty</div>
                                <div className="col-span-2 text-right">Price</div>
                                <div className="col-span-2 text-right">Total</div>
                                <div className="col-span-1"></div>
                            </div>

                            {billItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-y-2 gap-x-4 mb-3 border-b md:border-none pb-3 md:pb-0 items-center">
                                    <div className="md:col-span-5">
                                        <label className="md:hidden text-xs font-semibold text-gray-600">Medicine</label>
                                        <input
                                            type="text"
                                            value={item.medicine}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'medicine', e.target.value)
                                            }
                                            placeholder="Amoxicillin 500mg"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="md:hidden text-xs font-semibold text-gray-600">Quantity</label>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-center"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="md:hidden text-xs font-semibold text-gray-600">Price</label>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-right"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="md:hidden text-xs font-semibold text-gray-600">Total</label>
                                        <input
                                            type="number"
                                            value={item.total}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-right"
                                        />
                                    </div>
                                    <div className="md:col-span-1 text-right">
                                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-lg" title="Remove Item">
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Item Button */}
                            <button
                                onClick={handleAddItem}
                                className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
                            >
                                + Add Item
                            </button>
                        </div>

                        {/* Total */}
                        <div className="mb-6 pt-4 border-t border-gray-200 flex justify-end">
                            <p className="text-xl font-bold text-gray-800 text-right">
                                Total: Rs {calculateGrandTotal().toLocaleString()}
                            </p>
                        </div>

                        {/* Generate Bill Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleGenerateBill}
                                className="w-full sm:w-auto px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
                            >
                                Generate Bill
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PharmacyBilling;