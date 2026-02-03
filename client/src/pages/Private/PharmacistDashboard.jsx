import React, { useState } from 'react';
import PharmacistSidebar from '../../components/PharmacistComponents/PharmacistSidebar';
import PharmacistHeader from '../../components/PharmacistComponents/PharmacistHeader';
import PharmacistStatCard from '../../components/PharmacistComponents/PharmacistStatcard';
import PharmacistStockCard from '../../components/PharmacistComponents/PharmacistStockCard';

const PharmacistDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    // Sample data
    const stats = [
        { title: 'Total Medicines', value: '2025', icon: '🔧', iconColor: 'text-gray-600' },
        { title: 'Low Stock Items', value: '23', icon: '⚠️', iconColor: 'text-red-500' },
        { title: "Today's Sales", value: 'Rs 50000', icon: '📊', iconColor: 'text-blue-500' },
        { title: 'Pending Order', value: '15', icon: '🛒', iconColor: 'text-green-500' },
    ];

    const lowStockMedicines = [
        {
            medicineName: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stockLeft: 15,
            minimumRequired: 50,
        },
        {
            medicineName: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stockLeft: 15,
            minimumRequired: 50,
        },
        {
            medicineName: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stockLeft: 15,
            minimumRequired: 50,
        },
        {
            medicineName: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stockLeft: 15,
            minimumRequired: 50,
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <PharmacistSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <PharmacistHeader pharmacistName="Pharmacist" toggleSidebar={toggleSidebar} />

                {/* Dashboard Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Pharmacist Dashboard</h1>
                        <p className="text-gray-500">Manage medicines, inventory, and billing</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <PharmacistStatCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                iconColor={stat.iconColor}
                            />
                        ))}
                    </div>

                    {/* Low Stock Items Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="text-red-500 text-2xl">⚠️</span>
                            <h2 className="text-2xl font-bold text-gray-800">Low Stock Items</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lowStockMedicines.map((medicine, index) => (
                                <PharmacistStockCard
                                    key={index}
                                    medicineName={medicine.medicineName}
                                    category={medicine.category}
                                    stockLeft={medicine.stockLeft}
                                    minimumRequired={medicine.minimumRequired}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PharmacistDashboard;