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

    const [messages, setMessages] = useState(["I have been studying this new course for a while now, and I find it very interesting.", "I have a question about the recent lecture on cardiology.", "Can anyone recommend additional resources for learning about oncology?"]);
    const [adminCode, setAdminCode] = useState("");
    const [adminAccess, setAdminAccess] = useState(false);
    const [users, setUsers] = useState([
        { name: "Ali Raza", role: "Student" },
        { name: "Dr. Sara Khan", role: "Admin" },
        { name: "Zainab Malik", role: "Student" }
    ]);


    return (
        <div className='flex flex-col   min-h-screen bg-gray-100 p-4'>
            <h1 className="text-3xl font-bold underline">Education</h1>
            <p className="mt-4">Education is a fundamental right and a key driver of personal and societal development. It empowers individuals with knowledge, skills, and critical thinking abilities, enabling them to contribute meaningfully to their communities and the world.</p>
            <h2 className='text-2xl font-bold'>Choose your role:</h2>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="Student">Student</TabsTrigger>
                    <TabsTrigger value="Admin">Admin</TabsTrigger>
                </TabsList>
                <TabsContent className=" rounded-2xl p-4 bg-indigo-100 w-fit" value="Student">
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="My Courses">
                                My Courses
                            </TabsTrigger>
                            <TabsTrigger value="Upcoming Events">Upcoming Events</TabsTrigger>
                            <TabsTrigger value="Discussion Forum">Discussion Forum</TabsTrigger>
                        </TabsList>
                        <TabsContent value="My Courses">
                            <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow">
                                <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2">My Enrolled Courses</h2>

                                {courses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-50"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{course.name}</h3>
                                        <p className="text-gray-600 text-sm">{course.description}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="Upcoming Events">
                            <div className="space-y-4 p-4 bg-white shadow rounded-lg">
                                <h3 className="text-2xl font-semibold text-indigo-600 border-b pb-2">Upcoming Medical Events</h3>

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

                        <TabsContent value="Discussion Forum">
                            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md flex flex-col h-[500px]">
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
                                        className="flex-1 border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Type a message..."
                                    />
                                    <button
                                        onClick={() => {
                                            if (input.trim() !== "") {
                                                setMessages([...messages, input]);
                                                setInput("");
                                            }
                                        }}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>

                        </TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent className="rounded-2xl p-4 bg-indigo-100 w-fit" value="Admin">
                    {adminAccess ? (
                        <Tabs defaultValue="course-management" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="course-management">Manage Courses</TabsTrigger>
                                <TabsTrigger value="user-roles">User Roles</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>

                            <TabsContent value="course-management">
                                <div className="p-4 bg-white rounded-lg shadow space-y-4">
                                    <h3 className="text-xl font-semibold text-indigo-600">Edit Courses</h3>
                                    {courses.map((course, index) => (
                                        <div key={index} className="p-3 border rounded-md bg-gray-50 space-y-1">
                                            <input
                                                className="w-full p-2 border border-neutral-300 rounded-md"
                                                type="text"
                                                value={course.name}
                                                onChange={(e) => {
                                                    const updated = [...courses];
                                                    updated[index].name = e.target.value;
                                                    setCourses(updated);
                                                }}
                                            />
                                            <textarea
                                                className="w-full p-2 border border-neutral-300 rounded-md"
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

                            <TabsContent value="user-roles">
                                <div className="p-4 bg-white rounded-lg shadow space-y-4 w-[400px]">
                                    <h3 className="text-xl font-semibold text-indigo-600">User Roles</h3>
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
                                                className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md"
                                            >
                                                Make {user.role === "Admin" ? "Student" : "Admin"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>


                            <TabsContent value="settings">
                                <div className="p-4 bg-white rounded-lg shadow space-y-4">
                                    <h3 className="text-xl font-semibold text-indigo-600">Account Settings</h3>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full p-2 border border-neutral-300 rounded-md"
                                        placeholder="Enter new password"
                                    />
                                    <button className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                                        Change Password
                                    </button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    ) : (
                        <div className="flex flex-col gap-3 bg-white p-4 rounded-md shadow w-[400px]">
                            <p className="text-gray-700">Enter admin access code to proceed:</p>
                            <input
                                type="password"
                                value={adminCode}
                                onChange={(e) => setAdminCode(e.target.value)}
                                placeholder="Enter admin code"
                                className="p-2 border border-neutral-300 rounded-md"
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
                                className="bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </TabsContent>

            </Tabs>


        </div>
    );
}

export default Education;
