export const handleEmployeeRegister =async (req, res) => {
    try {
        const { employeeName, role, department, joined, image, email } = req.body;
        const organization = req.user.organization; // Get organization ID from authenticated user

        if (!organization) {
            return res.status(400).json({ message: "User must be associated with an organization." });
        }

        const newEmployee = new Employee({
            employeeName,
            role,
            department,
            joined,
            image,
            email,
            organization,
        });

        await newEmployee.save();

        res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}