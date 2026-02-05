import React, { useState } from 'react';
import axios from 'axios';
import PharmacistSidebar from '../../../components/PharmacistComponents/PharmacistSidebar';
import PharmacistHeader from '../../../components/PharmacistComponents/PharmacistHeader';

const SearchMedicine = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/medicine');
                setMedicines(response.data.data || []);
            } catch (error) {
                console.error("Error fetching medicines:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedicines();
    }, []);

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <PharmacistSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <PharmacistHeader pharmacistName="Pharmacist" toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Search Medicine</h1>
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
                                placeholder="Search by name or category..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
                            />
                        </div>
                    </div>

                    {/* Medicine Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
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
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">
                                            Loading inventory...
                                        </td>
                                    </tr>
                                ) : filteredMedicines.length > 0 ? (
                                    filteredMedicines.map((medicine, index) => (
                                        <tr
                                            key={medicine.id}
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                } hover:bg-teal-50 transition-colors`}
                                        >
                                            <td className="px-6 py-4 text-gray-800 font-medium">
                                                {medicine.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{medicine.category}</td>
                                            <td className="px-6 py-4 text-gray-600">{medicine.stock}</td>
                                            <td className="px-6 py-4 text-gray-600">Rs {medicine.price}</td>
                                            <td className="px-6 py-4 text-gray-600">{medicine.manufacturer}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">
                                            No medicines found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SearchMedicine;