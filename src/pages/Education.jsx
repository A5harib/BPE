import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react";

const Education = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: "Cardiology", description: "Learn about the heart and its functions." },
        { id: 2, name: "Neurology", description: "Explore the nervous system and its disorders." },
        { id: 3, name: "Pediatrics", description: "Study the medical care of infants, children, and adolescents." },
        { id: 4, name: "Oncology", description: "Understand cancer biology and treatment options." },
        { id: 5, name: "Psychiatry", description: "Delve into mental health and psychiatric disorders." },
        { id: 6, name: "Radiology", description: "Learn about medical imaging techniques and their applications." },
    ]);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        "I have been studying this new course for a while now, and I find it very interesting.",
        "I have a question about the recent lecture on cardiology.",
        "Can anyone recommend additional resources for learning about oncology?",
        "I just completed the pediatrics module and found it very insightful.",
        "The discussion on mental health in our last class was very enlightening."
    ]);
    const [adminCode, setAdminCode] = useState("");
    const [adminAccess, setAdminAccess] = useState(false);
    const [users, setUsers] = useState([
        { name: "Ali Raza", role: "Student" },
        { name: "Dr. Sara Khan", role: "Admin" },
        { name: "Zainab Malik", role: "Student" }
    ]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 p-6">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 mt-8">
                <h1 className="text-4xl font-extrabold text-indigo-800 mb-2 text-center tracking-tight drop-shadow">Education Portal</h1>
                <p className="mt-2 mb-6 text-center text-lg text-gray-700">
                    Empower yourself with knowledge and skills. Choose your role to get started!
                </p>
                <Tabs defaultValue="Student" className="w-full">
                    <TabsList className="flex justify-center gap-4 mb-6 bg-indigo-50 rounded-xl p-2 shadow">
                        <TabsTrigger value="Student" className="px-6 py-2 rounded-lg font-semibold text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition">Student</TabsTrigger>
                        <TabsTrigger value="Admin" className="px-6 py-2 rounded-lg font-semibold text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition">Admin</TabsTrigger>
                    </TabsList>
                    {/* Student Tab */}
                    <TabsContent value="Student" className="rounded-2xl p-4 bg-indigo-50 shadow-inner">
                        <Tabs defaultValue="My Courses" className="w-full">
                            <TabsList className="flex justify-center gap-2 mb-4 bg-white rounded-lg shadow">
                                <TabsTrigger value="My Courses" className="px-4 py-2 rounded font-medium text-indigo-700 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition">My Courses</TabsTrigger>
                                <TabsTrigger value="Upcoming Events" className="px-4 py-2 rounded font-medium text-indigo-700 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition">Upcoming Events</TabsTrigger>
                                <TabsTrigger value="Discussion Forum" className="px-4 py-2 rounded font-medium text-indigo-700 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition">Discussion Forum</TabsTrigger>
                            </TabsList>
                            {/* My Courses */}
                            <TabsContent value="My Courses">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {courses.map((course, index) => (
                                        <div
                                            key={index}
                                            className="p-5 border border-indigo-100 rounded-2xl shadow-md bg-white hover:shadow-xl transition"
                                        >
                                            <h3 className="text-xl font-bold text-indigo-700 mb-1">{course.name}</h3>
                                            <p className="text-gray-600 text-sm">{course.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            {/* Upcoming Events */}
                            <TabsContent value="Upcoming Events">
                                <div className="space-y-4 p-4 bg-white rounded-2xl shadow">
                                    <h3 className="text-2xl font-semibold text-indigo-700 border-b pb-2">Upcoming Medical Events</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                                            <div>
                                                <p className="text-lg font-medium text-gray-800">Webinar on Advanced Cardiology Techniques</p>
                                                <p className="text-sm text-gray-500">📅 March 15, 2024</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                                            <div>
                                                <p className="text-lg font-medium text-gray-800">Workshop on Pediatric Care Best Practices</p>
                                                <p className="text-sm text-gray-500">📅 April 10, 2024</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                                            <div>
                                                <p className="text-lg font-medium text-gray-800">Conference on Innovations in Oncology</p>
                                                <p className="text-sm text-gray-500">📅 May 20–22, 2024</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </TabsContent>
                            {/* Discussion Forum */}
                            <TabsContent value="Discussion Forum">
                                <div className="max-w-lg mx-auto p-4 bg-white rounded-2xl shadow flex flex-col h-[400px]">
                                    <div className="flex-1 overflow-y-auto mb-4 space-y-2 px-2">
                                        {messages.map((msg, index) => (
                                            <div key={index} className="bg-indigo-100 text-indigo-900 p-2 rounded-md w-fit max-w-[80%]">
                                                {msg}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className="flex-1 border border-indigo-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            placeholder="Type a message..."
                                        />
                                        <button
                                            onClick={() => {
                                                if (input.trim() !== "") {
                                                    setMessages([...messages, input]);
                                                    setInput("");
                                                }
                                            }}
                                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                    {/* Admin Tab */}
                    <TabsContent value="Admin" className="rounded-2xl p-4 bg-indigo-50 shadow-inner">
                        {adminAccess ? (
                            <Tabs defaultValue="course-management" className="w-full">
                                <TabsList className="flex justify-center gap-2 mb-4 bg-white rounded-lg shadow">
                                    <TabsTrigger value="course-management" className="px-4 py-2 rounded font-medium text-indigo-700 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition">Manage Courses</TabsTrigger>
                                    <TabsTrigger value="user-roles" className="px-4 py-2 rounded font-medium text-indigo-700 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition">User Roles</TabsTrigger>
                                    <TabsTrigger value="settings" className="px-4 py-2 rounded font-medium text-indigo-700 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition">Settings</TabsTrigger>
                                </TabsList>
                                {/* Manage Courses */}
                                <TabsContent value="course-management">
                                    <div className="p-4 bg-white rounded-2xl shadow space-y-4">
                                        <h3 className="text-xl font-semibold text-indigo-700">Edit Courses</h3>
                                        {courses.map((course, index) => (
                                            <div key={index} className="p-3 border rounded-md bg-gray-50 space-y-1">
                                                <input
                                                    className="w-full p-2 border border-indigo-200 rounded-md"
                                                    type="text"
                                                    value={course.name}
                                                    onChange={(e) => {
                                                        const updated = [...courses];
                                                        updated[index].name = e.target.value;
                                                        setCourses(updated);
                                                    }}
                                                />
                                                <textarea
                                                    className="w-full p-2 border border-indigo-200 rounded-md"
                                                    value={course.description}
                                                    onChange={(e) => {
                                                        const updated = [...courses];
                                                        updated[index].description = e.target.value;
                                                        setCourses(updated);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                {/* User Roles */}
                                <TabsContent value="user-roles">
                                    <div className="p-4 bg-white rounded-2xl shadow space-y-4">
                                        <h3 className="text-xl font-semibold text-indigo-700">User Roles</h3>
                                        <p className="text-gray-700 text-sm">Assign or revoke admin access for users.</p>
                                        {users.map((user, index) => (
                                            <div key={index} className="flex items-center justify-between border-b py-2">
                                                <div>
                                                    <p className="font-medium text-gray-800">{user.name}</p>
                                                    <p className="text-sm text-gray-500">Role: <span className="font-semibold">{user.role}</span></p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const updatedUsers = [...users];
                                                        updatedUsers[index].role = user.role === "Admin" ? "Student" : "Admin";
                                                        setUsers(updatedUsers);
                                                    }}
                                                    className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md shadow"
                                                >
                                                    Make {user.role === "Admin" ? "Student" : "Admin"}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                {/* Settings */}
                                <TabsContent value="settings">
                                    <div className="p-4 bg-white rounded-2xl shadow space-y-4">
                                        <h3 className="text-xl font-semibold text-indigo-700">Account Settings</h3>
                                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-2 border border-indigo-200 rounded-md"
                                            placeholder="Enter new password"
                                        />
                                        <button className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 shadow">
                                            Change Password
                                        </button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        ) : (
                            <div className="flex flex-col gap-3 bg-white p-6 rounded-2xl shadow w-full max-w-md mx-auto">
                                <p className="text-gray-700 text-center text-lg font-medium">Enter admin access code to proceed:</p>
                                <input
                                    type="password"
                                    value={adminCode}
                                    onChange={(e) => setAdminCode(e.target.value)}
                                    placeholder="Enter admin code"
                                    className="p-2 border border-indigo-200 rounded-md"
                                />
                                <button
                                    onClick={() => {
                                        if (adminCode === "admin505") {
                                            setAdminAccess(true);
                                            setAdminCode("");
                                        } else {
                                            alert("Access Denied. Incorrect code.");
                                        }
                                    }}
                                    className="bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 shadow"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Education;
