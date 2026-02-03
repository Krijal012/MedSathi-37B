import { useState } from 'react';
import PharmacistSidebar from '../../components/PharmacistComponents/PharmacistSidebar';
import PharmacistHeader from '../../components/PharmacistComponents/PharmacistHeader';

const SearchMedicine = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample medicine data
    const medicines = [
        {
            id: 1,
            name: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stock: 150,
            price: 'Rs 1200',
            manufacturer: 'MedLife',
        },
        {
            id: 2,
            name: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stock: 150,
            price: 'Rs 1200',
            manufacturer: 'MedLife',
        },
        {
            id: 3,
            name: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stock: 150,
            price: 'Rs 1200',
            manufacturer: 'MedLife',
        },
        {
            id: 4,
            name: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stock: 150,
            price: 'Rs 1200',
            manufacturer: 'MedLife',
        },
        {
            id: 5,
            name: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stock: 150,
            price: 'Rs 1200',
            manufacturer: 'MedLife',
        },
        {
            id: 6,
            name: 'Amoxicillin 500mg',
            category: 'Antibiotics',
            stock: 150,
            price: 'Rs 1200',
            manufacturer: 'MedLife',
        },
    ];

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
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Search Medicine</h1>
                        <p className="text-gray-500">Find medicines in inventory</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Patients..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Medicine Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Medicine
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Stock
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Manufacturer
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.map((medicine, index) => (
                                    <tr
                                        key={medicine.id}
                                        className={`${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-blue-50 transition-colors`}
                                    >
                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                            {medicine.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{medicine.category}</td>
                                        <td className="px-6 py-4 text-gray-600">{medicine.stock}</td>
                                        <td className="px-6 py-4 text-gray-600">{medicine.price}</td>
                                        <td className="px-6 py-4 text-gray-600">{medicine.manufacturer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SearchMedicine;