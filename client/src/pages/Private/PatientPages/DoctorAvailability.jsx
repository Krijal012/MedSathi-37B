import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../../components/PatientComponents/Sidebar';
import Header from '../../../components/PatientComponents/Header';
import DoctorAvailabilityCard from '../../../components/PatientComponents/DoctorAvailabilityCard';

const DoctorAvailability = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const [pharmacists, setPharmacists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        const fetchPharmacists = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pharmacists');
                setPharmacists(response.data.data || []);
            } catch (error) {
                console.error("Error fetching pharmacists:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPharmacists();
    }, []);

    const filteredPharmacists = pharmacists.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBookNow = (pharmId) => {
        navigate('/book-appointment');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <Header patientName="Patient" toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Pharmacist Availability</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Find registered pharmacists available for consultation
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="
                        flex flex-col 
                        sm:flex-row 
                        items-stretch 
                        sm:items-center 
                        gap-3 sm:gap-4 
                        mb-4 sm:mb-6
                    ">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <span className="
                                absolute 
                                left-3 top-1/2 
                                -translate-y-1/2 
                                text-gray-400
                            ">
                                🔍
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="
                                    w-full 
                                    pl-10 pr-4 
                                    py-2.5 sm:py-3 
                                    border border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:border-teal-400
                                    text-sm sm:text-base
                                "
                            />
                        </div>
                    </div>

                    {/* Pharmacists List */}
                    <div className="space-y-3 sm:space-y-4">
                        {loading ? (
                            <p className="text-gray-500 italic">Finding registered pharmacists...</p>
                        ) : filteredPharmacists.length > 0 ? (
                            filteredPharmacists.map((pharm) => (
                                <DoctorAvailabilityCard
                                    key={pharm.id}
                                    name={pharm.name}
                                    specialty="Registered Pharmacist"
                                    experience="5"
                                    nextAvailable="Available Now"
                                    onBookNow={() => handleBookNow(pharm.id)}
                                    image={pharm.image}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 italic text-center py-8">No pharmacists found matching your search.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorAvailability;