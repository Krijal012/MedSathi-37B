import { useState } from 'react';
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
            <PharmacistSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <PharmacistHeader doctorName="Dr. Smith" />

                {/* Page Content */}
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Pharmacy Billing</h1>
                        <p className="text-gray-500">Create and manage pharmacy bills</p>
                    </div>

                    {/* Billing Form Container */}
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-8">
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        {/* Bill Items */}
                        <div className="mb-6">
                            <div className="grid grid-cols-12 gap-4 mb-3 font-semibold text-gray-700 text-sm">
                                <div className="col-span-4">Medicine</div>
                                <div className="col-span-2">Qty</div>
                                <div className="col-span-3">Price</div>
                                <div className="col-span-3">Total</div>
                            </div>

                            {billItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 mb-3">
                                    <div className="col-span-4">
                                        <input
                                            type="text"
                                            value={item.medicine}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'medicine', e.target.value)
                                            }
                                            placeholder="Amoxicillin 500mg"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <input
                                            type="number"
                                            value={item.total}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Add Item Button */}
                            <button
                                onClick={handleAddItem}
                                className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Add Item
                            </button>
                        </div>

                        {/* Total */}
                        <div className="mb-6 pt-4 border-t border-gray-200">
                            <p className="text-xl font-bold text-gray-800">
                                Total: Rs {calculateGrandTotal()}
                            </p>
                        </div>

                        {/* Generate Bill Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleGenerateBill}
                                className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
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