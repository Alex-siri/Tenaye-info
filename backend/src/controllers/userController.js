const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            'fullName',
            'gender',
            'age',
            'phoneNumber',
            'region',
            'city',
            'homeAddress',
            'profilePicture',
        ];

        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(req.userId, updates, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};

module.exports = { getProfile, updateProfile };